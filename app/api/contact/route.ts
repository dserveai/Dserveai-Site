import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// We instantiate Resend inside the handler to prevent Next.js build errors when the API key is missing.

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');
  
  try {
    const body = await request.json();
    const { fullName, company, email, country, phone, projectDetails } = body;

    // Basic validation
    if (!fullName || !company || !email || !projectDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Since we're sending this TO ourselves, the 'to' is the enterprise email.
    // The 'from' must be a verified domain on Resend (e.g. Acme <onboarding@resend.dev> for testing).
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = 'connect@dserveai.com';

    // Send the email
    const data = await resend.emails.send({
      from: `Dserve Contact Form <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New Enterprise Inquiry from ${company} (${fullName})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #0ea5e9;">New Pilot Project Request</h2>
          <p>A new inquiry has been submitted via the Dserve AI enterprise contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; width: 120px;"><strong>Name</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Country</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${country}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
            </tr>
          </table>

          <h3 style="margin-top: 30px; color: #333;">Project Details</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${projectDetails}</div>
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
