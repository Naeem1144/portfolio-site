import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, createContactEmail } from '@/lib/email';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Minimal in-memory rate limit: max 5 submissions per IP per 10 minutes.
// (Per-instance state; resets on cold start, but still throttles casual spam.)
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  submissions.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message exceeds allowed length' },
        { status: 400 }
      );
    }
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
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
