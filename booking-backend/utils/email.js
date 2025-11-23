// Email notification system using Resend
const { Resend } = require('resend');

// Initialize Resend with API key
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const sendBookingNotification = async (booking) => {
  console.log('📧 Sending booking notification to admin...');

  if (!resend) {
    console.log('⚠️  Resend not configured. Email notification not sent.');
    console.log('Configure RESEND_API_KEY and ADMIN_EMAIL in .env file');
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'bookings@yourdomain.com',
      to: process.env.ADMIN_EMAIL,
      subject: `New Booking: ${booking.fullName} - ${booking.programName}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Client Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${booking.fullName}</li>
          <li><strong>Email:</strong> ${booking.email}</li>
          <li><strong>Phone:</strong> ${booking.phone}</li>
        </ul>

        <p><strong>Booking Details:</strong></p>
        <ul>
          <li><strong>Program:</strong> ${booking.programName}</li>
          <li><strong>Price:</strong> £${booking.price}</li>
          <li><strong>Status:</strong> ${booking.status}</li>
          <li><strong>Payment:</strong> ${booking.paymentStatus}</li>
        </ul>

        ${booking.preferredSlot ? `<p><strong>Preferred Slot:</strong> ${booking.preferredSlot}</p>` : ''}

        ${booking.notes ? `<p><strong>Notes:</strong><br>${booking.notes}</p>` : ''}

        <p><a href="http://localhost:3000/admin">View in Admin Panel</a></p>
      `
    });
    console.log('✅ Admin notification sent successfully');
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error.message);
  }
};

const sendPaymentConfirmation = async (booking) => {
  console.log('📧 Sending payment confirmation to customer...');

  if (!resend) {
    console.log('⚠️  Resend not configured. Email not sent.');
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'bookings@yourdomain.com',
      to: booking.email,
      subject: 'Payment Confirmed - Your Reiki Session Awaits',
      html: `
        <h2>Thank You, ${booking.fullName}!</h2>

        <p>Your payment has been received successfully.</p>

        <h3>Booking Details</h3>
        <ul>
          <li><strong>Program:</strong> ${booking.programName}</li>
          <li><strong>Amount Paid:</strong> £${booking.price}</li>
          <li><strong>Payment Status:</strong> Confirmed</li>
        </ul>

        <h3>What's Next?</h3>
        <p>Lorraine will contact you within 24 hours to:</p>
        <ol>
          <li>Confirm your session time</li>
          <li>Send you a health questionnaire</li>
          <li>Answer any questions you may have</li>
        </ol>

        <p>If you have any immediate questions, feel free to call Lorraine at <strong>07846 633248</strong>.</p>

        <p>Looking forward to supporting you on your wellness journey!</p>

        <p><em>Warm regards,<br>Lorraine - Reiki Your Path to Wellness</em></p>
      `
    });
    console.log('✅ Payment confirmation sent to customer');
  } catch (error) {
    console.error('❌ Failed to send payment confirmation:', error.message);
  }
};

const sendSessionConfirmation = async (booking) => {
  console.log('📧 Sending session confirmation to customer...');

  if (!resend) {
    console.log('⚠️  Resend not configured. Email not sent.');
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'bookings@yourdomain.com',
      to: booking.email,
      subject: 'Your Reiki Session is Confirmed!',
      html: `
        <h2>Session Confirmed</h2>

        <p>Dear ${booking.fullName},</p>

        <p>Your session has been confirmed!</p>

        <h3>Session Details</h3>
        <ul>
          <li><strong>Program:</strong> ${booking.programName}</li>
          <li><strong>Date:</strong> ${booking.confirmedDate || 'TBD'}</li>
          <li><strong>Time:</strong> ${booking.confirmedTime || 'TBD'}</li>
        </ul>

        <h3>What to Bring</h3>
        <p>Please come comfortable and relaxed. Wear loose, comfortable clothing.</p>

        <h3>Need to Reschedule?</h3>
        <p>If you need to reschedule, please contact Lorraine at least 24 hours in advance:</p>
        <p><strong>Phone:</strong> 07846 633248</p>

        <p>Looking forward to seeing you!</p>

        <p><em>Warm regards,<br>Lorraine - Reiki Your Path to Wellness</em></p>
      `
    });
    console.log('✅ Session confirmation sent to customer');
  } catch (error) {
    console.error('❌ Failed to send session confirmation:', error.message);
  }
};

const sendBookingConfirmationToCustomer = async (booking, paymentUrl) => {
  console.log('📧 Sending booking confirmation to customer...');

  if (!resend) {
    console.log('⚠️  Resend not configured. Email not sent.');
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'bookings@yourdomain.com',
      to: booking.email,
      subject: 'Booking Received - Complete Your Payment',
      html: `
        <h2>Thank You, ${booking.fullName}!</h2>

        <p>Your booking request has been received.</p>

        <h3>Booking Details</h3>
        <ul>
          <li><strong>Program:</strong> ${booking.programName}</li>
          <li><strong>Price:</strong> £${booking.price}</li>
          ${booking.preferredSlot ? `<li><strong>Preferred Time:</strong> ${booking.preferredSlot}</li>` : ''}
        </ul>

        <h3>Next Step: Complete Your Payment</h3>
        <p>To secure your booking, please complete payment by clicking the button below:</p>

        ${paymentUrl ? `<p><a href="${paymentUrl}" style="display: inline-block; background-color: #2c5f4f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Pay £${booking.price} Now</a></p>` : '<p>Payment link will be sent to you shortly.</p>'}

        <h3>What Happens Next?</h3>
        <ol>
          <li>Complete your payment</li>
          <li>Lorraine will contact you within 24 hours</li>
          <li>You'll receive a health questionnaire</li>
          <li>Your session will be confirmed</li>
        </ol>

        <p>If you have any questions, feel free to call Lorraine at <strong>07846 633248</strong>.</p>

        <p><em>Warm regards,<br>Lorraine - Reiki Your Path to Wellness</em></p>
      `
    });
    console.log('✅ Customer booking confirmation sent');
  } catch (error) {
    console.error('❌ Failed to send customer confirmation:', error.message);
  }
};

module.exports = {
  sendBookingNotification,
  sendPaymentConfirmation,
  sendSessionConfirmation,
  sendBookingConfirmationToCustomer
};
