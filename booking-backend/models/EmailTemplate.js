const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  templateId: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'booking_notification_admin',
      'booking_confirmation_customer',
      'payment_confirmation_customer',
      'payment_notification_admin',
      'questionnaire_invitation',
      'session_confirmation_customer'
    ]
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  htmlBody: {
    type: String,
    required: true
  },
  availableVariables: [{
    variable: String,
    description: String
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);
