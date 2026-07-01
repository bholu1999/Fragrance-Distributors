import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, company, email, enquiryType, message } = body;

    // Validate inputs
    if (!firstName || !lastName || !email || !enquiryType || !message) {
      return NextResponse.json(
        { error: 'All fields except company are required.' },
        { status: 400 }
      );
    }

    // SMTP configuration
    const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpSecure = process.env.SMTP_SECURE !== 'false'; // Secure by default
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'sales@fragrancedistributors.eu';

    if (!smtpUser || !smtpPass) {
      console.error('SMTP credentials are not configured in environment variables.');
      return NextResponse.json(
        { error: 'Mail server configuration missing. Please setup environment variables.' },
        { status: 500 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email to the agency/sales team
    const mailOptions = {
      from: `"${firstName} ${lastName} via Website" <${smtpUser}>`, // Must match smtpUser for Hostinger authorization
      replyTo: email, // Direct replies back to the customer's email
      to: receiverEmail,
      subject: `New Partnership Enquiry: ${enquiryType} - ${company || 'No Company'}`,
      text: `
New Partnership Enquiry received from website:

Name: ${firstName} ${lastName}
Company: ${company || 'N/A'}
Email: ${email}
Enquiry Type: ${enquiryType}

Message:
${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 25px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #F71B63; font-size: 20px; font-weight: 700; border-bottom: 2px solid #F71B63; padding-bottom: 12px; margin-top: 0;">New Partnership Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 160px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #475569;">First Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${firstName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #475569;">Last Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #475569;">Company:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${company || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #475569;">Business Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;"><a href="mailto:${email}" style="color: #F71B63; text-decoration: none; font-weight: 500;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #475569;">Enquiry Type:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${enquiryType}</td>
            </tr>
          </table>
          <div style="margin-top: 25px;">
            <strong style="display: block; margin-bottom: 10px; font-size: 14px; color: #475569;">Message:</strong>
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #F71B63; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</div>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 30px; margin-bottom: 20px;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">This enquiry was sent automatically from the Fragrance Distributors contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Enquiry sent successfully.' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send enquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
