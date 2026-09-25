import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();

  // Add security headers
  const headers = response.headers;

  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');

  // Control iframe embedding (prevents clickjacking)
  headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Control what features and APIs can be used in the browser
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Enable strict HTTPS
  headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  // Content Security Policy is defined once, in next.config.ts headers()

  return response;
}
