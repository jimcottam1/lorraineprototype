# Lorraine's Booking System - Backend

Custom-built booking system with admin dashboard for managing Reiki sessions.

## Features

- ✅ RESTful API for booking management
- ✅ Stripe payment integration
- ✅ MongoDB database
- ✅ Admin dashboard with authentication
- ✅ Automatic payment tracking
- ✅ Booking status management

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Generate Admin Password
```bash
node utils/generatePasswordHash.js YOUR_SECURE_PASSWORD
# Copy the hash to your .env file
```

### 4. Start Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Public Endpoints (No Auth Required)

#### Create Booking
```
POST /api/bookings
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "07123456789",
  "program": "experience",
  "preferredDays": ["Monday", "Wednesday"],
  "preferredTimes": ["Morning"],
  "notes": "First time booking"
}
```

#### Get Booking
```
GET /api/bookings/:id
```

#### Update Questionnaire
```
PUT /api/bookings/:id/questionnaire
Content-Type: application/json

{
  "health": "...",
  "goals": "...",
  ...
}
```

### Admin Endpoints (Require Authentication)

#### Login
```
POST /api/admin/login
Content-Type: application/json

{
  "password": "your_admin_password"
}

Response:
{
  "success": true,
  "token": "jwt_token_here"
}
```

#### Get All Bookings
```
GET /api/admin/bookings
Authorization: Bearer YOUR_JWT_TOKEN

Query params:
- status: pending|paid|confirmed|completed|cancelled
- program: experience|solo|wellness|weightloss|menopause|reiki1|reiki2
- startDate: ISO date string
- endDate: ISO date string
- limit: number (default: 100)
- page: number (default: 1)
```

#### Get Single Booking
```
GET /api/admin/bookings/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Update Booking Status
```
PUT /api/admin/bookings/:id/status
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "status": "confirmed"
}
```

#### Confirm Session Date/Time
```
PUT /api/admin/bookings/:id/confirm
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "confirmedDate": "2025-12-01",
  "confirmedTime": "14:00"
}
```

#### Update Admin Notes
```
PUT /api/admin/bookings/:id/notes
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "adminNotes": "Client prefers morning sessions"
}
```

#### Get Statistics
```
GET /api/admin/stats
Authorization: Bearer YOUR_JWT_TOKEN

Response:
{
  "totalBookings": 45,
  "pendingBookings": 3,
  "confirmedBookings": 12,
  "completedBookings": 28,
  "paidBookings": 40,
  "pendingPayments": 2,
  "totalRevenue": 2560,
  "recentBookings": 5
}
```

### Webhook Endpoints

#### Stripe Webhook
```
POST /api/webhooks/stripe
Stripe-Signature: ...
```

Handles:
- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

## Admin Dashboard

Access at: `http://localhost:3000/admin`

Features:
- View all bookings
- Filter by status, program
- Update booking status
- Confirm session times
- Add admin notes
- View statistics
- View questionnaire responses

## Program Types

```javascript
{
  'experience': { price: 64, name: 'Experience Reiki Session' },
  'solo': { price: 70, name: 'Solo Follow-Up Session' },
  'wellness': { price: 256, name: 'Path to Wellness - 4-Week Program' },
  'weightloss': { price: 256, name: 'Weight Loss & Wellbeing' },
  'menopause': { price: 256, name: 'Pathway Through Menopause' },
  'reiki1': { price: 0, name: 'Reiki Level One - FREE' },
  'reiki2': { price: 0, name: 'Reiki Level Two - FREE' }
}
```

## Booking Status Flow

```
pending → paid → confirmed → completed
                    ↓
                cancelled
```

## Payment Status

- `pending` - Awaiting payment
- `paid` - Payment received
- `free` - Free consultation (no payment required)
- `refunded` - Payment refunded

## Environment Variables

See `.env.example` for all required environment variables.

Required:
- `MONGODB_URI` - MongoDB connection string
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `ADMIN_PASSWORD_HASH` - Bcrypt hash of admin password
- `JWT_SECRET` - Secret for JWT token signing

Optional:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS
- `ADMIN_EMAIL` - Email for notifications

## Development

### Running Tests
```bash
npm test
# (Tests to be implemented)
```

### Database Schema

**Booking Model**:
- Client info (name, email, phone)
- Program details
- Preferences (days, times)
- Status tracking
- Payment tracking
- Confirmed session details
- Questionnaire data
- Admin notes
- Timestamps

## Security

- Admin password hashed with bcrypt
- JWT authentication for admin routes
- Stripe webhook signature verification
- CORS configuration
- Environment variables for sensitive data

## Deployment

See `BOOKING-SYSTEM-SETUP.md` for detailed deployment instructions.

Quick deploy to Railway:
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

## Troubleshooting

**MongoDB connection failed**:
- Check MONGODB_URI is correct
- Verify MongoDB Atlas network access settings
- Ensure database user has correct permissions

**Stripe webhook not working**:
- Verify STRIPE_WEBHOOK_SECRET is correct
- Check webhook endpoint URL in Stripe dashboard
- Test webhook using Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

**Admin login failing**:
- Regenerate password hash with `node utils/generatePasswordHash.js`
- Verify ADMIN_PASSWORD_HASH in .env
- Check JWT_SECRET is set

## Support

For issues or questions, refer to `BOOKING-SYSTEM-SETUP.md` or contact the developer.

## License

MIT
