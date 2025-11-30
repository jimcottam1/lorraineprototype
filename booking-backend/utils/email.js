// Email notification system using Resend
const { Resend } = require('resend');
const EmailTemplate = require('../models/EmailTemplate');

// Initialize Resend with API key
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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

// Generic function to send email from template
async function sendEmailFromTemplate(templateId, recipient, data) {
  if (!resend) {
    console.log('⚠️  Resend not configured. Email not sent.');
    return;
  }

  try {
    const template = await EmailTemplate.findOne({ templateId, active: true });

    if (!template) {
      console.error(`Template not found or inactive: ${templateId}`);
      return;
    }

    const subject = replaceTemplateVariables(template.subject, data);
    const htmlBody = replaceTemplateVariables(template.htmlBody, data);

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'bookings@yourdomain.com',
      to: recipient,
      subject: subject,
      html: htmlBody
    });

    console.log(`✅ Email sent using template: ${templateId}`);
  } catch (error) {
    console.error(`❌ Failed to send email using template ${templateId}:`, error.message);
  }
}

const sendBookingNotification = async (booking) => {
  console.log('📧 Sending booking notification to admin...');

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

  await sendEmailFromTemplate('booking_notification_admin', process.env.ADMIN_EMAIL, data);
};

const sendPaymentConfirmation = async (booking) => {
  console.log('📧 Sending payment confirmation to customer...');

  const data = {
    fullName: booking.fullName,
    programName: booking.programName,
    price: booking.price
  };

  await sendEmailFromTemplate('payment_confirmation_customer', booking.email, data);
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

  await sendEmailFromTemplate('session_confirmation_customer', booking.email, data);
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

  await sendEmailFromTemplate('booking_confirmation_customer', booking.email, data);
};

const sendPaymentNotificationToAdmin = async (booking) => {
  console.log('📧 Sending payment notification to admin...');

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

  await sendEmailFromTemplate('payment_notification_admin', process.env.ADMIN_EMAIL, data);
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
  sendTestEmail
};
