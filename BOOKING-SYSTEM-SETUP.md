# 🎯 Custom Booking System - Setup Guide

**Your new custom booking system is ready!**

## 🎉 What You've Got

A completely custom booking system with:
- ✅ Admin dashboard to manage all bookings in one place
- ✅ Automatic Stripe payment integration
- ✅ MongoDB database for storing bookings
- ✅ No monthly subscription fees
- ✅ Easy for Lorraine to use
- ✅ Calendar view and booking management
- ✅ Client can't double-book

## 💰 Cost Breakdown

| Service | Cost | What It Does |
|---------|------|--------------|
| **MongoDB Atlas** | FREE (512MB) | Stores all bookings |
| **Stripe** | 2.9% + 20p per transaction | Payment processing |
| **Hosting (Railway/Render)** | FREE tier available | Runs the backend server |
| **Total Monthly** | **£0** | Only Stripe fees per booking |

**Example**: £64 Experience Reiki booking
- Gross: £64.00
- Stripe fee: £2.06
- You receive: £61.94

---

## 📋 Setup Steps

### Part 1: MongoDB Database (5 minutes)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free (no credit card needed)
   - Choose "Free Shared" tier

2. **Create a Cluster**
   - Click "Build a Database"
   - Select **M0 (FREE)** tier
   - Choose region: **Europe (Ireland)** or closest to UK
   - Cluster name: `lorraine-bookings`
   - Click "Create"

3. **Create Database User**
   - Click "Database Access" in left menu
   - Click "Add New Database User"
   - Username: `lorraine-admin`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: **Read and write to any database**
   - Click "Add User"

4. **Allow Network Access**
   - Click "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" in left menu
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://lorraine-admin:<password>@lorraine-bookings.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your database user password
   - **Save this - you'll need it!**

---

### Part 2: Stripe Configuration (10 minutes)

1. **Use Your Existing Stripe Account**
   - You already have Stripe set up
   - Go to https://dashboard.stripe.com

2. **Get API Keys**
   - Click "Developers" → "API keys"
   - You'll see:
     - **Publishable key**: `pk_test_...` (for testing)
     - **Secret key**: Click "Reveal test key" → `sk_test_...`
   - **Copy the Secret key** (starts with `sk_test_`)
   - **Save it securely!**

3. **Set Up Webhook (Important!)**
   - Click "Developers" → "Webhooks"
   - Click "Add endpoint"
   - Endpoint URL: `https://your-deployed-url.com/api/webhooks/stripe`
     (you'll get this URL after deployment in Part 4)
   - Click "Select events"
   - Select these events:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
   - Click "Add events"
   - Click "Add endpoint"
   - **Copy the Signing secret** (starts with `whsec_`)
   - **Save it!**

---

### Part 3: Generate Admin Password (2 minutes)

1. **Install Dependencies**
   ```bash
   cd booking-backend
   npm install
   ```

2. **Generate Password Hash**
   ```bash
   node utils/generatePasswordHash.js YOUR_SECURE_PASSWORD
   ```
   Replace `YOUR_SECURE_PASSWORD` with a strong password you'll use to login

3. **Copy the Hash**
   - The script will output something like:
     ```
     ADMIN_PASSWORD_HASH=$2b$10$abcdef...xyz123
     ```
   - **Copy this entire hash** - you'll need it for .env file

---

### Part 4: Configure Environment Variables (5 minutes)

1. **Create .env File**
   ```bash
   cd booking-backend
   cp .env.example .env
   ```

2. **Edit .env File**
   Open `.env` in a text editor and fill in:

   ```env
   # MongoDB Connection (from Part 1, Step 5)
   MONGODB_URI=mongodb+srv://lorraine-admin:yourpassword@lorraine-bookings.xxxxx.mongodb.net/lorraine-bookings?retryWrites=true&w=majority

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Stripe Configuration (from Part 2)
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

   # Admin Password (from Part 3)
   ADMIN_PASSWORD_HASH=$2b$10$your_hashed_password_here

   # JWT Secret (generate a random string)
   JWT_SECRET=your_random_secret_key_min_32_chars_long

   # Frontend URL (update after deployment)
   FRONTEND_URL=http://localhost:8000
   ```

   **How to generate JWT_SECRET:**
   - Just type a random long string of letters/numbers
   - Or run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

3. **Save the .env file**

---

### Part 5: Test Locally (5 minutes)

1. **Start the Backend Server**
   ```bash
   cd booking-backend
   npm start
   ```

   You should see:
   ```
   ✅ MongoDB connected successfully
   🚀 Server running on port 3000
   📊 Admin panel: http://localhost:3000/admin
   ```

2. **Test Admin Login**
   - Open browser: http://localhost:3000/admin
   - Enter the password you used in Part 3
   - You should see the admin dashboard!

3. **Check API Health**
   - Open: http://localhost:3000/api/health
   - Should show: `{"status":"OK",...}`

---

### Part 6: Deploy to Railway (FREE Hosting) (15 minutes)

1. **Create Railway Account**
   - Go to https://railway.app/
   - Click "Login with GitHub"
   - Authorize Railway

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your repository

   **OR manually:**
   - Click "New Project" → "Empty Project"
   - Click "+ New" → "Database" → "MongoDB"
   - Railway will create a free MongoDB for you!

3. **Add Backend Service**
   - Click "+ New" → "GitHub Repo" or "Empty Service"
   - If empty service:
     - Install Railway CLI: `npm i -g @railway/cli`
     - Login: `railway login`
     - Link project: `railway link`
     - Deploy: `railway up`

4. **Add Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Click "RAW Editor"
   - Paste your .env contents (without the .env.example stuff)
   - Click "Update Variables"

5. **Generate Domain**
   - Click "Settings" tab
   - Under "Domains", click "Generate Domain"
   - Copy the URL (e.g., `https://your-app.up.railway.app`)

6. **Update Environment Variables**
   - Go back to "Variables"
   - Update `FRONTEND_URL` to your Railway URL
   - Update any other URLs

7. **Update Stripe Webhook**
   - Go back to Stripe Dashboard → Webhooks
   - Edit your webhook endpoint
   - Update URL to: `https://your-app.up.railway.app/api/webhooks/stripe`
   - Save

---

### Part 7: Update Your Website (10 minutes)

1. **Update booking.html**
   - Add this script before closing `</body>` tag:
   ```html
   <script src="js/booking-api.js"></script>
   ```

   - Make sure your form has these IDs:
   ```html
   <form id="bookingForm">
     <input id="fullName" name="fullName" required>
     <input id="email" type="email" name="email" required>
     <input id="phone" name="phone" required>
     <select id="program" name="program" required>...</select>
     <input type="checkbox" name="preferredDays" value="Monday">
     <input type="checkbox" name="preferredTimes" value="Morning">
     <textarea id="notes" name="notes"></textarea>
     <button type="submit">Book Now</button>
   </form>
   ```

2. **Test Booking Flow**
   - Go to your booking page
   - Fill out the form
   - Submit
   - Should redirect to Stripe payment
   - Use test card: `4242 4242 4242 4242`
   - Complete payment
   - Check admin dashboard - booking should appear!

---

## 🎯 How to Use the Admin Dashboard

### 1. **Access Admin Panel**
   - URL: `https://your-app.up.railway.app/admin`
   - Login with your password

### 2. **View Dashboard**
   - See total bookings, pending, confirmed, revenue
   - All at a glance!

### 3. **View Bookings**
   - See all bookings in table format
   - Filter by status, program, date
   - Click "View" to see full details

### 4. **Manage Booking**
   When viewing a booking:
   - Change status (Pending → Confirmed → Completed)
   - Set confirmed date/time
   - Add admin notes
   - View questionnaire responses (if completed)
   - See payment status

### 5. **Typical Workflow**
   1. Client books on website
   2. You receive booking in admin panel (status: "paid")
   3. Review their preferred days/times
   4. Click on booking → Set confirmed date/time
   5. Status changes to "confirmed"
   6. Client receives email confirmation (when email is set up)
   7. After session, mark as "completed"

---

## 📧 Email Notifications (Optional - Can Add Later)

The system has email hooks ready but disabled by default.

**To enable:**
1. Sign up for Resend (https://resend.com) - FREE tier: 3000 emails/month
2. Get API key
3. Add to .env: `RESEND_API_KEY=re_your_api_key`
4. Uncomment email code in `utils/email.js`

---

## 🔧 Maintenance

### Daily:
- Check admin dashboard for new bookings
- Confirm sessions with clients

### Weekly:
- Review completed bookings
- Check revenue stats

### Monthly:
- Nothing! System runs itself
- Maybe check for updates

---

## 🆘 Troubleshooting

### Can't login to admin panel
- Make sure you're using the password from Part 3
- Check .env file has correct ADMIN_PASSWORD_HASH
- Try regenerating password hash

### Booking not appearing in database
- Check MongoDB is connected (see server logs)
- Verify MONGODB_URI in .env is correct
- Check Railway logs for errors

### Payment not updating booking
- Check Stripe webhook is configured correctly
- Verify STRIPE_WEBHOOK_SECRET in .env
- Check webhook endpoint URL matches deployment URL

### Server not starting
- Check all environment variables are set
- Verify MongoDB connection string
- Check Railway logs for specific error

---

## 📊 Going Live Checklist

Before accepting real payments:

- [ ] MongoDB cluster created and connected
- [ ] Stripe secret key added to .env
- [ ] Stripe webhook configured and tested
- [ ] Admin password generated and working
- [ ] Backend deployed to Railway
- [ ] Frontend updated with booking-api.js
- [ ] Test booking completed successfully
- [ ] Test payment processed (use test card)
- [ ] Booking appears in admin dashboard
- [ ] Payment status updates automatically
- [ ] Switch Stripe from Test to Live mode
- [ ] Update STRIPE_SECRET_KEY with live key (sk_live_...)
- [ ] Test with real card (small amount)
- [ ] Ready to launch! 🎉

---

## 🎉 You're Done!

Your custom booking system is now:
- ✅ Cheaper (no monthly fees)
- ✅ Easier for Lorraine (one dashboard)
- ✅ More powerful (full control)
- ✅ Scalable (grows with your business)

**Admin Dashboard**: https://your-app.up.railway.app/admin

---

## 🤔 Questions?

Common questions:

**Q: What if Railway free tier expires?**
A: Switch to Render.com (also has free tier) or upgrade Railway ($5/month)

**Q: Can I customize the admin panel?**
A: Yes! Edit `/public/admin/index.html` and `/public/admin/admin.js`

**Q: Can I add more programs?**
A: Yes! Update PROGRAM_PRICES in `/booking-backend/routes/bookings.js`

**Q: Can I export bookings?**
A: Yes! Login to MongoDB Atlas → Browse Collections → Export to CSV

**Q: Is my data secure?**
A: Yes! MongoDB is encrypted, Stripe is PCI compliant, password is hashed

---

**Need help?** Contact Jim or check the documentation files.

**Enjoy your new booking system!** 🌟
