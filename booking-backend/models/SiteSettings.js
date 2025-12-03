const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  // There should only be one document in this collection
  _id: {
    type: String,
    default: 'site-settings'
  },

  // Site Information
  siteTitle: {
    type: String,
    default: 'Reiki - Your Path to Wellness'
  },
  tagline: {
    type: String,
    default: 'Begin Your Journey to Wellness'
  },
  heroDescription: {
    type: String,
    default: 'Experience the healing power of Reiki through our personalized 4-week treatment plans'
  },

  // Contact Information
  phone: {
    type: String,
    default: '07846633248'
  },
  location: {
    type: String,
    default: 'Wallington'
  },
  adminEmail: {
    type: String,
    default: process.env.ADMIN_EMAIL || 'admin@example.com'
  },
  businessName: {
    type: String,
    default: 'Happiness in Harmony'
  },
  businessTagline: {
    type: String,
    default: 'Counselling, Reiki, Coaching'
  },

  // Practitioner Info
  practitionerName: {
    type: String,
    default: 'Lorraine Turner'
  },
  practitionerPhoto: {
    type: String,
    default: 'images/lorraine-portrait.jpg'
  },

  // About Section
  whatIsReiki: {
    type: String,
    default: 'Reiki is a gentle, non-invasive healing practice that promotes balance and wellness. It can work alongside or as an alternative to traditional medical approaches, supporting your body\'s natural healing abilities.'
  },
  reikiDisclaimer: {
    type: String,
    default: 'Reiki is complementary to medical treatment and should not replace advice from your doctor.'
  },

  // Social Media
  facebookUrl: {
    type: String,
    default: 'https://www.facebook.com/profile.php?id=61581203812442'
  },
  instagramUrl: {
    type: String,
    default: 'https://www.instagram.com/happinessinreiki'
  },
  instagramHandle: {
    type: String,
    default: '@happinessinreiki'
  },
  mainWebsiteUrl: {
    type: String,
    default: 'https://happinessinharmony.co.uk'
  },

  // Media Files
  introVideoUrl: {
    type: String,
    default: 'media/intro-video.mp4'
  },
  meditationAudioUrl: {
    type: String,
    default: 'media/sample-meditation.mp3'
  },
  chakraImageUrl: {
    type: String,
    default: 'images/chakra-body.png'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
