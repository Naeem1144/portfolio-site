import { NextResponse } from "next/server";
import { sendEmail, createContactEmail } from "@/lib/email";

/**
 * The contact endpoint.
 *
 * Runs on the Node runtime because nodemailer needs it, and is force-dynamic so
 * it is never cached or prerendered.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Hard ceiling on the request body; the longest allowed message is 5 000 chars. */
const MAX_BODY_BYTES = 16 * 1024;

const LIMITS = { name: 120, email: 254, message: 5000 } as const;

// A deliberately forgiving address check: one @, a dot in the domain, no spaces.
// Anything stricter starts rejecting valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/**
 * In-memory throttle, keyed by IP.
 *
 * Notes:
 *  - Only *accepted* submissions are recorded. Previously every attempt counted,
 *    so five typos (or one bot) locked a genuine visitor out for ten minutes and
 *    the client was then told to "try again", which is the opposite of useful.
 *  - Stale keys are swept on each call, so the map cannot grow without bound on
 *    a long-lived instance.
 *  - State is per-instance and resets on a cold start. Good enough to stop
 *    casual spam; a shared store would be needed for a hard guarantee.
 */
const attempts = new Map<string, number[]>();

function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim() || "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}

function sweep(now: number) {
  for (const [ip, stamps] of attempts) {
    const live = stamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (live.length === 0) attempts.delete(ip);
    else if (live.length !== stamps.length) attempts.set(ip, live);
  }
}

/** @returns seconds until the caller may retry again. */
function retryAfterSeconds(ip: string, now: number): number {
  const stamps = attempts.get(ip) ?? [];
  if (stamps.length < RATE_LIMIT_MAX) return 0;
  const oldest = stamps[0]!;
  return Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
}

function recordAttempt(ip: string, now: number) {
  const stamps = attempts.get(ip) ?? [];
  stamps.push(now);
  attempts.set(ip, stamps);
}

function badRequest(error: string, status = 400) {
  return NextResponse.json(
    { error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const now = Date.now();
  const ip = clientIp(request.headers);
  sweep(now);

  const retryAfter = retryAfterSeconds(ip, now);
  if (retryAfter > 0) {
    return NextResponse.json(
      { error: "tooMany", retryAfter },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" },
      },
    );
  }

  // Reject oversized bodies before parsing, and answer 400 rather than letting a
  // JSON parse error fall through to the 500 handler.
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) {
    return badRequest("Message is too large.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Malformed request body.");
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return badRequest("Malformed request body.");
  }

  const record = body as Record<string, unknown>;
  const read = (key: keyof typeof LIMITS) =>
    typeof record[key] === "string" ? record[key].trim() : "";

  const name = read("name");
  const email = read("email");
  const message = read("message");

  if (!name || !email || !message) {
    return badRequest("Name, email, and message are all required.");
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return badRequest("One or more fields exceed the allowed length.");
  }
  if (!EMAIL_PATTERN.test(email)) {
    return badRequest("That email address does not look valid.");
  }

  // The message is about to be relayed, so this is the point at which the
  // sender is considered real enough to count against the throttle.
  recordAttempt(ip, now);

  let delivered = false;
  try {
    delivered = await sendEmail(createContactEmail(name, email, message));
  } catch (error) {
    // Misconfiguration (missing EMAIL_ADDRESS / EMAIL_PASSWORD) throws before
    // any network call, so log it distinctly from a delivery failure.
    console.error("[contact] configuration or transport error:", error);
  }

  if (!delivered) {
    return NextResponse.json(
      { error: "delivery" },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { ok: true },
    { status: 201, headers: { "Cache-Control": "no-store" } },
  );
}
