const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');
const { authenticateAdmin } = require('../middleware/auth');

// Get available slots (public endpoint)
router.get('/available', async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date();
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    
    const slots = await TimeSlot.getAvailableSlots(startDate, endDate);
    
    res.json({
      success: true,
      slots: slots.map(slot => slot.toDisplay()),
      count: slots.length
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch available slots' });
  }
});

// Get all slots (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const { startDate, endDate, isAvailable } = req.query;
    const query = {};
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true';
    }
    
    const slots = await TimeSlot.find(query).populate('bookingId').sort({ date: 1, time: 1 });
    
    res.json({ success: true, slots, count: slots.length });
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch slots' });
  }
});

// Create bulk slots (admin only)
router.post('/bulk', authenticateAdmin, async (req, res) => {
  try {
    const { startDate, endDate, times, duration, excludeDays } = req.body;
    
    if (!startDate || !endDate || !times || times.length === 0) {
      return res.status(400).json({ success: false, error: 'startDate, endDate, and times are required' });
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const slotsToCreate = [];
    const excludeDaysSet = new Set(excludeDays || []);
    
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      if (excludeDaysSet.has(dayOfWeek)) continue;
      
      for (const time of times) {
        slotsToCreate.push({ date: new Date(date), time, duration: duration || 60 });
      }
    }
    
    const results = await Promise.allSettled(
      slotsToCreate.map(slotData => TimeSlot.create(slotData).catch(err => {
        if (err.code === 11000) return null;
        throw err;
      }))
    );
    
    const created = results.filter(r => r.status === 'fulfilled' && r.value).length;
    
    res.json({ success: true, created, total: slotsToCreate.length });
  } catch (error) {
    console.error('Error creating bulk slots:', error);
    res.status(500).json({ success: false, error: 'Failed to create slots' });
  }
});

// Book a slot
router.post('/:id/book', async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ success: false, error: 'bookingId is required' });
    }
    
    const slot = await TimeSlot.bookSlot(req.params.id, bookingId);
    res.json({ success: true, slot: slot.toDisplay() });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete slot (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({ success: false, error: 'Slot not found' });
    }
    if (!slot.isAvailable) {
      return res.status(400).json({ success: false, error: 'Cannot delete a booked slot' });
    }
    
    await slot.deleteOne();
    res.json({ success: true, message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete slot' });
  }
});

module.exports = router;
