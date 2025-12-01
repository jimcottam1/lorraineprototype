const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Stripe webhook needs raw body, so we handle it before JSON parser
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// Parse JSON bodies for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (admin panel)
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection and Email Template Check
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');

    // Check and seed questionnaire email template if missing
    await checkAndSeedQuestionnaireTemplate();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Auto-seed questionnaire template if it doesn't exist
const checkAndSeedQuestionnaireTemplate = async () => {
  try {
    const EmailTemplate = require('./models/EmailTemplate');

    // Check if questionnaire template exists
    const exists = await EmailTemplate.findOne({ templateId: 'questionnaire_invitation' });

    if (!exists) {
      console.log('📧 Questionnaire template not found, seeding...');

      // Email layout wrapper (same as seedEmailTemplates.js)
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
          <tr>
            <td style="background: linear-gradient(135deg, #2c5f4f 0%, #234a3d 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Reiki Your Path to Wellness</h1>
              <p style="margin: 8px 0 0 0; color: #e0e0e0; font-size: 14px;">with Lorraine</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                <strong>Contact Lorraine</strong>
              </p>
              <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
                📞 <a href="tel:07846633248" style="color: #2c5f4f; text-decoration: none;">07846 633248</a>
              </p>
              <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">
                📍 Limerick, Ireland
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

      const questionnaireTemplate = new EmailTemplate({
        templateId: 'questionnaire_invitation',
        name: 'Questionnaire Invitation (Customer)',
        description: 'Email sent to customer after payment with questionnaire link',
        subject: 'Complete Your Wellness Questionnaire',
        htmlBody: emailLayout(`
      <h2 style="margin: 0 0 10px 0; color: #2c5f4f; font-size: 22px;">Hi {{fullName}},</h2>
      <p style="margin: 0 0 25px 0; color: #666; font-size: 16px; line-height: 1.6;">Thank you for booking your {{programName}} session!</p>

      <div style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ff9800;">
        <h3 style="margin: 0 0 10px 0; color: #e65100; font-size: 18px;">📋 Next Step: Complete Your Wellness Questionnaire</h3>
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

      <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #f0f8f5 0%, #e0f2f1 100%); border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #2c5f4f; font-size: 16px; font-style: italic;">Looking forward to supporting you on your wellness journey!</p>
      </div>
    `),
        availableVariables: [
          { variable: '{{fullName}}', description: 'Client full name' },
          { variable: '{{programName}}', description: 'Program name' },
          { variable: '{{questionnaireUrl}}', description: 'Link to wellness questionnaire with booking ID' }
        ],
        active: true
      });

      await questionnaireTemplate.save();
      console.log('✅ Questionnaire invitation template seeded successfully!');
    }
  } catch (error) {
    console.error('⚠️  Error checking/seeding questionnaire template:', error.message);
    // Don't crash the server, just log the error
  }
};

connectDB();

// Routes
const bookingRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');
const stripeRoutes = require('./routes/stripe');
const slotRoutes = require('./routes/slots');
const contentRoutes = require('./routes/content');
const emailTemplateRoutes = require('./routes/emailTemplates');

app.use('/api/bookings', bookingRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/webhooks', stripeRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/email-templates', emailTemplateRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Lorraine Booking System API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`🔗 API health: http://localhost:${PORT}/api/health`);
});

module.exports = app;
