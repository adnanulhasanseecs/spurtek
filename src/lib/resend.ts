import { Resend } from 'resend';

/**
 * Resend email client singleton
 * Initialized lazily to avoid build-time errors
 */
let resendInstance: Resend | null = null;

export function getResend(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

// Export a getter function that can be used in API routes
// The resend constant is for backward compatibility but will only work if RESEND_API_KEY is set

/**
 * Email templates
 */
export const emailTemplates = {
  adminNotification: (leadData: {
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    message?: string;
  }) => ({
    subject: `New ${leadData.type} Lead: ${leadData.firstName} ${leadData.lastName}`,
    html: `
      <h2>New Lead Submission</h2>
      <p><strong>Type:</strong> ${leadData.type}</p>
      <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
      <p><strong>Email:</strong> ${leadData.email}</p>
      ${leadData.company ? `<p><strong>Company:</strong> ${leadData.company}</p>` : ''}
      ${leadData.message ? `<p><strong>Message:</strong> ${leadData.message}</p>` : ''}
    `,
  }),

  userConfirmation: (leadData: {
    firstName: string;
    type: string;
  }) => ({
    subject: 'Thank you for contacting Spurtek',
    html: `
      <h2>Thank you, ${leadData.firstName}!</h2>
      <p>We've received your ${leadData.type} request and will get back to you soon.</p>
      <p>Our team typically responds within 24-48 hours.</p>
      <p>Best regards,<br>The Spurtek Team</p>
    `,
  }),
};

