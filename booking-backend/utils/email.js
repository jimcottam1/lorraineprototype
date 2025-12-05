// Email notification system using Resend
const { Resend } = require('resend');
const SiteSettings = require('../models/SiteSettings');

// Initialize Resend with API key
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Helper function to get admin email from settings or environment variable
async function getAdminEmail() {
  try {
    const settings = await SiteSettings.findById('site-settings');
    return settings?.adminEmail || process.env.ADMIN_EMAIL || 'admin@example.com';
  } catch (error) {
    console.warn('⚠️  Could not fetch admin email from settings, using environment variable');
    return process.env.ADMIN_EMAIL || 'admin@example.com';
  }
}

// Simple template variable replacement (supports {{variable}} and {{#if variable}}...{{/if}})
function replaceTemplateVariables(template, data) {
  let result = template;

  // Replace simple variables like {{fullName}}
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, data[key] || '');
  });

  // Handle {{#if variable}}...{{/if}} blocks
  result = result.replace(/{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g, (match, variable, content) => {
    return data[variable] ? content : '';
  });

  // Clean up any remaining template tags
  result = result.replace(/{{.*?}}/g, '');

  return result;
}

// Professional email template base layout
const emailLayout = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reiki Your Path to Wellness</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #2c5f4f; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Reiki Your Path to Wellness</h1>
              <p style="margin: 8px 0 0 0; color: #e0e0e0; font-size: 14px;">with Lorraine</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                <strong>Contact Lorraine</strong>
              </p>
              <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
                Phone: <a href="tel:07846633248" style="color: #2c5f4f; text-decoration: none;">07846 633248</a>
              </p>
              <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">
                Limerick, Ireland
              </p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                © ${new Date().getFullYear()} Reiki Your Path to Wellness. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Hardcoded email templates
const EMAIL_TEMPLATES = {
  booking_notification_admin: {
    subject: 'New Booking: {{fullName}} - {{programName}}',
    html: emailLayout(`
      <h2 style="margin: 0 0 20px 0; color: #2c5f4f; font-size: 22px;">New Booking Received</h2>

      <div style="background-color: #e8f5e9; padding: 15px; border-radius: 6px; border-left: 4px solid #4caf50; margin-bottom: 25px;">
        <p style="margin: 0; color: #2e7d32; font-weight: 600;">A new booking has been submitted.</p>
      </div>

      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Client Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Name:</strong></td>
          <td style="padding: 8px 0; color: #333; font-size: 14px;">{{fullName}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; color: #333; font-size: 14px;"><a href="mailto:{{email}}" style="color: #2c5f4f; text-decoration: none;">{{email}}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Phone:</strong></td>
          <td style="padding: 8px 0; color: #333; font-size: 14px;"><a href="tel:{{phone}}" style="color: #2c5f4f; text-decoration: none;">{{phone}}</a></td>
        </tr>
      </table>

      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Booking Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Program:</strong></td>
          <td style="padding: 8px 0; color: #333; font-size: 14px;">{{programName}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Price:</strong></td>
          <td style="padding: 8px 0; color: #333; font-size: 14px;">£{{price}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Status:</strong></td>
          <td style="padding: 8px 0; color: #333; font-size: 14px;">{{status}}</td>
        </tr>
      </table>

      {{#if preferredSlot}}
      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Preferred Time</h3>
      <p style="margin: 0; color: #333; font-size: 14px; background: #f9f9f9; padding: 12px; border-radius: 4px;">{{preferredSlot}}</p>
      {{/if}}

      {{#if notes}}
      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Client Notes</h3>
      <p style="margin: 0; color: #333; font-size: 14px; background: #f9f9f9; padding: 12px; border-radius: 4px; border-left: 4px solid #2c5f4f;">{{notes}}</p>
      {{/if}}

      <div style="text-align: center; margin-top: 30px;">
        <a href="{{adminPanelUrl}}" style="display: inline-block; background-color: #2c5f4f; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">View in Admin Panel</a>
      </div>
    `)
  },

  booking_confirmation_customer: {
    subject: 'Booking Received - Complete Your Payment',
    html: emailLayout(`
      <h2 style="margin: 0 0 10px 0; color: #2c5f4f; font-size: 22px;">Thank You, {{fullName}}</h2>
      <p style="margin: 0 0 25px 0; color: #666; font-size: 16px; line-height: 1.6;">Your booking request has been received.</p>

      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Booking Details</h3>
      <table style="width: 100%; border-collapse: collapse; background: #f9f9f9; border-radius: 6px;">
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Program:</strong></td>
          <td style="padding: 12px; color: #333; font-size: 14px;">{{programName}}</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Price:</strong></td>
          <td style="padding: 12px; color: #333; font-size: 14px; font-weight: 600;">£{{price}}</td>
        </tr>
        {{#if preferredSlot}}
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Preferred Time:</strong></td>
          <td style="padding: 12px; color: #333; font-size: 14px;">{{preferredSlot}}</td>
        </tr>
        {{/if}}
      </table>

      <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2196f3;">
        <h3 style="margin: 0 0 10px 0; color: #1565c0; font-size: 16px;">Next Step: Complete Your Payment</h3>
        <p style="margin: 0 0 15px 0; color: #333; font-size: 14px;">To secure your booking, please complete payment by clicking the button below:</p>

        {{#if paymentUrl}}
        <div style="text-align: center;">
          <a href="{{paymentUrl}}" style="display: inline-block; background-color: #2c5f4f; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Pay £{{price}} Now</a>
        </div>
        {{else}}
        <p style="margin: 0; color: #666; font-size: 14px; text-align: center;">Payment link will be sent to you shortly.</p>
        {{/if}}
      </div>

      <h3 style="color: #333; font-size: 16px; margin: 25px 0 10px 0;">What Happens Next?</h3>
      <ol style="margin: 0; padding-left: 20px; color: #666; font-size: 14px; line-height: 1.8;">
        <li>Complete your payment</li>
        <li>Lorraine will contact you within 24 hours</li>
        <li>You'll receive a health questionnaire</li>
        <li>Your session will be confirmed</li>
      </ol>

      <p style="margin: 25px 0 0 0; color: #666; font-size: 14px; line-height: 1.6;">If you have any questions, feel free to call Lorraine at <strong style="color: #2c5f4f;">07846 633248</strong>.</p>
    `)
  },

  payment_confirmation_customer: {
    subject: 'Payment Confirmed - Your Reiki Session Awaits',
    html: emailLayout(`
      <h2 style="margin: 0 0 10px 0; color: #2c5f4f; font-size: 22px;">Thank You, {{fullName}}</h2>

      <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50; margin: 20px 0;">
        <p style="margin: 0; color: #2e7d32; font-weight: 600; font-size: 16px;">Your payment has been received successfully.</p>
      </div>

      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Booking Details</h3>
      <table style="width: 100%; border-collapse: collapse; background: #f9f9f9; border-radius: 6px;">
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Program:</strong></td>
          <td style="padding: 12px; color: #333; font-size: 14px;">{{programName}}</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Amount Paid:</strong></td>
          <td style="padding: 12px; color: #2e7d32; font-size: 14px; font-weight: 600;">£{{price}}</td>
        </tr>
      </table>

      <h3 style="color: #333; font-size: 16px; margin: 25px 0 10px 0;">What's Next?</h3>
      <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">You'll receive a separate email shortly with:</p>
      <ol style="margin: 0; padding-left: 20px; color: #666; font-size: 14px; line-height: 1.8;">
        <li>A wellness questionnaire to complete</li>
        <li>Information about your upcoming session</li>
      </ol>

      <p style="margin: 25px 0 0 0; color: #666; font-size: 14px; line-height: 1.6;">Lorraine will contact you within 24 hours to confirm your session time. If you have any immediate questions, feel free to call her at <strong style="color: #2c5f4f;">07846 633248</strong>.</p>

      <div style="margin-top: 30px; padding: 20px; background-color: #f0f8f5; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #2c5f4f; font-size: 16px; font-style: italic;">Looking forward to supporting you on your wellness journey.</p>
      </div>
    `)
  },

  payment_notification_admin: {
    subject: 'Payment Received: {{fullName}} - £{{price}}',
    html: emailLayout(`
      <h2 style="margin: 0 0 10px 0; color: #2c5f4f; font-size: 22px;">Payment Received</h2>

      <div style="background-color: #e8f5e9; padding: 15px; border-radius: 6px; border-left: 4px solid #4caf50; margin-bottom: 25px;">
        <p style="margin: 0; color: #2e7d32; font-weight: 600;">A customer has successfully completed their payment.</p>
      </div>

      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Client Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Name:</strong></td>
          <td style="padding: 8px 0; color: #333; font-size: 14px;">{{fullName}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; color: #333; font-size: 14px;"><a href="mailto:{{email}}" style="color: #2c5f4f; text-decoration: none;">{{email}}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Phone:</strong></td>
          <td style="padding: 8px 0; color: #333; font-size: 14px;"><a href="tel:{{phone}}" style="color: #2c5f4f; text-decoration: none;">{{phone}}</a></td>
        </tr>
      </table>

      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Payment Details</h3>
      <table style="width: 100%; border-collapse: collapse; background: #f9f9f9; border-radius: 6px;">
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Program:</strong></td>
          <td style="padding: 12px; color: #333; font-size: 14px;">{{programName}}</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Amount Paid:</strong></td>
          <td style="padding: 12px; color: #2e7d32; font-size: 14px; font-weight: 600;">£{{price}}</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Payment Time:</strong></td>
          <td style="padding: 12px; color: #333; font-size: 14px;">{{paidAt}}</td>
        </tr>
      </table>

      {{#if preferredSlot}}
      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Preferred Time</h3>
      <p style="margin: 0; color: #333; font-size: 14px; background: #f9f9f9; padding: 12px; border-radius: 4px; font-weight: 600;">{{preferredSlot}}</p>
      {{/if}}

      {{#if notes}}
      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Client Notes</h3>
      <p style="margin: 0; color: #333; font-size: 14px; background: #f9f9f9; padding: 12px; border-radius: 4px; border-left: 4px solid #2c5f4f;">{{notes}}</p>
      {{/if}}

      <h3 style="color: #333; font-size: 16px; margin: 25px 0 10px 0;">Next Steps</h3>
      <ol style="margin: 0; padding-left: 20px; color: #666; font-size: 14px; line-height: 1.8;">
        <li>Contact the client within 24 hours to confirm session time</li>
        <li>Send them the health questionnaire</li>
        <li>Update the booking status in the admin panel</li>
      </ol>

      <div style="text-align: center; margin-top: 30px;">
        <a href="{{adminPanelUrl}}" style="display: inline-block; background-color: #2c5f4f; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">View in Admin Panel</a>
      </div>
    `)
  },

  questionnaire_invitation: {
    subject: 'Complete Your Wellness Questionnaire',
    html: emailLayout(`
      <h2 style="margin: 0 0 10px 0; color: #2c5f4f; font-size: 22px;">Hi {{fullName}},</h2>
      <p style="margin: 0 0 25px 0; color: #666; font-size: 16px; line-height: 1.6;">Thank you for booking your {{programName}} session!</p>

      <div style="background-color: #fff3e0; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ff9800;">
        <h3 style="margin: 0 0 10px 0; color: #e65100; font-size: 18px;">Next Step: Complete Your Wellness Questionnaire</h3>
        <p style="margin: 0 0 15px 0; color: #333; font-size: 14px; line-height: 1.6;">To help Lorraine personalize your Reiki experience and ensure the best possible session for you, please take a few minutes to complete your wellness questionnaire.</p>

        <p style="margin: 0 0 15px 0; color: #333; font-size: 14px;">The questionnaire covers:</p>
        <ul style="margin: 0 0 15px 0; padding-left: 20px; color: #333; font-size: 14px; line-height: 1.8;">
          <li>Your wellness goals and intentions</li>
          <li>Any health conditions or concerns</li>
          <li>Your preferred communication method</li>
        </ul>

        <div style="text-align: center; margin-top: 20px;">
          <a href="{{questionnaireUrl}}" style="display: inline-block; background-color: #ff9800; color: white; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Complete Questionnaire Now</a>
        </div>
      </div>

      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Why Complete the Questionnaire?</h3>
        <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">Your responses help Lorraine understand your unique needs and customize your Reiki session to address your specific wellness goals. All information is kept strictly confidential.</p>
      </div>

      <h3 style="color: #333; font-size: 16px; margin: 25px 0 10px 0;">What Happens Next?</h3>
      <ol style="margin: 0; padding-left: 20px; color: #666; font-size: 14px; line-height: 1.8;">
        <li>Complete your wellness questionnaire (takes 5 minutes)</li>
        <li>Lorraine will review your responses</li>
        <li>She'll contact you within 24 hours to confirm your session time</li>
      </ol>

      <p style="margin: 25px 0 0 0; color: #666; font-size: 14px; line-height: 1.6;">If you have any questions, feel free to call Lorraine at <strong style="color: #2c5f4f;">07846 633248</strong>.</p>

      <div style="margin-top: 30px; padding: 20px; background-color: #f0f8f5; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #2c5f4f; font-size: 16px; font-style: italic;">Looking forward to supporting you on your wellness journey.</p>
      </div>
    `)
  },

  session_confirmation_customer: {
    subject: 'Your Reiki Session is Confirmed',
    html: emailLayout(`
      <h2 style="margin: 0 0 10px 0; color: #2c5f4f; font-size: 22px;">Session Confirmed</h2>
      <p style="margin: 0 0 25px 0; color: #666; font-size: 16px;">Dear {{fullName}},</p>

      <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50; margin: 20px 0;">
        <p style="margin: 0; color: #2e7d32; font-weight: 600; font-size: 16px;">Your session has been confirmed.</p>
      </div>

      <h3 style="color: #333; font-size: 16px; margin: 20px 0 10px 0;">Session Details</h3>
      <table style="width: 100%; border-collapse: collapse; background: #f9f9f9; border-radius: 6px;">
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Program:</strong></td>
          <td style="padding: 12px; color: #333; font-size: 14px;">{{programName}}</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Date:</strong></td>
          <td style="padding: 12px; color: #2c5f4f; font-size: 14px; font-weight: 600;">{{confirmedDate}}</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #666; font-size: 14px;"><strong>Time:</strong></td>
          <td style="padding: 12px; color: #2c5f4f; font-size: 14px; font-weight: 600;">{{confirmedTime}}</td>
        </tr>
      </table>

      <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="margin: 0 0 10px 0; color: #1565c0; font-size: 16px;">What to Bring</h3>
        <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6;">Please come comfortable and relaxed. Wear loose, comfortable clothing.</p>
      </div>

      <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800; margin: 25px 0;">
        <h3 style="margin: 0 0 10px 0; color: #e65100; font-size: 16px;">Need to Reschedule?</h3>
        <p style="margin: 0 0 10px 0; color: #333; font-size: 14px;">If you need to reschedule, please contact Lorraine at least 24 hours in advance:</p>
        <p style="margin: 0; color: #333; font-size: 14px;"><strong>Phone:</strong> <a href="tel:07846633248" style="color: #2c5f4f; text-decoration: none;">07846 633248</a></p>
      </div>

      <div style="margin-top: 30px; padding: 20px; background-color: #f0f8f5; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #2c5f4f; font-size: 16px; font-style: italic;">Looking forward to seeing you.</p>
      </div>
    `)
  }
};

// Helper function to send email with hardcoded template
async function sendEmail(templateId, recipient, subject, data) {
  if (!resend) {
    console.log('⚠️  Resend not configured. Email not sent.');
    return;
  }

  try {
    const template = EMAIL_TEMPLATES[templateId];

    if (!template) {
      console.error(`❌ Template not found: ${templateId}`);
      return;
    }

    const emailSubject = replaceTemplateVariables(template.subject, data);
    const htmlBody = replaceTemplateVariables(template.html, data);

    console.log(`📤 Attempting to send email: ${templateId} to ${recipient}`);

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'bookings@yourdomain.com',
      to: recipient,
      subject: emailSubject,
      html: htmlBody
    });

    if (response.error) {
      console.error(`❌ Resend API error for ${templateId}:`, response.error);
      console.error(`   Details:`, JSON.stringify(response.error, null, 2));
      return;
    }

    console.log(`✅ Email sent successfully using template: ${templateId}`);
    console.log(`   Email ID: ${response.data?.id || 'N/A'}`);
  } catch (error) {
    console.error(`❌ Failed to send email using template ${templateId}:`, error.message);
    console.error(`   Full error:`, error);
  }
}

const sendBookingNotification = async (booking) => {
  console.log('📧 Sending booking notification to admin...');

  const adminEmail = await getAdminEmail();

  const data = {
    fullName: booking.fullName,
    email: booking.email,
    phone: booking.phone,
    programName: booking.programName,
    price: booking.price,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    preferredSlot: booking.preferredSlot || '',
    notes: booking.notes || '',
    adminPanelUrl: process.env.ADMIN_PANEL_URL || 'http://localhost:3000/admin'
  };

  await sendEmail('booking_notification_admin', adminEmail, '', data);
};

const sendPaymentConfirmation = async (booking) => {
  console.log('📧 Sending payment confirmation to customer...');

  const data = {
    fullName: booking.fullName,
    programName: booking.programName,
    price: booking.price
  };

  await sendEmail('payment_confirmation_customer', booking.email, '', data);
};

const sendSessionConfirmation = async (booking) => {
  console.log('📧 Sending session confirmation to customer...');

  const data = {
    fullName: booking.fullName,
    programName: booking.programName,
    confirmedDate: booking.confirmedDate ? new Date(booking.confirmedDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) : 'TBD',
    confirmedTime: booking.confirmedTime || 'TBD'
  };

  await sendEmail('session_confirmation_customer', booking.email, '', data);
};

const sendBookingConfirmationToCustomer = async (booking, paymentUrl) => {
  console.log('📧 Sending booking confirmation to customer...');

  const data = {
    fullName: booking.fullName,
    programName: booking.programName,
    price: booking.price,
    preferredSlot: booking.preferredSlot || '',
    paymentUrl: paymentUrl || ''
  };

  await sendEmail('booking_confirmation_customer', booking.email, '', data);
};

const sendPaymentNotificationToAdmin = async (booking) => {
  console.log('📧 Sending payment notification to admin...');

  const adminEmail = await getAdminEmail();

  const formattedDate = booking.paidAt ? new Date(booking.paidAt).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : 'Just now';

  const data = {
    fullName: booking.fullName,
    email: booking.email,
    phone: booking.phone,
    programName: booking.programName,
    price: booking.price,
    paidAt: formattedDate,
    stripePaymentId: booking.stripePaymentId || '',
    preferredSlot: booking.preferredSlot || '',
    notes: booking.notes || '',
    adminPanelUrl: process.env.ADMIN_PANEL_URL || 'http://localhost:3000/admin'
  };

  await sendEmail('payment_notification_admin', adminEmail, '', data);
};

const sendQuestionnaireInvitation = async (booking) => {
  console.log('📧 Sending questionnaire invitation to customer...');

  const questionnaireUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/questionnaire.html?booking_id=${booking._id}`;

  const data = {
    fullName: booking.fullName,
    programName: booking.programName,
    questionnaireUrl: questionnaireUrl
  };

  await sendEmail('questionnaire_invitation', booking.email, '', data);
};

const sendTestEmail = async (template, testEmail) => {
  console.log('📧 Sending test email...');

  if (!resend) {
    console.log('⚠️  Resend not configured. Test email not sent.');
    return;
  }

  // Sample data for testing
  const sampleData = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '07846 633248',
    programName: 'Path to Wellness - 4-Week Program',
    price: '256',
    status: 'pending',
    paymentStatus: 'pending',
    preferredSlot: 'Monday, 15 January at 10:00',
    notes: 'Looking forward to starting my wellness journey!',
    confirmedDate: 'Monday, 15 January 2025',
    confirmedTime: '10:00',
    paidAt: new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    paymentUrl: 'https://checkout.stripe.com/test',
    questionnaireUrl: 'https://yourdomain.com/questionnaire.html?booking_id=123',
    adminPanelUrl: process.env.ADMIN_PANEL_URL || 'http://localhost:3000/admin'
  };

  const subject = replaceTemplateVariables(template.subject, sampleData);
  const htmlBody = replaceTemplateVariables(template.htmlBody, sampleData);

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'bookings@yourdomain.com',
      to: testEmail,
      subject: `[TEST] ${subject}`,
      html: htmlBody
    });
    console.log('✅ Test email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
    throw error;
  }
};

module.exports = {
  sendBookingNotification,
  sendPaymentConfirmation,
  sendSessionConfirmation,
  sendBookingConfirmationToCustomer,
  sendPaymentNotificationToAdmin,
  sendQuestionnaireInvitation,
  sendTestEmail
};
