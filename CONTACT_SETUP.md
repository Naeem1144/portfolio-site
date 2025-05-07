# Contact Form Setup

This document explains how to set up the contact form to send emails in your portfolio site.

## Configuration

1. Create a `.env.local` file in the root of your project (if it doesn't exist already)
2. Add the following environment variables:

```
# Required email settings
EMAIL_ADDRESS=your.email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Optional custom email service settings (if not using Gmail)
# EMAIL_SERVICE=outlook  # Optional: defaults to 'gmail'
# EMAIL_HOST=smtp.example.com  # Used for custom SMTP configurations
# EMAIL_PORT=587  # Used for custom SMTP configurations
# EMAIL_SECURE=false  # true for 465, false for other ports
```

## For Gmail Users (Recommended)

For Gmail, you'll need to use an "App Password" instead of your regular password:

1. Go to your Google Account at [https://myaccount.google.com/](https://myaccount.google.com/)
2. Enable 2-Step Verification if you haven't already
3. Go to [App passwords](https://myaccount.google.com/apppasswords)
4. Create a new app password (select "Other" and give it a name like "Portfolio Site")
5. Use the generated 16-character password as your `EMAIL_PASSWORD` in `.env.local`

## For Other Email Providers

If you're using a different email provider:

1. Set `EMAIL_SERVICE` to your provider name (e.g., 'outlook', 'yahoo', etc.)
2. Or use custom SMTP settings by setting `EMAIL_HOST`, `EMAIL_PORT`, and `EMAIL_SECURE`

## Testing

After setup:

1. Run your development server
2. Navigate to your contact form
3. Fill out the form and submit
4. You should receive an email at the address specified in `EMAIL_ADDRESS`

## Troubleshooting

- If emails aren't being sent, check your server logs for error messages
- Verify your email/password credentials are correct
- For Gmail, make sure App Passwords are correctly set up
- Some email providers may block automated sending - check your email provider's spam/security settings

## Security Notes

- Never commit your `.env.local` file to version control
- Consider using a dedicated email address for your form submissions
- For production sites, use environment variables in your hosting platform (Vercel, Netlify, etc.) 