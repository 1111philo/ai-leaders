# Email Notification Setup

The employer and EDU partner forms send notifications via email to `help@ai-leaders.org` using Web3Forms.

## Setup Instructions

1. **Get a Web3Forms Access Key** (Free)
   - Go to https://web3forms.com/
   - Click "Get Started for Free"
   - Sign up with your email
   - Verify your email address
   - Create a new form and get your Access Key

2. **Configure Environment Variable**
   
   Add to your `.env` file:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your-access-key-here
   VITE_DISABLE_EMAIL=false
   ```

3. **Set Recipient Email in Web3Forms Dashboard**
   - Log into Web3Forms dashboard
   - Go to your form settings
   - Set the recipient email to: `help@ai-leaders.org`
   - Enable email notifications

## How It Works

When a form is submitted:

1. **Email** → Sent to `help@ai-leaders.org` via Web3Forms
2. **Slack** → Posted to configured Slack channel (if enabled)
3. **Google Sheets** → Logged to spreadsheet (if enabled)

All three methods run in parallel, so if one fails, the others still work.

## Email Format

### Employer Inquiries
```
Subject: 🤝 New Employer Inquiry - AI Leaders

Company: [Company Name]
Contact: [Contact Name]
Email: [Email]

Roles / Needs:
[Their message]
```

### EDU Partner Inquiries
```
Subject: 🎓 New EDU Partner Inquiry - AI Leaders

Institution: [Institution Name]
Contact: [Contact Name]
Email: [Email]

Message:
[Their message]
```

## Disabling Email

To disable email notifications (useful for testing):

```env
VITE_DISABLE_EMAIL=true
```

## Troubleshooting

- **Emails not sending**: Check that `VITE_WEB3FORMS_ACCESS_KEY` is set correctly
- **Wrong recipient**: Verify email is set to `help@ai-leaders.org` in Web3Forms dashboard
- **Form fails silently**: Check browser console for errors; email failures won't block form submission

## Alternative Email Services

If you prefer a different service, you can modify `src/services/email.ts` to use:

- **EmailJS** - https://www.emailjs.com/
- **Formspree** - https://formspree.io/
- **SendGrid** - https://sendgrid.com/ (via serverless function)
- **Resend** - https://resend.com/ (via serverless function)
