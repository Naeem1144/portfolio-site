import nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    const { to, subject, text, html, replyTo } = data;
    
    // Get recipient email from environment variables
    const senderEmail = process.env.EMAIL_ADDRESS;
    
    if (!senderEmail || !process.env.EMAIL_PASSWORD) {
      console.error('Email environment variables not set');
      throw new Error('Email configuration missing');
    }
    
    // Create transporter based on environment variables
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: senderEmail,
        pass: process.env.EMAIL_PASSWORD,
      },
      // For custom SMTP configuration:
      ...(process.env.EMAIL_HOST ? {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
      } : {})
    });
    
    // Set up email data
    const mailOptions = {
      from: `"Portfolio Contact Form" <${senderEmail}>`,
      to,
      subject,
      text,
      html,
      ...(replyTo && { replyTo }),
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export function createContactEmail(name: string, email: string, message: string): EmailData {
  const recipientEmail = process.env.EMAIL_ADDRESS;
  
  if (!recipientEmail) {
    throw new Error('Recipient email not configured');
  }
  
  return {
    to: recipientEmail,
    subject: `New Contact Form Submission from ${name}`,
    replyTo: email,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0070f3;">New Contact Form Submission</h2>
  <p><strong>From:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${message}</p>
  </div>
</div>
    `,
  };
} 