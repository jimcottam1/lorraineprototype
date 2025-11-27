const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['4-week', 'single-session', 'course']
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  caseStudyPrice: {
    type: String,
    default: null
  },
  features: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  badge: {
    type: String,
    default: null
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  stripePaymentLink: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Program', programSchema);
