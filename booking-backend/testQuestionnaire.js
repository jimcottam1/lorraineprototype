const mongoose = require('mongoose');
const Booking = require('./models/Booking');
const { sendQuestionnaireInvitation } = require('./utils/email');
require('dotenv').config();

async function testQuestionnaire() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create a test booking
    const testBooking = new Booking({
      fullName: 'Test User',
      email: 'test@example.com', // Change this to your email to receive the test email
      phone: '07846123456',
      program: 'wellness',
      programName: 'Path to Wellness - 4-Week Program',
      price: 256,
      status: 'paid',
      paymentStatus: 'paid',
      paidAt: new Date()
    });

    await testBooking.save();
    console.log('✅ Test booking created:', testBooking._id);

    // Send questionnaire invitation email
    await sendQuestionnaireInvitation(testBooking);
    console.log('✅ Questionnaire invitation sent!');

    // Print the questionnaire URL for direct testing
    const questionnaireUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/questionnaire.html?booking_id=${testBooking._id}`;
    console.log('\n📋 Questionnaire URL (open in browser):');
    console.log(questionnaireUrl);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testQuestionnaire();
