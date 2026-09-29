import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy.
 *
 * What changed, and why it is still not perfect:
 *
 *  - `'unsafe-eval'` is gone from production. It was the genuinely dangerous
 *    part of the old policy: it lets a string become code, which is what turns
 *    a markup injection into real script execution. React only needs it for the
 *    development build, so it is now dev-only.
 *  - `img-src` and `connect-src` dropped the blanket `https:` wildcard. The
 *    site loads no third-party images and makes no cross-origin requests, so
 *    `'self'` covers it. That also removes any exfiltration channel via
 *    `fetch()` to an attacker host.
 *  - `object-src`, `base-uri`, `form-action` and `frame-ancestors` were absent
 *    entirely and are now pinned.
 *
 * `'unsafe-inline'` has to stay. The usual way to remove it is a per-request
 * nonce, but Next.js documents nonce-based CSP as incompatible with static
 * rendering: enabling it would opt this page out of CDN caching to protect
 * against an injection vector the page has no untrusted-HTML sink for. The
 * trade is deliberate: static HTML is worth more here than closing the gap.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "manifest-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Do not advertise the framework.
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  outputFileTracingIncludes: {
    // The generated social card reads these TTFs at build time; without this
    // they are pruned from the traced output.
    "/opengraph-image": [
      "./node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf",
      "./node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf",
    ],
  },
};

export default nextConfig;
