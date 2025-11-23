const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// DEMO MODE - No database required!
console.log('🎨 Running in DEMO MODE - No MongoDB needed for testing UI');

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Demo admin credentials
const DEMO_PASSWORD = 'admin123';
const DEMO_PASSWORD_HASH = '$2b$10$guXsN3THinZtpI7dGVs.Zuare3gRkbi2NgcPlzES.q7yK1ZD4nO2S';
const JWT_SECRET = 'demo-secret-key';

// Mock booking data
let mockBookings = [
  {
    _id: '1',
    fullName: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '07123456789',
    program: 'experience',
    programName: 'Experience Reiki Session',
    price: 64,
    preferredDays: ['Monday', 'Wednesday'],
    preferredTimes: ['Morning'],
    notes: 'First time trying Reiki',
    status: 'paid',
    paymentStatus: 'paid',
    questionnaireCompleted: false,
    createdAt: new Date('2024-11-20T10:30:00'),
    updatedAt: new Date('2024-11-20T10:30:00')
  },
  {
    _id: '2',
    fullName: 'Michael Brown',
    email: 'michael@example.com',
    phone: '07987654321',
    program: 'wellness',
    programName: 'Path to Wellness - 4-Week Program',
    price: 256,
    preferredDays: ['Tuesday', 'Thursday'],
    preferredTimes: ['Afternoon'],
    notes: 'Looking forward to the full program',
    status: 'confirmed',
    paymentStatus: 'paid',
    confirmedDate: new Date('2024-11-25T14:00:00'),
    confirmedTime: '14:00',
    questionnaireCompleted: true,
    questionnaireData: {
      health: 'Good overall health',
      goals: 'Reduce stress and improve wellbeing'
    },
    createdAt: new Date('2024-11-18T15:20:00'),
    updatedAt: new Date('2024-11-18T15:20:00')
  },
  {
    _id: '3',
    fullName: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '07456123789',
    program: 'solo',
    programName: 'Solo Follow-Up Session',
    price: 70,
    preferredDays: ['Friday'],
    preferredTimes: ['Evening'],
    notes: 'Follow-up from last month',
    status: 'completed',
    paymentStatus: 'paid',
    confirmedDate: new Date('2024-11-15T18:00:00'),
    confirmedTime: '18:00',
    questionnaireCompleted: true,
    adminNotes: 'Great progress, very receptive to energy work',
    createdAt: new Date('2024-11-10T09:00:00'),
    updatedAt: new Date('2024-11-15T19:00:00')
  }
];

// Admin login
app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  const isValid = await bcrypt.compare(password, DEMO_PASSWORD_HASH);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '7d' });

  res.json({
    success: true,
    token,
    expiresIn: '7d'
  });
});

// Auth middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all bookings
app.get('/api/admin/bookings', authenticateAdmin, (req, res) => {
  const { status, program } = req.query;

  let filtered = [...mockBookings];

  if (status) {
    filtered = filtered.filter(b => b.status === status);
  }

  if (program) {
    filtered = filtered.filter(b => b.program === program);
  }

  res.json({
    bookings: filtered,
    pagination: {
      total: filtered.length,
      page: 1,
      limit: 100,
      pages: 1
    }
  });
});

// Get single booking
app.get('/api/admin/bookings/:id', authenticateAdmin, (req, res) => {
  const booking = mockBookings.find(b => b._id === req.params.id);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  res.json(booking);
});

// Update booking status
app.put('/api/admin/bookings/:id/status', authenticateAdmin, (req, res) => {
  const booking = mockBookings.find(b => b._id === req.params.id);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  booking.status = req.body.status;
  booking.updatedAt = new Date();

  res.json({ success: true, booking });
});

// Confirm booking
app.put('/api/admin/bookings/:id/confirm', authenticateAdmin, (req, res) => {
  const booking = mockBookings.find(b => b._id === req.params.id);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  booking.confirmedDate = new Date(req.body.confirmedDate);
  booking.confirmedTime = req.body.confirmedTime;
  booking.status = 'confirmed';
  booking.updatedAt = new Date();

  res.json({ success: true, booking });
});

// Update notes
app.put('/api/admin/bookings/:id/notes', authenticateAdmin, (req, res) => {
  const booking = mockBookings.find(b => b._id === req.params.id);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  booking.adminNotes = req.body.adminNotes;
  booking.updatedAt = new Date();

  res.json({ success: true, booking });
});

// Get stats
app.get('/api/admin/stats', authenticateAdmin, (req, res) => {
  const stats = {
    totalBookings: mockBookings.length,
    pendingBookings: mockBookings.filter(b => b.status === 'pending').length,
    confirmedBookings: mockBookings.filter(b => b.status === 'confirmed').length,
    completedBookings: mockBookings.filter(b => b.status === 'completed').length,
    paidBookings: mockBookings.filter(b => b.paymentStatus === 'paid').length,
    pendingPayments: mockBookings.filter(b => b.paymentStatus === 'pending').length,
    totalRevenue: mockBookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.price, 0),
    recentBookings: mockBookings.length
  };

  res.json(stats);
});

// Create booking (demo)
app.post('/api/bookings', (req, res) => {
  const newBooking = {
    _id: String(mockBookings.length + 1),
    ...req.body,
    status: 'pending',
    paymentStatus: 'pending',
    questionnaireCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  mockBookings.push(newBooking);

  res.status(201).json({
    success: true,
    booking: newBooking,
    checkoutUrl: null // Demo mode - no Stripe
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    mode: 'DEMO',
    message: 'Demo mode - no database required'
  });
});

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('');
  console.log('='.repeat(60));
  console.log('🎨 DEMO MODE - Admin Dashboard Testing');
  console.log('='.repeat(60));
  console.log('');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log('');
  console.log('🔐 Login credentials:');
  console.log('   Password: admin123');
  console.log('');
  console.log('📝 Demo data: 3 sample bookings loaded');
  console.log('');
  console.log('ℹ️  This is demo mode - changes won\'t persist');
  console.log('   To use real database, see MONGODB-QUICK-SETUP.md');
  console.log('');
  console.log('='.repeat(60));
  console.log('');
});

module.exports = app;
