import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface SupportRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}

export async function POST(request: Request) {
  try {
    const body: SupportRequest = await request.json();
    const { name, email, subject, message, category } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'support@ekkos.dev';

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ekkOS Support <noreply@ekkos.dev>',
        to: SUPPORT_EMAIL,
        reply_to: email,
        subject: `[Support] ${category}: ${subject}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #a855f7; margin-bottom: 24px;">New Support Request</h2>

            <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0;"><strong>From:</strong> ${name}</p>
              <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 0 0 8px 0;"><strong>Category:</strong> ${category}</p>
              <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
            </div>

            <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px;">
              <h3 style="margin: 0 0 12px 0; color: #374151;">Message</h3>
              <p style="margin: 0; white-space: pre-wrap; color: #4b5563;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>

            <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
              Submitted via ekkos.dev/support at ${new Date().toISOString()}
            </p>
          </div>
        `,
        text: `New Support Request\n\nFrom: ${name}\nEmail: ${email}\nCategory: ${category}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSubmitted at ${new Date().toISOString()}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    // Also send confirmation email to user
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ekkOS Support <noreply@ekkos.dev>',
        to: email,
        subject: `We received your message: ${subject}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #a855f7;">ekkOS_</h1>
            <p>Hi ${name},</p>
            <p>Thanks for contacting ekkOS support. We've received your message and will get back to you within 24 hours.</p>

            <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 0 0 8px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 0;"><strong>Category:</strong> ${category}</p>
            </div>

            <p>In the meantime, you might find answers in our:</p>
            <ul>
              <li><a href="https://docs.ekkos.dev">Documentation</a></li>
              <li><a href="https://github.com/Ekkos-Technologies-Inc/discussions">GitHub Discussions</a></li>
            </ul>

            <p style="color: #666; margin-top: 32px;">— The ekkOS Team</p>
          </div>
        `,
        text: `Hi ${name},\n\nThanks for contacting ekkOS support. We've received your message and will get back to you within 24 hours.\n\nSubject: ${subject}\nCategory: ${category}\n\nIn the meantime, check our docs at https://docs.ekkos.dev\n\n— The ekkOS Team`,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Support API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please email support@ekkos.dev directly.' },
      { status: 500 }
    );
  }
}
