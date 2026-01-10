# 🚀 Quick Start - Backend Connection

## ⚡ 3 Steps to Connect

### 1️⃣ Find Your Backend URL

Your backend URL is **NOT** the PostgreSQL database URL!

- **Local:** `http://localhost:5000/api` (change 5000 to your port)
- **Render:** `https://your-app-name.onrender.com/api`
- **Railway:** `https://your-app-name.railway.app/api`

### 2️⃣ Update .env.local

```bash
# Open this file
.env.local

# Replace this line with your backend URL
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

### 3️⃣ Restart Server

```bash
# Stop the dev server (Ctrl+C)
npm run dev
```

---

## ✅ Test It Works

1. Go to: `http://localhost:3000/admin`
2. Should see:
   - 🔄 Loading spinner
   - 📋 List of doctors OR
   - ❌ Error message (fix backend URL)

---

## 🔧 If It Doesn't Work

### Check These:

1. **Backend running?** 
   ```bash
   # Start your backend server
   cd backend
   npm start
   ```

2. **URL correct?**
   - Check `.env.local` file
   - Should end with `/api`
   - No trailing slash after `/api`

3. **CORS enabled?**
   - Backend needs CORS for frontend domain
   - Add to backend:
   ```javascript
   app.use(cors({
     origin: 'http://localhost:3000'
   }));
   ```

4. **Check console**
   - Open browser DevTools (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests

---

## 📍 Where To Get Backend URL?

### If using **Render**:
1. Go to Render dashboard
2. Click on your backend service
3. Copy the URL at the top (e.g., `https://yourapp.onrender.com`)
4. Add `/api` at the end: `https://yourapp.onrender.com/api`

### If using **Railway**:
1. Go to Railway dashboard
2. Click on your backend project
3. Go to Settings → Networking
4. Copy the public URL
5. Add `/api` at the end

### If **Local Development**:
```
http://localhost:5000/api
```
(Replace 5000 with your backend port number)

---

## 🎯 Backend Must Have These Routes:

```
✅ GET  /api/admin/doctors/pending
✅ PUT  /api/admin/doctors/:doctorId/approve
✅ PUT  /api/admin/doctors/:doctorId/reject
```

Match these in your backend `adminRoutes.js` or similar.

---

## 📦 What Was Installed?

✅ API client functions (`lib/api.ts`)
✅ TypeScript types (`lib/types.ts`)
✅ Error handling (`lib/api-error.ts`)
✅ Updated admin page with real data
✅ Toast notifications for feedback
✅ Loading states

---

## 💾 Files You Need to Edit:

**Only ONE file:**
```
.env.local
```

**Change this line:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**To your backend URL:**
```env
NEXT_PUBLIC_API_URL=https://your-backend.com/api
```

---

## 🔑 Important Notes:

⚠️ **PostgreSQL URL ≠ Backend API URL**
- PostgreSQL URL: Used by backend to connect to database
- Backend API URL: Used by frontend to connect to backend server

⚠️ **Restart Required**
- Always restart dev server after changing `.env.local`

⚠️ **Don't Commit**
- `.env.local` is git-ignored (keeps credentials safe)

---

## 🆘 Still Need Help?

1. Read: `BACKEND_INTEGRATION.md` (detailed guide)
2. Read: `README_INTEGRATION.md` (complete summary)
3. Check browser console for errors
4. Check backend logs for incoming requests

---

## ✨ Done!

Once you update `.env.local` and restart, your admin page will:
- Load doctors from backend ✅
- Let you approve/reject them ✅
- Show success/error messages ✅

**Happy coding!** 🎉
