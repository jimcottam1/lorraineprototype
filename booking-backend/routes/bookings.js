const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Program = require('../models/Program');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendBookingNotification } = require('../utils/email');

// Helper function to parse price from various formats
function parsePrice(priceString) {
  if (!priceString) return 0;

  // Handle "FREE", "Free", etc.
  if (typeof priceString === 'string' && priceString.toLowerCase().includes('free')) {
    return 0;
  }

  // Handle numeric values
  if (typeof priceString === 'number') {
    return priceString;
  }

  // Parse string - remove £, $, commas, spaces
  const cleaned = priceString.replace(/[£$,\s]/g, '');
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? 0 : parsed;
}

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      program,
      slotId,
      notes
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !program) {
      return res.status(400).json({
        error: 'Missing required fields: fullName, email, phone, program'
      });
    }

    // Fetch program from database
    const programDoc = await Program.findOne({ id: program, active: true });

    if (!programDoc) {
      return res.status(400).json({
        error: 'Invalid program selected or program not available'
      });
    }

    // Parse price and get program details from database
    const price = parsePrice(programDoc.price);
    const programName = programDoc.name;

    // If a slot is provided, try to book it
    let bookedSlot = null;
    if (slotId) {
      const TimeSlot = require('../models/TimeSlot');
      try {
        bookedSlot = await TimeSlot.findById(slotId);

        if (!bookedSlot) {
          return res.status(400).json({
            error: 'Selected time slot not found'
          });
        }

        if (!bookedSlot.isAvailable) {
          return res.status(400).json({
            error: 'Selected time slot is no longer available. Please choose another slot.'
          });
        }
      } catch (err) {
        return res.status(400).json({
          error: 'Invalid slot ID'
        });
      }
    }

    // Create booking
    const booking = new Booking({
      fullName,
      email,
      phone,
      program,
      programName,
      price,
      preferredDays: [],
      preferredTimes: [],
      notes: notes || '',
      paymentStatus: price === 0 ? 'free' : 'pending',
      status: price === 0 ? 'confirmed' : 'pending'
    });

    await booking.save();

    // Book the slot after booking is saved
    if (bookedSlot) {
      const TimeSlot = require('../models/TimeSlot');
      await TimeSlot.bookSlot(slotId, booking._id);

      // Store as preferred slot - admin must confirm to set confirmedDate/Time
      booking.preferredSlot = `${bookedSlot.date} at ${bookedSlot.time}`;
      await booking.save();
    }

    // Send booking notification email to admin
    await sendBookingNotification(booking);

    // If it's a paid program, create Stripe checkout session
    let checkoutUrl = null;
    if (price > 0) {
      console.log(`💳 Creating Stripe checkout for £${price}...`);
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'gbp',
                product_data: {
                  name: programName,
                  description: `Booking for ${fullName}`,
                },
                unit_amount: price * 100, // Convert to pence
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.FRONTEND_URL}/booking-success.html?session_id={CHECKOUT_SESSION_ID}&booking_id=${booking._id}`,
          cancel_url: `${process.env.FRONTEND_URL}/booking.html?cancelled=true`,
          customer_email: email,
          metadata: {
            bookingId: booking._id.toString(),
            program: program
          }
        });

        // Save checkout session ID
        booking.stripeCheckoutSessionId = session.id;
        await booking.save();

        checkoutUrl = session.url;
        console.log(`✅ Stripe checkout created: ${checkoutUrl}`);
      } catch (stripeError) {
        console.error('❌ Stripe error:', stripeError.message);
        console.error('Full error:', stripeError);
        // Don't fail the booking, just log the error
      }
    }

    const response = {
      success: true,
      booking: {
        id: booking._id,
        fullName: booking.fullName,
        email: booking.email,
        program: booking.programName,
        price: booking.price,
        status: booking.status,
        paymentStatus: booking.paymentStatus
      },
      checkoutUrl: checkoutUrl
    };

    console.log('📤 Sending response with checkoutUrl:', !!checkoutUrl);
    res.status(201).json(response);

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      error: 'Failed to create booking',
      details: error.message
    });
  }
});

// Get booking by ID (for clients to check status)
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Return limited info for clients
    res.json({
      id: booking._id,
      fullName: booking.fullName,
      email: booking.email,
      phone: booking.phone,
      program: booking.program,
      programName: booking.programName,
      price: booking.price,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      confirmedDate: booking.confirmedDate,
      confirmedTime: booking.confirmedTime,
      createdAt: booking.createdAt
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Update questionnaire data
router.put('/:id/questionnaire', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.questionnaireCompleted = true;
    booking.questionnaireData = req.body;
    await booking.save();

    res.json({
      success: true,
      message: 'Questionnaire submitted successfully'
    });

  } catch (error) {
    console.error('Error updating questionnaire:', error);
    res.status(500).json({ error: 'Failed to update questionnaire' });
  }
});

module.exports = router;
