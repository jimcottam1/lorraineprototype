# Lorraine Reiki Booking System - Functionality Overview

## Customer Booking Experience

### Online Booking Form
- **7 Service Programs Available:**
  - 4-week programs (£256): Path to Wellness, Weight Loss & Wellbeing, Pathway Through Menopause
  - Single sessions (£64-£70): Experience Reiki, Solo Follow-Up Session
  - FREE consultations: Reiki Level One & Two Course Consultations
- Real-time price display from database
- Integrated Stripe payment checkout
- Mobile-responsive design

### Payment Processing
- Secure Stripe integration for paid programs
- Automatic payment confirmation via email
- FREE booking flow for consultations (no payment required)
- Webhook-based payment status updates

### Email Notifications
Customers receive automated emails at key stages:
- **Booking confirmation** - Initial booking receipt
- **Payment receipt** - After successful payment
- **Session confirmation** - With confirmed date/time details
- **Questionnaire invitation** - Health questionnaire link

---

## Admin Panel (`/admin`)

### Booking Management
- **View & Filter Bookings:**
  - Filter by status, payment status, program, date range
  - Sortable columns with pagination
  - Search functionality

- **Detailed Booking View:**
  - Customer information (name, email, phone)
  - Program and price details
  - Payment status tracking
  - Admin notes capability

- **Session Confirmation:**
  - Confirm session date/time via calendar picker
  - Automatically triggers confirmation email to customer

- **Status Tracking:**
  - Pending → Paid → Confirmed → Completed/Cancelled
  - Visual status badges

- **Dashboard Analytics:**
  - Total bookings count
  - Pending/confirmed/completed breakdown
  - Total revenue tracking
  - Conversion rate metrics

### Program Management
- **Full CRUD Operations:**
  - Create new programs
  - Edit existing programs (name, description, price, features)
  - Delete programs
  - Active/inactive toggle to show/hide programs

- **Dynamic Pricing:**
  - Change prices in admin console
  - Updates apply immediately to new bookings
  - **No code changes required**

- **Program Features:**
  - Featured program designation
  - Custom badges (e.g., "Popular", "Try Reiki")
  - Display order customization
  - Program type categorization (4-week, single-session, course)

### Content Management
- **Testimonials:**
  - Add/edit/delete client testimonials
  - Reorder display sequence
  - Active/inactive toggle

- **Site Settings:**
  - Practitioner information
  - Contact details
  - Social media links

### Secure Authentication
- Password-protected admin access (bcrypt hashed)
- JWT token-based sessions (7-day validity)
- Protected API endpoints

---

## Technical Architecture

### Backend API
- **Technology Stack:**
  - Node.js + Express REST API
  - MongoDB database (cloud-hosted on Atlas)
  - Stripe SDK for payment processing
  - Resend for email delivery
  - JWT authentication with bcrypt

- **Key Features:**
  - RESTful API design
  - Webhook integration for real-time payment updates
  - Automated email sending with rate limiting
  - Environment-based configuration
  - Error handling and logging

### Database-Driven Configuration
- **Programs linked to payments dynamically:**
  - Backend queries Program collection for pricing
  - Frontend fetches programs from API with caching
  - No hardcoded prices or program names

- **Price Parsing:**
  - Handles multiple formats: "£256", "256", "FREE"
  - Converts to numeric values for Stripe
  - Supports free consultations (price = 0)

### Deployment Architecture
- **Hosting:** Render.com (auto-deploy from GitHub)
- **Database:** MongoDB Atlas (cloud-hosted, free tier)
- **Email Domain:** morningstarriver.biz (verified with Resend)
- **Version Control:** GitHub repository
- **CI/CD:** Automatic deployment on git push to main branch

---

## Complete Workflow

### Customer Journey
1. Customer visits booking page
2. Selects program (prices loaded from database)
3. Fills in contact information
4. For paid programs: Redirected to Stripe checkout
5. Completes payment
6. Receives booking confirmation email
7. Receives payment receipt email
8. Admin confirms session date/time
9. Receives session confirmation email with details
10. Receives questionnaire invitation email

### Admin Workflow
1. Receives booking notification email
2. Logs into admin panel
3. Views booking details
4. Verifies payment status (automatically updated via webhook)
5. Confirms session date/time using calendar picker
6. System automatically sends confirmation email to customer
7. Adds any admin notes
8. Tracks booking to completion
9. Views analytics and revenue metrics

---

## Key Technical Features

### Automatic Email Flow
1. **New Booking** → Admin receives notification
2. **Payment Completed** → Customer and admin receive confirmations
3. **Session Confirmed** → Customer receives date/time details
4. **Post-Payment** → Customer receives questionnaire invitation

### Payment Integration
- **Dynamic Checkout Sessions:**
  - Stripe sessions created on-the-fly using database prices
  - Product data includes program name from database
  - Metadata includes booking ID for tracking

- **Webhook Processing:**
  - `checkout.session.completed` → Updates booking to "paid"
  - `payment_intent.succeeded` → Confirms payment
  - `charge.refunded` → Marks booking as refunded/cancelled

### Email System
- **Professional HTML Templates:**
  - Branded email design
  - Variable substitution (customer name, program, dates, etc.)
  - Responsive for mobile viewing

- **Rate Limiting:**
  - Respects Resend free tier limits (2 emails/second)
  - Delays between multiple emails to same event

- **Email Types:**
  - Booking notifications (to admin)
  - Payment confirmations (to customer and admin)
  - Session confirmations (to customer)
  - Questionnaire invitations (to customer)

---

## Admin Panel Features Summary

### Dashboard
- Total bookings, revenue, and conversion metrics
- Quick access to pending bookings
- Status breakdown visualization

### Bookings Tab
- Comprehensive booking list with filters
- Click to view detailed booking information
- Inline status updates
- Session confirmation interface
- Admin notes field

### Programs Tab
- View all service programs
- Add new programs
- Edit existing programs
- Delete programs
- Toggle active/inactive status
- Manage pricing without code changes

### Testimonials Tab
- Manage client testimonials
- Add/edit/delete testimonials
- Reorder display sequence
- Toggle active/inactive status

---

## Benefits of Database-Driven Architecture

✅ **No Code Changes Required:**
- Update prices in admin panel
- Add/remove programs
- Modify program descriptions
- Changes apply immediately to production

✅ **Real-Time Updates:**
- Prices fetched from database on every booking
- Frontend caches programs for fast display
- Admin changes visible immediately

✅ **Flexible & Scalable:**
- Easy to add seasonal pricing
- Simple to create promotional programs
- Can add new program types without development

✅ **Maintainable:**
- Single source of truth (database)
- No hardcoded values to update in multiple places
- Reduced risk of pricing errors

---

## System Capabilities Summary

**Customer-Facing:**
- Professional online booking form
- Secure payment processing
- Automated email confirmations
- Mobile-responsive design

**Admin-Facing:**
- Comprehensive booking management
- Dynamic program/pricing management
- Content management (testimonials, settings)
- Analytics and reporting

**Technical:**
- RESTful API architecture
- Database-driven configuration
- Automated email workflows
- Webhook-based payment updates
- Cloud-hosted and scalable
- Version controlled with CI/CD

---

**Built with:** Node.js, Express, MongoDB, Stripe, Resend
**Hosted on:** Render.com (backend), MongoDB Atlas (database)
**Repository:** GitHub with automatic deployment
