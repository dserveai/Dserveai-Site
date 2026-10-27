import { NextResponse } from 'next';
import { Resend } from 'resend';

function escapeHTML(str: string) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

  try {
    const data = await req.json();
    const { name, email, company, requestType } = data;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const safeName = escapeHTML(name || 'Unknown');
    const safeCompany = escapeHTML(company || 'Not provided');
    const safeEmail = escapeHTML(email);
    const safeType = escapeHTML(requestType || 'Free Pilot Request');

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.CONTACT_FORM_TO_EMAIL || 'connect@dserveai.com';

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: `Dserve Pilot Request <${fromEmail}>`,
        to: [toEmail],
        replyTo: safeEmail,
        subject: `⚡ New ${safeType} from ${safeCompany} (${safeName})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #0ea5e9;">New Lead: ${safeType}</h2>
            <p>A new pilot request was captured via the website.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeName}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeCompany}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Request:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeType}</td></tr>
            </table>
          </div>
        `,
      });
    } else {
      console.log('RESEND_API_KEY not set locally, mock lead logged: ', { safeName, safeCompany, safeEmail, safeType });
    }

    return NextResponse.json({ success: true, message: 'Lead captured successfully' }, { status: 200 });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
