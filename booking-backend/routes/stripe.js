const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendPaymentConfirmation, sendPaymentNotificationToAdmin, sendQuestionnaireInvitation } = require('../utils/email');

// Stripe webhook handler
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutComplete(event.data.object);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Handle successful checkout
async function handleCheckoutComplete(session) {
  try {
    const bookingId = session.metadata.bookingId;

    if (!bookingId) {
      console.error('No bookingId in session metadata');
      return;
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      console.error(`Booking not found: ${bookingId}`);
      return;
    }

    // Update booking with payment info
    booking.paymentStatus = 'paid';
    booking.status = 'paid';
    booking.stripePaymentId = session.payment_intent;
    booking.paidAt = new Date();

    await booking.save();

    console.log(`✅ Booking ${bookingId} marked as paid`);

    // Send emails with delays to avoid rate limiting (Resend free tier: 2 emails/second)
    // Using 1 second delays to be safe and account for any other concurrent emails

    // Send payment confirmation email to customer
    await sendPaymentConfirmation(booking);

    // Wait 1 second before next email
    console.log('⏱️  Waiting 1s before next email...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Send payment notification to admin
    await sendPaymentNotificationToAdmin(booking);

    // Wait 1 second before next email
    console.log('⏱️  Waiting 1s before next email...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Send questionnaire invitation email to customer
    await sendQuestionnaireInvitation(booking);

  } catch (error) {
    console.error('Error handling checkout complete:', error);
  }
}

// Handle successful payment
async function handlePaymentSuccess(paymentIntent) {
  try {
    // Find booking by payment intent ID
    const booking = await Booking.findOne({
      stripePaymentId: paymentIntent.id
    });

    if (booking && booking.paymentStatus !== 'paid') {
      booking.paymentStatus = 'paid';
      booking.paidAt = new Date();
      await booking.save();

      console.log(`✅ Payment confirmed for booking ${booking._id}`);
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

// Handle failed payment
async function handlePaymentFailed(paymentIntent) {
  try {
    const booking = await Booking.findOne({
      stripePaymentId: paymentIntent.id
    });

    if (booking) {
      console.log(`❌ Payment failed for booking ${booking._id}`);
      // You might want to send an email notification here
    }
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

// Handle refund
async function handleRefund(charge) {
  try {
    const booking = await Booking.findOne({
      stripePaymentId: charge.payment_intent
    });

    if (booking) {
      booking.paymentStatus = 'refunded';
      booking.status = 'cancelled';
      await booking.save();

      console.log(`↩️ Booking ${booking._id} refunded`);
    }
  } catch (error) {
    console.error('Error handling refund:', error);
  }
}

module.exports = router;
