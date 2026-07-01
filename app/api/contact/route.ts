import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Minimal HTML escape to prevent XSS in emails
function escapeHTML(str: string) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const contactSchema = z.object({
  fullName: z.string().min(1, "Name is required").max(100, "Name is too long"),
  company: z.string().min(1, "Company is required").max(100, "Company is too long"),
  email: z.string().email("Invalid email address").max(100, "Email is too long"),
  country: z.string().max(100).optional().default("Not provided"),
  phone: z.string().max(50).optional().default("Not provided"),
  projectDetails: z.string().min(1, "Project details are required").max(5000, "Project details are too long"),
});

// Lightweight in-memory rate limiter
// NOTE: In a serverless/edge environment like Vercel, this state may be reset frequently.
// For production, replace this Map with Redis (Vercel KV, Upstash) or Arcjet.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');
  
  // Get IP from headers (Vercel uses x-forwarded-for)
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    
    // Zod Validation
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }
    const { fullName, company, email, country, phone, projectDetails } = parsed.data;

    // Sanitize inputs before interpolating into HTML
    const safeName = escapeHTML(fullName);
    const safeCompany = escapeHTML(company);
    const safeEmail = escapeHTML(email);
    const safeCountry = escapeHTML(country);
    const safePhone = escapeHTML(phone);
    const safeDetails = escapeHTML(projectDetails);

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = 'connect@dserveai.com';

    // Send the email
    const data = await resend.emails.send({
      from: `Dserve Contact Form <${fromEmail}>`,
      to: [toEmail],
      replyTo: safeEmail,
      subject: `New Enterprise Inquiry from ${safeCompany} (${safeName})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #0ea5e9;">New Pilot Project Request</h2>
          <p>A new inquiry has been submitted via the Dserve AI enterprise contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; width: 120px;"><strong>Name</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeCompany}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Country</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeCountry}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${safePhone}</td>
            </tr>
          </table>

          <h3 style="margin-top: 30px; color: #333;">Project Details</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${safeDetails}</div>
        </div>
      `,
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
