# How to Add Your Photos and Images

Your website is now set up to display your photos and chakra graphics from the flyers. Here's how to add them!

---

## 📸 Images You Need

From your flyers, you need these images:

1. **Your portrait photo** (the professional headshot)
2. **Chakra body image** (the colorful chakra centers graphic)
3. **Photo of you practicing Reiki** (optional - for more visual appeal)

---

## 🎯 Quick Method (Easiest)

### Option 1: Save from PDF on Windows

1. **Open your PDF flyer** (any of the three)
2. **Right-click on your photo**
3. Select **"Copy Image"** or **"Save Image As..."**
4. Save to: `C:\Users\jim_c\lorraine\reiki-wellness-platform\images\`

**Save with these exact names:**
- Your portrait → `lorraine-portrait.jpg`
- Chakra image → `chakra-body.png`
- Reiki practice photo → `reiki-session.jpg` (optional)

---

## 💻 Detailed Method

### Step 1: Extract Images from PDF

**Method A: Using Adobe Acrobat Reader (Free)**

1. Open your PDF flyer
2. Click **Tools** → **Export PDF**
3. Choose **Image** → **JPEG** or **PNG**
4. Click **Export**
5. All images will be saved to a folder

**Method B: Using Windows Screenshot Tool**

1. Open your PDF flyer
2. Press **Windows + Shift + S** (Snipping Tool)
3. Select the area around your photo
4. The screenshot is copied to clipboard
5. Open **Paint** (search in Windows)
6. Press **Ctrl + V** to paste
7. **File** → **Save As** → Choose JPEG or PNG
8. Save to the `images` folder

**Method C: Using an Online Tool (If above don't work)**

1. Go to https://pdfaid.com/extract-images-from-pdf
2. Upload your PDF flyer
3. Download the extracted images
4. Save them to the images folder

---

## 📂 Where to Save Images

Save ALL images to this folder:
```
C:\Users\jim_c\lorraine\reiki-wellness-platform\images\
```

### Required Image Names:

| What You're Saving | Save As This Name |
|-------------------|-------------------|
| Your portrait/headshot | `lorraine-portrait.jpg` |
| Chakra body graphic | `chakra-body.png` |
| Reiki session photo (optional) | `reiki-session.jpg` |
| Your logo (if you have one) | `logo.png` |

⚠️ **Important**: The file names MUST match exactly (including lowercase)

---

## ✅ Step-by-Step Guide

### Image 1: Your Portrait Photo

**From your flyers, this is the professional headshot of you smiling**

1. Open any of your three PDF flyers
2. Locate your portrait photo (top right area)
3. Extract using one of the methods above
4. Save as: `lorraine-portrait.jpg`
5. Location: `C:\Users\jim_c\lorraine\reiki-wellness-platform\images\lorraine-portrait.jpg`

**Result**: Your photo will appear in the "Meet Lorraine Turner" section!

---

### Image 2: Chakra Body Graphic

**This is the beautiful illustration with the person sitting in meditation with colorful chakra points**

1. Open any of your three PDF flyers (all have this image)
2. It's the graphic at the bottom right showing chakras
3. Extract this image
4. Save as: `chakra-body.png`
5. Location: `C:\Users\jim_c\lorraine\reiki-wellness-platform\images\chakra-body.png`

**Result**: This will appear on all three program cards!

---

### Image 3: Reiki Session Photo (Optional)

**This is the photo showing you practicing Reiki on a client**

1. Open any of your PDF flyers
2. Find the photo of you with a client
3. Extract this image
4. Save as: `reiki-session.jpg`
5. You can add this to the hero section or about section later

---

## 🔍 How to Know if It Worked

### Test Your Images:

1. **Save your images** to the `images` folder
2. **Open `index.html`** in your browser
3. **Refresh the page** (F5 or Ctrl+R)
4. **Look for**:
   - Your portrait in the "Meet Lorraine Turner" section
   - Chakra images in each of the three program cards
   - The yellow instruction notes should disappear!

### If images don't appear:

**Check these things:**

✅ File names match EXACTLY:
   - `lorraine-portrait.jpg` (not `Lorraine-Portrait.jpg` or `portrait.jpg`)
   - `chakra-body.png` (not `chakra.png` or `Chakra-Body.png`)

✅ Files are in the right folder:
   - `C:\Users\jim_c\lorraine\reiki-wellness-platform\images\`
   - NOT in Downloads or Documents

✅ Image file format:
   - Photos should be `.jpg` or `.jpeg`
   - Graphics can be `.png` or `.jpg`

✅ Try refreshing your browser:
   - Press **Ctrl + Shift + R** (hard refresh)
   - Or **Ctrl + F5**

---

## 🎨 Alternative: Use Free Chakra Images

If you can't extract the chakra image from your PDF, you can use a free alternative:

### Option 1: Unsplash (Free, High Quality)

1. Go to https://unsplash.com
2. Search "chakra meditation body"
3. Download a free image
4. Save as `chakra-body.png` in the images folder

### Option 2: Pixabay (Free)

1. Go to https://pixabay.com
2. Search "chakras body energy"
3. Download a free image
4. Save as `chakra-body.png`

---

## 📐 Image Size Recommendations

For best results, resize your images before uploading:

| Image Type | Recommended Size | Max File Size |
|-----------|------------------|---------------|
| Portrait photo | 400x400 pixels | 200KB |
| Chakra graphic | 600x800 pixels | 300KB |
| Reiki session | 1200x800 pixels | 500KB |
| Hero background | 1920x1080 pixels | 800KB |

### How to Resize Images (Free Tools):

**Windows:**
1. Open image in **Paint**
2. Click **Resize**
3. Enter new dimensions
4. Save

**Online:**
1. Go to https://www.resizepixel.com/
2. Upload your image
3. Enter new size
4. Download

**Why resize?**
- Faster website loading
- Better user experience
- Mobile-friendly

---

## 🌟 Advanced: Add More Images

### Add Your Logo

If you have a logo for Happiness in Harmony:

1. Save as `logo.png` in the `images` folder
2. Open `index.html` in a text editor
3. Find line 22 (in the navigation area)
4. Replace the text heading with:
   ```html
   <img src="images/logo.png" alt="Happiness in Harmony" style="height: 60px;">
   ```

### Change Hero Background

Want to use your own photo for the main banner?

1. Save your photo as `hero-background.jpg`
2. Open `css/styles.css`
3. Find line 245 (hero section)
4. Replace the image URL:
   ```css
   background: linear-gradient(135deg, rgba(212, 160, 86, 0.8), rgba(143, 178, 165, 0.8)),
               url('../images/hero-background.jpg') center/cover;
   ```

### Add Photos to Program Cards

Want to add specific photos for each program?

1. Save three photos:
   - `wellness-program.jpg`
   - `weightloss-program.jpg`
   - `menopause-program.jpg`

2. Open `index.html`
3. Add above each program description:
   ```html
   <img src="images/wellness-program.jpg" alt="Wellness Program" style="width: 100%; border-radius: 12px; margin-bottom: 1rem;">
   ```

---

## 📱 Mobile-Friendly Images

All images will automatically resize for mobile devices. No extra work needed!

The website uses responsive design, so:
- ✅ Images scale to fit screen size
- ✅ Load quickly on phones
- ✅ Look professional on all devices

---

## 🎯 Quick Checklist

Before you open the website, make sure:

- [ ] `lorraine-portrait.jpg` is in the `images` folder
- [ ] `chakra-body.png` is in the `images` folder
- [ ] File names are spelled correctly (lowercase!)
- [ ] Images are reasonable file sizes (under 500KB each)
- [ ] You've refreshed your browser

---

## 💡 Pro Tips

### Tip 1: Keep Originals
Always keep a copy of your original high-resolution images in a separate folder. You might need them later!

### Tip 2: Optimize Images
Use https://tinypng.com to compress images without losing quality. Smaller files = faster website!

### Tip 3: Consistent Style
Try to use photos with similar:
- Lighting
- Background colors
- Professional quality

### Tip 4: Alt Text
The website already has proper alt text for accessibility. This helps visually impaired users and SEO!

---

## 🆘 Troubleshooting

### "I can't extract images from the PDF"

**Solution 1**: Take screenshots using Windows Snipping Tool
- Press **Windows + Shift + S**
- Select the image area
- Paste in Paint
- Save

**Solution 2**: Use your phone
- Open the PDF on your computer
- Take a photo with your phone
- Send to computer via email or cloud storage
- Save to images folder

### "Images appear blurry"

**Solution**: Use higher resolution images
- Portrait: At least 400x400 pixels
- Chakra: At least 600x800 pixels

### "Yellow instruction boxes won't go away"

**Solution**: Check file names exactly match
- Must be lowercase
- Must have correct extension (.jpg or .png)
- In the right folder

### "Website looks different"

**Solution**: Clear your browser cache
- Press **Ctrl + Shift + Delete**
- Select "Cached images and files"
- Click "Clear data"
- Refresh the page

---

## 📞 Need the Images Extracted?

If you're having trouble extracting the images from your PDFs, you can:

1. **Ask a friend** who's tech-savvy
2. **Use a phone** to take photos of your screen
3. **Hire someone on Fiverr** ($5-10 to extract images from PDFs)
4. **Use the website without images** initially (it still works!)

---

## ✨ What Happens When Images Are Added

### Before (with instruction notes):
- Yellow boxes with "Add image as..."
- Generic gradient placeholders
- Still functional, just less visual

### After (with your images):
- Your professional portrait in About section
- Beautiful chakra graphics on each program
- Instruction notes automatically disappear
- Complete, polished appearance!

---

## 🚀 Final Step

Once images are added:

1. Open `index.html` in browser
2. Check everything looks good
3. Test on your phone
4. Share with friends for feedback
5. Deploy to Netlify (see QUICK-START.md)

---

**Your website is ready for images! Take your time and add them when you can. The site works beautifully either way!** ✨

---

*Remember: The yellow instruction notes will automatically disappear when you add the images with the correct filenames!*
