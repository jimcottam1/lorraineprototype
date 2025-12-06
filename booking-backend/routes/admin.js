const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendSessionConfirmation } = require('../utils/email');

// Simple authentication middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No authentication token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    // Compare with hashed password from environment
    const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token (valid for 7 days)
    const token = jwt.sign(
      { admin: true },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      expiresIn: '7d'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get all bookings (with filters)
router.get('/bookings', authenticateAdmin, async (req, res) => {
  try {
    const {
      status,
      paymentStatus,
      program,
      startDate,
      endDate,
      limit = 100,
      page = 1
    } = req.query;

    // Build query
    const query = {};

    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (program) query.program = program;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get single booking with full details
router.get('/bookings/:id', authenticateAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);

  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Update booking status
router.put('/bookings/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['pending', 'paid', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      booking
    });

  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Update confirmed session date/time
router.put('/bookings/:id/confirm', authenticateAdmin, async (req, res) => {
  console.log(`🎯 Confirm endpoint hit for booking ${req.params.id}`);
  console.log(`📅 Received data:`, req.body);

  try {
    const { confirmedDate, confirmedTime } = req.body;

    if (!confirmedDate || !confirmedTime) {
      return res.status(400).json({ error: 'Date and time required' });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.confirmedDate = new Date(confirmedDate);
    booking.confirmedTime = confirmedTime;
    booking.status = 'confirmed';
    await booking.save();

    // Send session confirmation email to customer
    await sendSessionConfirmation(booking);

    res.json({
      success: true,
      booking
    });

  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ error: 'Failed to confirm booking' });
  }
});

// Update admin notes
router.put('/bookings/:id/notes', authenticateAdmin, async (req, res) => {
  try {
    const { adminNotes } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.adminNotes = adminNotes || '';
    await booking.save();

    res.json({
      success: true,
      booking
    });

  } catch (error) {
    console.error('Error updating notes:', error);
    res.status(500).json({ error: 'Failed to update notes' });
  }
});

// Get dashboard statistics
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    const paidBookings = await Booking.countDocuments({ paymentStatus: 'paid' });
    const pendingPayments = await Booking.countDocuments({ paymentStatus: 'pending' });

    // Calculate total revenue (paid bookings only)
    const revenueData = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // Recent bookings (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentBookings = await Booking.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      paidBookings,
      pendingPayments,
      totalRevenue,
      recentBookings
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Delete booking (use with caution)
router.delete('/bookings/:id', authenticateAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
