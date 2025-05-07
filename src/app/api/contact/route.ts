import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, createContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create and send email using our utility
    const emailData = createContactEmail(name, email, message);
    const success = await sendEmail(emailData);

    if (!success) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 