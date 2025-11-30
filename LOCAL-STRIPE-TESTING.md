# Testing Stripe Payments Locally

## 🎯 Quick Setup for Local Testing

### Step 1: Install Stripe CLI

**Windows:**
```bash
# Download from: https://github.com/stripe/stripe-cli/releases/latest
# Or use Scoop:
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

**Mac:**
```bash
brew install stripe/stripe-cli/stripe
```

**Verify installation:**
```bash
stripe --version
```

### Step 2: Login to Stripe CLI

```bash
stripe login
```

This will open your browser to authorize the CLI with your Stripe account.

### Step 3: Update Local Environment Variables

Create or update `booking-backend/.env`:

```bash
# MongoDB
MONGODB_URI=your_mongodb_uri

# Admin
JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD_HASH=your_admin_password_hash

# Frontend URL (local)
FRONTEND_URL=http://localhost:8080

# Stripe TEST keys (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_51xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxx  # We'll get this in Step 4

# Email (optional for testing)
RESEND_API_KEY=your_resend_key
```

### Step 4: Forward Webhooks to Localhost

Open a **new terminal** and run:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

You'll see output like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

**Copy this webhook secret** and add it to your `.env` file as `STRIPE_WEBHOOK_SECRET`

**Keep this terminal running!** It's forwarding webhooks to your local server.

### Step 5: Start Your Local Servers

**Terminal 1 - Stripe CLI (keep running):**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Terminal 2 - Backend:**
```bash
cd booking-backend
npm start
```

**Terminal 3 - Frontend:**
```bash
python -m http.server 8080
```

## 🧪 Test a Payment

### Step 1: Make a Booking

1. Go to http://localhost:8080
2. Click a "Book Now" button
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 07123456789
4. Submit

### Step 2: Pay with Test Card

You'll be redirected to Stripe checkout. Use these test cards:

**Successful payment:**
```
Card: 4242 4242 4242 4242
Expiry: any future date (e.g., 12/25)
CVC: any 3 digits (e.g., 123)
ZIP: any 5 digits (e.g., 12345)
```

**Payment requires authentication (3D Secure):**
```
Card: 4000 0025 0000 3155
```

**Card declined:**
```
Card: 4000 0000 0000 9995
```

### Step 3: Watch the Magic Happen!

**In your Stripe CLI terminal**, you'll see:
```
2024-01-01 12:34:56   --> checkout.session.completed [evt_xxx]
2024-01-01 12:34:56  <--  [200] POST http://localhost:3000/api/webhooks/stripe
```

**In your backend terminal**, you'll see:
```
✅ Booking abc123 marked as paid
```

**In your browser:**
- You'll be redirected to booking-success.html
- See your booking details
- Payment status: PAID

## 📊 Verify Everything Worked

### Check the Database

Your booking should be updated with:
- `paymentStatus: 'paid'`
- `status: 'paid'`
- `stripePaymentId: 'pi_xxxxx'`
- `paidAt: [timestamp]`

### Check Admin Panel

1. Go to http://localhost:3000/admin
2. Login
3. Click "📋 Bookings"
4. You should see the booking with:
   - Status: paid ✅
   - Payment: paid ✅

## 🔍 Troubleshooting Local Testing

### Webhook Not Received

**Problem:** Payment succeeds but booking stays "pending"

**Check:**
1. Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
2. Backend server is running on port 3000
3. Webhook secret in `.env` matches Stripe CLI output
4. Check Stripe CLI terminal for errors

**Fix:**
```bash
# Restart Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy new webhook secret to .env
# Restart backend server
```

### Redirect URL Not Working

**Problem:** After payment, redirect fails

**Check:**
1. `FRONTEND_URL` in `.env` is `http://localhost:8080`
2. Frontend server is running on port 8080
3. No typos in success URL

### Test Card Not Working

**Make sure:**
- Using Stripe TEST mode (keys start with `sk_test_`)
- Using valid test card: `4242 4242 4242 4242`
- Expiry is in the future
- Any CVC and ZIP code

## 📝 Quick Command Reference

### Start Everything (3 terminals):

**Terminal 1:**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Terminal 2:**
```bash
cd booking-backend
npm start
```

**Terminal 3:**
```bash
python -m http.server 8080
```

### Stop Everything:

- Press `Ctrl+C` in each terminal

### View Stripe Events:

```bash
# In Stripe CLI terminal, you'll see live events
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Or view in browser:
# https://dashboard.stripe.com/test/events
```

### Trigger Test Webhook Manually:

```bash
stripe trigger checkout.session.completed
```

## 🎯 Complete Local Testing Checklist

- [ ] Stripe CLI installed and logged in
- [ ] `.env` file has `STRIPE_SECRET_KEY` (test key)
- [ ] `.env` file has `FRONTEND_URL=http://localhost:8080`
- [ ] Stripe CLI running and forwarding webhooks
- [ ] Webhook secret from CLI added to `.env`
- [ ] Backend server running on port 3000
- [ ] Frontend server running on port 8080
- [ ] Made test booking with card 4242 4242 4242 4242
- [ ] Redirected to success page
- [ ] Webhook received (check Stripe CLI terminal)
- [ ] Booking marked as paid (check admin panel)

## 🚀 Ready for Production

Once local testing works, switching to production is easy:

1. **Get production API keys** from Stripe dashboard (live mode)
2. **Add webhook endpoint** in Stripe dashboard (not CLI)
3. **Update production environment variables** on Render
4. **Test with real card** (or use test mode first)

That's it! Your local testing environment is production-identical.
