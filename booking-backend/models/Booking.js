const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Client Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },

  // Program/Session Details
  program: {
    type: String,
    required: true,
    enum: [
      'experience',      // Experience Reiki - £64
      'solo',           // Solo Follow-Up - £70
      'wellness',       // Path to Wellness - £256
      'weightloss',     // Weight Loss & Wellbeing - £256
      'menopause',      // Pathway Through Menopause - £256
      'reiki1',         // Reiki Level One - FREE consultation
      'reiki2'          // Reiki Level Two - FREE consultation
    ]
  },
  programName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

  // Scheduling Preferences
  preferredDays: {
    type: [String],
    default: []
  },
  preferredTimes: {
    type: [String],
    default: []
  },
  notes: {
    type: String,
    default: ''
  },

  // Booking Status
  status: {
    type: String,
    enum: ['pending', 'paid', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },

  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'free'],
    default: 'pending'
  },
  stripePaymentId: {
    type: String,
    default: null
  },
  stripeCheckoutSessionId: {
    type: String,
    default: null
  },
  paidAt: {
    type: Date,
    default: null
  },

  // Confirmed Session Details
  confirmedDate: {
    type: Date,
    default: null
  },
  confirmedTime: {
    type: String,
    default: null
  },

  // Questionnaire
  questionnaireCompleted: {
    type: Boolean,
    default: false
  },
  questionnaireData: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },

  // Admin Notes
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Indexes for faster queries
bookingSchema.index({ email: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ createdAt: -1 });

// Virtual for full program details
bookingSchema.virtual('programDetails').get(function() {
  const programs = {
    'experience': { name: 'Experience Reiki', price: 64, duration: '60 min' },
    'solo': { name: 'Solo Follow-Up Session', price: 70, duration: '60 min' },
    'wellness': { name: 'Path to Wellness - 4-Week Program', price: 256, duration: '4 sessions' },
    'weightloss': { name: 'Weight Loss & Wellbeing - 4-Week Program', price: 256, duration: '4 sessions' },
    'menopause': { name: 'Pathway Through Menopause - 4-Week Program', price: 256, duration: '4 sessions' },
    'reiki1': { name: 'Reiki Level One Course - FREE Consultation', price: 0, duration: 'Consultation' },
    'reiki2': { name: 'Reiki Level Two Course - FREE Consultation', price: 0, duration: 'Consultation' }
  };
  return programs[this.program] || { name: 'Unknown', price: 0, duration: 'N/A' };
});

// Make virtuals visible in JSON
bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
