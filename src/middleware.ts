import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();

  // Add security headers
  const headers = response.headers;
  
  // Prevent XSS attacks
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Control iframe embedding (prevents clickjacking)
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // Control what features and APIs can be used in the browser
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Enable strict HTTPS
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  // Content Security Policy
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: avatars.githubusercontent.com; font-src 'self' data:; connect-src 'self' api.github.com;"
  );

  return response;
} 