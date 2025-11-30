const express = require('express');
const router = express.Router();
const EmailTemplate = require('../models/EmailTemplate');
const { authenticateAdmin } = require('../middleware/auth');

// Get all email templates
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const templates = await EmailTemplate.find().sort({ templateId: 1 });
    res.json(templates);
  } catch (error) {
    console.error('Error fetching email templates:', error);
    res.status(500).json({ error: 'Failed to fetch email templates' });
  }
});

// Get single email template
router.get('/:templateId', authenticateAdmin, async (req, res) => {
  try {
    const template = await EmailTemplate.findOne({ templateId: req.params.templateId });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    console.error('Error fetching email template:', error);
    res.status(500).json({ error: 'Failed to fetch email template' });
  }
});

// Update email template
router.put('/:templateId', authenticateAdmin, async (req, res) => {
  try {
    const { subject, htmlBody, active } = req.body;

    const template = await EmailTemplate.findOne({ templateId: req.params.templateId });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    if (subject !== undefined) template.subject = subject;
    if (htmlBody !== undefined) template.htmlBody = htmlBody;
    if (active !== undefined) template.active = active;

    await template.save();

    res.json({ success: true, template });
  } catch (error) {
    console.error('Error updating email template:', error);
    res.status(500).json({ error: 'Failed to update email template' });
  }
});

// Send test email
router.post('/:templateId/test', authenticateAdmin, async (req, res) => {
  try {
    const { testEmail } = req.body;

    if (!testEmail) {
      return res.status(400).json({ error: 'Test email address required' });
    }

    const template = await EmailTemplate.findOne({ templateId: req.params.templateId });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Import email utility
    const { sendTestEmail } = require('../utils/email');

    // Send test email with sample data
    await sendTestEmail(template, testEmail);

    res.json({ success: true, message: 'Test email sent' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Failed to send test email' });
  }
});

module.exports = router;
