import { NextResponse } from 'next';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, company, requestType } = data;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // In a production environment, this is where you would integrate:
    // 1. Resend / SendGrid / AWS SES to email connect@dserveai.com
    // 2. HubSpot / Salesforce / MailerLite API to store the lead
    console.log('NEW LEAD RECEIVED:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Company: ${company}`);
    console.log(`Type: ${requestType}`);

    // Mock success delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: 'Lead captured successfully' }, { status: 200 });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
