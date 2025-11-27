const express = require('express');
const router = express.Router();
const Program = require('../models/Program');
const Testimonial = require('../models/Testimonial');
const SiteSettings = require('../models/SiteSettings');
const jwt = require('jsonwebtoken');

// Authentication middleware (reused from admin.js)
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

// ========================================
// PROGRAMS ROUTES
// ========================================

// Get all programs (public - no auth needed)
router.get('/programs', async (req, res) => {
  try {
    const { type, active } = req.query;
    const query = {};

    if (type) query.type = type;
    if (active !== undefined) query.active = active === 'true';

    const programs = await Program.find(query).sort({ order: 1, createdAt: 1 });
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

// Get single program
router.get('/programs/:id', async (req, res) => {
  try {
    const program = await Program.findOne({ id: req.params.id });
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ error: 'Failed to fetch program' });
  }
});

// Create program (admin only)
router.post('/programs', authenticateAdmin, async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(500).json({ error: 'Failed to create program' });
  }
});

// Update program (admin only)
router.put('/programs/:id', authenticateAdmin, async (req, res) => {
  try {
    const program = await Program.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    res.json(program);
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).json({ error: 'Failed to update program' });
  }
});

// Delete program (admin only)
router.delete('/programs/:id', authenticateAdmin, async (req, res) => {
  try {
    const program = await Program.findOneAndDelete({ id: req.params.id });

    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    res.json({ success: true, message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ error: 'Failed to delete program' });
  }
});

// ========================================
// TESTIMONIALS ROUTES
// ========================================

// Get all testimonials (public)
router.get('/testimonials', async (req, res) => {
  try {
    const { active } = req.query;
    const query = {};

    if (active !== undefined) query.active = active === 'true';

    const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Get single testimonial
router.get('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({ error: 'Failed to fetch testimonial' });
  }
});

// Create testimonial (admin only)
router.post('/testimonials', authenticateAdmin, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// Update testimonial (admin only)
router.put('/testimonials/:id', authenticateAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// Delete testimonial (admin only)
router.delete('/testimonials/:id', authenticateAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// ========================================
// SITE SETTINGS ROUTES
// ========================================

// Get site settings (public)
router.get('/settings', async (req, res) => {
  try {
    let settings = await SiteSettings.findById('site-settings');

    // Create default settings if they don't exist
    if (!settings) {
      settings = new SiteSettings({ _id: 'site-settings' });
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({ error: 'Failed to fetch site settings' });
  }
});

// Update site settings (admin only)
router.put('/settings', authenticateAdmin, async (req, res) => {
  try {
    let settings = await SiteSettings.findById('site-settings');

    if (!settings) {
      // Create if doesn't exist
      settings = new SiteSettings({ _id: 'site-settings', ...req.body });
    } else {
      // Update existing
      Object.assign(settings, req.body);
    }

    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error('Error updating site settings:', error);
    res.status(500).json({ error: 'Failed to update site settings' });
  }
});

module.exports = router;
