# Backend Integration Guide

## 🔗 Connecting Frontend to Backend

Your frontend is now configured to connect to your backend API. Follow the steps below to complete the setup.

### 1. **Configure Backend URL**

Update the [.env.local](.env.local) file with your actual backend API URL:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

**Important Notes:**
- The PostgreSQL URL you provided (`postgresql://charak_user:...`) is for **database connection** (used by your backend), NOT for frontend API calls
- You need the **HTTP/HTTPS URL** of your deployed backend server
- If your backend is running locally, use `http://localhost:PORT/api` (replace PORT with your backend port)
- If your backend is deployed (e.g., on Render, Heroku, Railway), use that deployment URL

**Example:**
```env
# If backend is on Render
NEXT_PUBLIC_API_URL=https://your-app.onrender.com/api

# If backend is local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 2. **Backend Routes Implementation**

Your frontend expects these backend routes to be available:

#### Admin Routes:
```javascript
GET  /api/admin/doctors/pending     // Get all pending doctors
PUT  /api/admin/doctors/:doctorId/approve  // Approve a doctor
PUT  /api/admin/doctors/:doctorId/reject   // Reject a doctor with remark
```

#### Authentication Routes (for future use):
```javascript
POST /api/auth/login    // Admin/Subadmin login
POST /api/auth/signup   // Register new user
```

### 3. **CORS Configuration**

Make sure your backend allows requests from your frontend domain. Add CORS middleware to your backend:

```javascript
// Example for Express.js
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',  // Local development
    'https://your-frontend-domain.com'  // Production domain
  ],
  credentials: true
}));
```

### 4. **Authentication Flow**

The frontend stores the JWT token in `localStorage` after successful login:

1. Admin logs in → Backend returns JWT token
2. Token is stored in `localStorage` as `authToken`
3. All subsequent API calls include the token in `Authorization` header:
   ```
   Authorization: Bearer <token>
   ```

### 5. **API Response Format**

Your backend should return responses in this format:

**Success Response:**
```json
{
  "success": true,
  "data": [...],  // Or single object
  "count": 5,     // Optional: for list endpoints
  "message": "Optional success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (optional)"
}
```

### 6. **Testing the Connection**

1. **Start your backend server**
   ```bash
   # Example
   cd backend
   npm start
   ```

2. **Start your frontend**
   ```bash
   npm run dev
   ```

3. **Test the admin page**
   - Navigate to `http://localhost:3000/admin`
   - You should see a loading spinner, then either:
     - The list of pending doctors (if your backend is connected)
     - An error message (if connection fails)

### 7. **File Structure Created**

```
charaks/
├── .env.local              # Environment variables (git-ignored)
├── .env.example            # Example env file for reference
├── lib/
│   ├── api.ts             # API client functions
│   ├── types.ts           # TypeScript interfaces
│   └── utils.ts           # Utility functions
└── app/
    ├── layout.tsx         # Updated with Toaster
    └── admin/
        └── page.tsx       # Updated admin page with API integration
```

### 8. **Key Features Implemented**

✅ Environment-based API URL configuration  
✅ JWT token authentication with localStorage  
✅ Admin API functions (getPendingDoctors, approveDoctor, rejectDoctor)  
✅ TypeScript interfaces matching your backend models  
✅ Error handling with toast notifications  
✅ Loading states for all API calls  
✅ Token management (set, get, remove)  

### 9. **Admin Page Features**

The admin page now:
- Fetches pending doctors from your backend on load
- Displays loading spinner while fetching
- Shows error messages if API calls fail
- Allows approving doctors with one click
- Allows rejecting doctors with a reason
- Updates the UI optimistically after actions
- Shows success/error toast notifications

### 10. **Security Notes**

⚠️ **Important:**
- Never commit `.env.local` to git (it's already in .gitignore)
- The `NEXT_PUBLIC_` prefix makes the variable available in the browser
- Only put non-sensitive configuration in `NEXT_PUBLIC_` variables
- Backend should validate the JWT token for all protected routes
- Use HTTPS in production

### 11. **Troubleshooting**

**Problem: "Failed to fetch pending doctors"**
- ✅ Check if backend is running
- ✅ Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- ✅ Check browser console for CORS errors
- ✅ Verify backend route matches `/api/admin/doctors/pending`

**Problem: "Unauthorized" or "Token expired"**
- ✅ Log in again to get a fresh token
- ✅ Check if token is being sent in Authorization header
- ✅ Verify backend JWT verification middleware

**Problem: "Network request failed"**
- ✅ Backend server must be running
- ✅ Check firewall/network settings
- ✅ Verify URL doesn't have trailing slashes

### 12. **Next Steps**

1. Update `.env.local` with your actual backend URL
2. Ensure your backend is running and accessible
3. Test the admin page functionality
4. Implement login page with real authentication
5. Add more API endpoints as needed

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Check network tab to see API requests/responses
3. Verify backend logs for incoming requests
4. Ensure CORS is properly configured on backend

## 🎉 You're Ready!

Your frontend is now ready to communicate with your backend. Just update the `.env.local` file with your backend URL and start testing!
