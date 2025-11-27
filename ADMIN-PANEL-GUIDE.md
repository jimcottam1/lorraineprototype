# Admin Panel Guide for Lorraine

Welcome to your website admin panel! This guide will help you manage all the content on your Reiki website without needing any coding knowledge.

## 🚀 Getting Started

### Accessing the Admin Panel

1. **Open your website admin panel:**
   - Production: `https://your-website-domain.com/admin`
   - Local testing: `http://localhost:3000/admin`

2. **Login with your password** (the one set in your `.env` file)

3. You'll see the dashboard with 5 main sections:
   - 📋 **Bookings** - View and manage client bookings
   - 📅 **Manage Slots** - Create available appointment times
   - 🎯 **Programs** - Edit your Reiki programs and pricing
   - 💬 **Testimonials** - Add/edit client testimonials
   - ⚙️ **Site Settings** - Update contact info, social media, etc.

---

## 📋 Managing Bookings

The Bookings tab shows all client bookings with their:
- Name, email, phone number
- Selected program
- Payment status
- Booking status (pending, paid, confirmed, completed)

**Actions you can take:**
- Click **"View"** to see full booking details
- Update booking status
- Add admin notes for your records
- Confirm session date/time
- View completed questionnaire responses

---

## 🎯 Managing Programs

This is where you control what services appear on your website.

### Adding a New Program

1. Click the **"➕ Add New Program"** button
2. Fill in the form:
   - **Program ID**: Short identifier (e.g., `wellness`, `weightloss`) - no spaces, lowercase
   - **Type**: Choose 4-Week Program, Single Session, or Course
   - **Name**: Display name (e.g., "Your Path to Wellness")
   - **Description**: What the program offers
   - **Duration**: e.g., "4-Week Program" or "60-Minute Session"
   - **Price**: e.g., "£256"
   - **Case Study Price** (optional): Discounted price if applicable
   - **Features**: List one feature per line
   - **Badge** (optional): e.g., "Popular" or "New"
   - **Featured Program**: Check this to highlight it on the homepage
   - **Active**: Uncheck to hide from website (useful for seasonal offerings)
   - **Display Order**: Lower numbers appear first (0, 1, 2, etc.)

3. Click **"Save Program"**

### Editing a Program

1. Find the program in the list
2. Click **"Edit"**
3. Make your changes
4. Click **"Save Program"**

### Common Edits:
- **Change pricing**: Update the "Price" field
- **Update description**: Change what you say about the program
- **Add/remove features**: Edit the features list
- **Hide temporarily**: Uncheck "Active" (it won't delete it, just hide it)
- **Reorder programs**: Change the "Display Order" number

---

## 💬 Managing Testimonials

Show off your great client feedback!

### Adding a Testimonial

1. Click **"➕ Add New Testimonial"**
2. Fill in:
   - **Testimonial Text**: The client's words
   - **Author Name**: Client name (first name only is fine!)
   - **Program**: Which program they took (e.g., "Path to Wellness Program")
   - **Year** (optional): e.g., "2025"
   - **Active**: Check to show on website
   - **Display Order**: Control which testimonials appear first

3. Click **"Save Testimonial"**

### Tips:
- Keep testimonials concise and powerful
- Use "Display Order" to feature your best testimonials first
- Uncheck "Active" to temporarily hide a testimonial without deleting it

---

## ⚙️ Site Settings

This section controls global website settings.

### What You Can Edit:

**Site Information:**
- **Site Title**: Main title shown everywhere
- **Tagline**: Hero section headline
- **Hero Description**: Subtext under the tagline

**Contact Information:**
- **Phone Number**: Your contact number (updates everywhere on the site)
- **Location**: Your city/area
- **Business Name**: "Happiness in Harmony"
- **Business Tagline**: Your services tagline

**Practitioner Information:**
- **Practitioner Name**: Your name (appears in "Meet..." section)

**About Section:**
- **What is Reiki?**: Explanation shown on the homepage
- **Reiki Disclaimer**: Important medical disclaimer

**Social Media:**
- **Facebook URL**: Link to your Facebook page
- **Instagram URL**: Link to your Instagram
- **Instagram Handle**: Your @handle
- **Main Website URL**: Link to happinessinharmony.co.uk

**How to Update:**
1. Make your changes in the form
2. Click **"Save Settings"** at the bottom
3. Refresh your website to see the changes

---

## 📅 Managing Appointment Slots

Create available times for clients to book.

### Single Slot:
1. Select a date and time
2. Set duration (usually 60 minutes)
3. Click **"Add Slot"**

### Bulk Slots (Create Multiple at Once):
1. **Start Date** and **End Date**: Range of dates
2. **Add Times**: Click "Add Time" for each time slot you want (e.g., 10:00, 14:00, 16:00)
3. **Exclude Days**: Check any days you don't work (e.g., Sunday, Monday)
4. Click **"Create All Slots"**

Example: To create morning slots for the next month:
- Start Date: Dec 1
- End Date: Dec 31
- Times: 10:00, 11:30
- Exclude: Saturday, Sunday

This creates all weekday morning slots automatically!

---

## 💡 Pro Tips

### Quick Wins:
1. **Update prices instantly**: Edit a program, change the price, save - it's live!
2. **Seasonal programs**: Uncheck "Active" on programs you don't offer right now
3. **Test before publishing**: Make changes, then check your website to see them
4. **Phone number magic**: Change it once in Site Settings, it updates everywhere
5. **Reorder content**: Use "Display Order" to control what shows first

### Safety Features:
- **Static content stays**: Your images, colors, and layout are unchanged
- **Nothing breaks**: If the API fails, your website shows default content
- **Easy undo**: Deleted something? Just re-add it
- **Authentication required**: Only you can access this admin panel

---

## 🆘 Troubleshooting

**"I can't log in"**
- Check that the backend server is running
- Verify your password matches the `.env` file

**"My changes aren't showing"**
- Refresh the website page (Ctrl+F5 or Cmd+Shift+R)
- Check that you marked the content as "Active"
- Verify the backend server is running

**"I accidentally deleted something"**
- Programs and testimonials can be re-added using the forms
- Site settings can be reset to defaults if needed

**"The website isn't loading content"**
- The website will show default HTML content if the backend is offline
- This is a safety feature - your site never breaks!

---

## 🎯 Common Tasks Quick Reference

| Task | Steps |
|------|-------|
| Change a price | Programs tab → Edit program → Update Price → Save |
| Add testimonial | Testimonials tab → Add New → Fill form → Save |
| Update phone number | Site Settings tab → Change Phone Number → Save Settings |
| Hide a program | Programs tab → Edit program → Uncheck Active → Save |
| Reorder programs | Programs tab → Edit → Change Display Order number → Save |
| Add appointment slots | Manage Slots tab → Fill form → Add Slot |

---

## 📞 Need Help?

If you have questions or need assistance:
1. Review this guide
2. Check the troubleshooting section
3. Contact your developer

---

## 🎨 What You CAN'T Change (and why)

These require code changes:
- Website layout and design
- Colors and fonts
- Navigation structure
- Booking form functionality
- Payment integration

**Why?** These are in the code to ensure your website works correctly and looks professional. If you want to change these, ask your developer!

---

## ✅ Best Practices

1. **Save often**: Make one change, save, then check the website
2. **Use clear descriptions**: Help clients understand your offerings
3. **Keep testimonials updated**: Fresh testimonials build trust
4. **Proofread**: Check spelling before saving
5. **Test booking links**: Make sure your programs link to bookings correctly
6. **Regular updates**: Keep prices and availability current

---

**Remember**: You have full control over your content. Experiment, make changes, and make your website yours!

If something doesn't look right, you can always edit it again. Nothing you do here will break your website. 🎉
