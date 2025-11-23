# Quick MongoDB Atlas Setup (2 minutes)

## Step 1: Create Account (30 seconds)
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/email
3. Skip the survey questions (click "Finish")

## Step 2: Create FREE Cluster (1 minute)
1. Click "**Build a Database**"
2. Select "**M0 FREE**" tier
3. Provider: **AWS**
4. Region: Choose **Europe (Ireland)** or **London**
5. Cluster Name: `lorraine-bookings` (or leave default)
6. Click "**Create**" (bottom right)
7. Wait 1-3 minutes for cluster to deploy...

## Step 3: Create Database User (30 seconds)
1. You'll see a security quickstart screen
2. Authentication Method: **Username and Password**
3. Username: `lorraine-admin`
4. Password: Click "**Autogenerate Secure Password**"
   - **COPY THIS PASSWORD!** Save it somewhere
5. Click "**Create User**"

## Step 4: Set Network Access (20 seconds)
1. IP Access List: Click "**Add My Current IP Address**"
   - Or select "**Allow Access from Anywhere**" for easier testing
2. Click "**Finish and Close**"

## Step 5: Get Connection String (20 seconds)
1. Click "**Go to Database**"
2. Click "**Connect**" button on your cluster
3. Click "**Drivers**"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://lorraine-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>` with your actual password from Step 3**
6. Add `/lorraine-bookings` before the `?` like this:
   ```
   mongodb+srv://lorraine-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lorraine-bookings?retryWrites=true&w=majority
   ```

## Step 6: Update .env File
Paste your connection string into the `.env` file:

```env
MONGODB_URI=mongodb+srv://lorraine-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lorraine-bookings?retryWrites=true&w=majority
```

Done! MongoDB is ready.

---

## Alternative: Skip MongoDB for Now

If you want to test the admin panel interface without database:
- I can create a demo mode with mock data
- Just let me know!
