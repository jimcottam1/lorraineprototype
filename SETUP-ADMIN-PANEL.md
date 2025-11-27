# Admin Panel Setup Guide

This guide will help you set up the content management system for the Reiki website.

## 🎯 What You've Got

Your website now has a full admin panel where Lorraine can:
- ✅ Edit all programs, pricing, and descriptions
- ✅ Add/remove/edit testimonials
- ✅ Update contact information and social media links
- ✅ Change site-wide settings (title, tagline, etc.)
- ✅ Manage bookings and appointment slots

## 📁 What Was Added

### Backend (booking-backend/):
```
models/
├── Program.js          # Program data model
├── Testimonial.js      # Testimonial data model
└── SiteSettings.js     # Site settings data model

routes/
└── content.js          # Content management API routes

seedContent.js          # Script to populate initial content
```

### Frontend:
```
js/main.js              # Updated to load content from API

public/admin/
├── index.html          # Extended with new tabs
└── admin.js            # Content management functions
```

### Documentation:
```
ADMIN-PANEL-GUIDE.md    # User guide for Lorraine
SETUP-ADMIN-PANEL.md    # This file - technical setup
```

## 🚀 Setup Steps

### 1. Install Dependencies (if needed)

All dependencies are already in package.json. If you haven't run npm install yet:

```bash
cd booking-backend
npm install
```

### 2. Seed Initial Content

This populates the database with all existing content from your website:

```bash
cd booking-backend
npm run seed
```

You should see:
```
✅ Seeded 7 programs
✅ Seeded 2 testimonials
✅ Seeded site settings
🎉 Content seeding completed successfully!
```

### 3. Start the Backend Server

```bash
npm start
```

The server will run on http://localhost:3000

### 4. Access the Admin Panel

Open your browser to:
- `http://localhost:3000/admin`

Login with your admin password (set in `.env` as `ADMIN_PASSWORD_HASH`)

### 5. Test the Frontend

Open `index.html` in your browser. The content should now load from the database!

## 🔧 How It Works

### Content Flow:

```
Admin Panel (Lorraine)
    ↓
Edits content in web forms
    ↓
Saves to MongoDB via API
    ↓
Frontend fetches on page load
    ↓
Website updates automatically
```

### API Endpoints:

**Public (no authentication):**
- `GET /api/content/programs` - Get all programs
- `GET /api/content/programs?active=true` - Get only active programs
- `GET /api/content/testimonials` - Get all testimonials
- `GET /api/content/settings` - Get site settings

**Admin only (requires JWT token):**
- `POST /api/content/programs` - Create new program
- `PUT /api/content/programs/:id` - Update program
- `DELETE /api/content/programs/:id` - Delete program
- (Same for testimonials and settings)

## 🎨 What Lorraine Can Edit

### Programs:
- Name, description, price
- Duration, features
- Badge, featured status
- Active/inactive toggle
- Display order

### Testimonials:
- Client quote
- Author name, program, year
- Active/inactive toggle
- Display order

### Site Settings:
- Site title, tagline
- Contact info (phone, location)
- Practitioner name
- About section text
- Social media links

## 🔒 Security

- Admin panel requires password authentication
- JWT tokens expire after 7 days
- Admin password is bcrypt hashed
- All write operations require authentication
- Public can only READ content, not modify

## 🌐 Deployment

### Backend (Render/Heroku):
1. Push code to GitHub
2. Deploy booking-backend folder
3. Set environment variables
4. Run seed script once: `npm run seed`

### Frontend (Netlify/Vercel):
1. Deploy frontend files (index.html, css/, js/)
2. Update API_URL in js/main.js to your production backend URL

## 📱 Mobile Friendly

The admin panel is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

Lorraine can edit content from anywhere!

## 🔄 Future Updates

### Already Working:
- ✅ Full CRUD for programs, testimonials, settings
- ✅ Authentication and security
- ✅ Mobile responsive design
- ✅ Real-time content updates

### Optional Enhancements:
- 📸 Image upload functionality (currently images must be manually uploaded to /images/)
- 📊 Analytics dashboard
- 📧 Email template editor
- 🎨 Basic theme customization (colors, fonts)
- 📅 Calendar view for bookings

## 🆘 Troubleshooting

**Seed script fails:**
- Check MongoDB connection string in .env
- Ensure MongoDB is running
- Verify all model files exist

**Admin panel won't load:**
- Check backend server is running
- Verify ADMIN_PASSWORD_HASH is set in .env
- Check browser console for errors

**Content not updating on frontend:**
- Clear browser cache (Ctrl+F5)
- Check API_URL is correct in main.js
- Verify backend server is running
- Check browser console for fetch errors

**"Cannot read property of undefined" errors:**
- Run seed script to populate initial data
- Check database has content
- Verify API endpoints are accessible

## 📚 Additional Resources

- **User Guide**: `ADMIN-PANEL-GUIDE.md` (give this to Lorraine)
- **API Documentation**: See routes/content.js for all endpoints
- **Database Models**: See models/ folder for data structure

## ✅ Testing Checklist

Before handing off to Lorraine, test:

- [ ] Seed script runs successfully
- [ ] Can login to admin panel
- [ ] Can create a new program
- [ ] Can edit an existing program
- [ ] Can delete a program
- [ ] Can add a testimonial
- [ ] Can edit site settings
- [ ] Changes appear on frontend after refresh
- [ ] Mobile view works
- [ ] Booking system still works
- [ ] All links work correctly

## 🎉 You're Done!

The admin panel is ready to use. Give Lorraine the **ADMIN-PANEL-GUIDE.md** and her login credentials.

She can now manage all website content without touching any code!
