import nodemailer, { type Transporter } from "nodemailer";

export interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

/**
 * Building a transporter opens a connection pool, so the last one is reused
 * across requests instead of being rebuilt on every submission.
 */
let cached: Transporter | null = null;

function getTransporter(): Transporter {
  if (cached) return cached;

  const user = process.env.EMAIL_ADDRESS;
  const pass = process.env.EMAIL_PASSWORD;
  if (!user || !pass) {
    throw new Error(
      "Email configuration missing: set EMAIL_ADDRESS and EMAIL_PASSWORD.",
    );
  }

  // A custom SMTP host takes precedence; otherwise fall back to the named
  // service ("gmail" by default).
  const customHost = process.env.EMAIL_HOST;
  cached = customHost
    ? nodemailer.createTransport({
        host: customHost,
        port: Number.parseInt(process.env.EMAIL_PORT ?? "587", 10),
        secure: process.env.EMAIL_SECURE === "true",
        auth: { user, pass },
      })
    : nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || "gmail",
        auth: { user, pass },
      });

  return cached;
}

/**
 * Sends the message.
 *
 * @throws when the SMTP credentials are missing or malformed, so a
 * misconfiguration is distinguishable from a delivery failure.
 * @returns `false` when the transport accepted the call but delivery failed.
 */
export async function sendEmail(data: EmailData): Promise<boolean> {
  const transporter = getTransporter();
  const { to, subject, text, html, replyTo } = data;

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_ADDRESS}>`,
      to,
      subject,
      text,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    return true;
  } catch (error) {
    console.error("[email] delivery failed:", error);
    return false;
  }
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Collapses CR/LF/TAB so a crafted name or address cannot inject extra mail
 * headers (for example a second `Bcc:`) through the subject or Reply-To.
 */
const sanitizeHeaderValue = (value: string): string =>
  value.replace(/[\r\n\t]+/g, " ").trim();

export function createContactEmail(
  name: string,
  email: string,
  message: string,
): EmailData {
  const recipient = process.env.EMAIL_ADDRESS;
  if (!recipient) {
    throw new Error("Recipient email not configured: set EMAIL_ADDRESS.");
  }

  return {
    to: recipient,
    subject: `New contact form submission from ${sanitizeHeaderValue(name)}`,
    replyTo: sanitizeHeaderValue(email),
    // The plain-text part carries the raw values; the HTML part escapes them.
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0070f3;">New contact form submission</h2>
  <p><strong>From:</strong> ${escapeHtml(name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  </div>
</div>`,
  };
}
