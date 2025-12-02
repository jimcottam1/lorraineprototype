// Run this from the booking-backend directory to test the complete questionnaire flow
const mongoose = require('mongoose');
const Booking = require('./booking-backend/models/Booking');
const { sendPaymentConfirmation, sendPaymentNotificationToAdmin, sendQuestionnaireInvitation } = require('./booking-backend/utils/email');
require('dotenv').config({ path: './booking-backend/.env' });

async function testQuestionnaireFlow() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Create a test booking (simulating a real booking)
    const testBooking = new Booking({
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com', // Change to your email if you want to receive the email
      phone: '07846987654',
      program: 'menopause',
      programName: 'Pathway Through Menopause - 4-Week Program',
      price: 256,
      status: 'paid',
      paymentStatus: 'paid',
      paidAt: new Date(),
      stripePaymentId: 'pi_test_' + Date.now()
    });

    await testBooking.save();
    console.log('✅ Test booking created:', testBooking._id);
    console.log('   Name:', testBooking.fullName);
    console.log('   Email:', testBooking.email);
    console.log('   Program:', testBooking.programName);
    console.log('');

    // Simulate what happens after Stripe payment (from stripe webhook)
    console.log('📧 Simulating post-payment email flow...\n');

    // 1. Send payment confirmation to customer
    console.log('1. Sending payment confirmation to customer...');
    await sendPaymentConfirmation(testBooking);

    // 2. Send payment notification to admin
    console.log('2. Sending payment notification to admin...');
    await sendPaymentNotificationToAdmin(testBooking);

    // 3. Send questionnaire invitation to customer
    console.log('3. Sending questionnaire invitation to customer...');
    await sendQuestionnaireInvitation(testBooking);

    // Generate the questionnaire URL
    const questionnaireUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/questionnaire.html?booking_id=${testBooking._id}`;

    console.log('\n✅ All emails sent successfully!\n');
    console.log('📋 Test the questionnaire by opening this URL:');
    console.log(questionnaireUrl);
    console.log('\n💡 The form should be pre-filled with:');
    console.log('   - Name: Jane Smith');
    console.log('   - Email: jane.smith@example.com');
    console.log('   - Phone: 07846987654');
    console.log('   - Program: Pathway Through Menopause');
    console.log('\n📊 After submitting, check the admin panel at:');
    console.log(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testQuestionnaireFlow();
