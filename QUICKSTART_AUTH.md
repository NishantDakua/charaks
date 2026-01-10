# Quick Start Guide - Running with Authentication

## Prerequisites
- Node.js 18+ installed
- pnpm package manager
- Backend API running at: https://charakbackendapi.onrender.com

## Step 1: Install Dependencies

```bash
pnpm install
```

## Step 2: Environment Setup

The `.env.local` file is already configured with the backend URL:

```bash
NEXT_PUBLIC_API_URL=https://charakbackendapi.onrender.com/api
```

## Step 3: Start Development Server

```bash
pnpm dev
```

The application will start at: http://localhost:3000

## Step 4: Authentication Flow

### A. Create an Account
1. Navigate to http://localhost:3000/signup
2. Fill in the form:
   - Username: `your_username`
   - Role: Select `admin` or `subadmin`
   - Password: Create a strong password
   - Confirm Password: Re-enter password
   - Accept terms and conditions
3. Click "Create Account"
4. You'll be redirected to login after 2 seconds

### B. Login
1. Navigate to http://localhost:3000/login (or you'll be redirected)
2. Enter your credentials:
   - Username: `your_username`
   - Password: `your_password`
3. Click "Sign In"
4. On success, JWT token is stored in localStorage
5. You'll be redirected to admin dashboard

### C. Access Admin Dashboard
1. After login, you'll be at http://localhost:3000/admin
2. The page will fetch pending doctors from the backend
3. You can approve or reject doctor applications

### D. Logout
1. Click the "Logout" button in the navigation
2. Token is cleared from localStorage
3. You'll be redirected to login page

## Troubleshooting

### Issue: "Authentication Required" error on admin page
**Cause**: No JWT token in localStorage  
**Solution**: Go to `/login` and login first

### Issue: CORS error when making API calls
**Cause**: Backend hasn't enabled CORS for http://localhost:3000  
**Solution**: Backend needs to add CORS middleware:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Issue: "401 Unauthorized" after login
**Cause**: Backend rejected the token or credentials  
**Solution**: 
- Check if backend is running
- Verify credentials are correct
- Check backend logs for errors

### Issue: Changes not reflecting
**Solution**: Clear browser cache and localStorage:
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

## Testing the Complete Flow

1. **Signup** → http://localhost:3000/signup
   - Create account
   - Verify redirect to login

2. **Login** → http://localhost:3000/login
   - Enter credentials
   - Check localStorage has `authToken`
   - Verify redirect to admin

3. **Admin** → http://localhost:3000/admin
   - Should see pending doctors list
   - Try approve/reject actions
   - Check toast notifications

4. **Logout** → Click logout button
   - Check localStorage cleared
   - Verify redirect to login
   - Try accessing /admin (should redirect back to login)

## Directory Structure

```
charaks/
├── app/
│   ├── login/page.tsx          # Login page with backend integration
│   ├── signup/page.tsx         # Signup page with backend integration
│   └── admin/page.tsx          # Admin dashboard (protected route)
├── lib/
│   ├── api.ts                  # API client with auth functions
│   ├── types.ts                # TypeScript interfaces
│   └── auth-utils.ts           # Authentication utility functions
├── components/
│   └── navigation.tsx          # Navigation with login/logout
├── .env.local                  # Environment variables
└── AUTHENTICATION_GUIDE.md     # Detailed auth documentation
```

## Key Files

### `lib/api.ts`
- `authApi.login()` - Login user
- `authApi.signup()` - Register user
- `authApi.logout()` - Clear token
- `adminApi.getPendingDoctors()` - Fetch doctors (requires auth)
- `setAuthToken()` - Store JWT token
- `removeAuthToken()` - Delete JWT token

### `lib/auth-utils.ts`
- `isAuthenticated()` - Check if user is logged in
- `getCurrentUser()` - Get user data
- `setCurrentUser()` - Store user data
- `clearCurrentUser()` - Clear user data

### `app/admin/page.tsx`
- Protected route with auth guard
- Redirects to login if not authenticated
- Fetches and displays pending doctors

## Backend API Endpoints Used

```
POST /api/auth/signup      - Register new user
POST /api/auth/login       - Login user (returns JWT token)
GET  /api/admin/doctors/pending           - Get pending doctors (requires auth)
POST /api/admin/doctors/:id/approve       - Approve doctor (requires auth)
POST /api/admin/doctors/:id/reject        - Reject doctor (requires auth)
```

## Browser Storage

After successful login, check browser localStorage:

```javascript
// In browser DevTools Console:
localStorage.getItem('authToken')     // JWT token
localStorage.getItem('userData')      // User info JSON
```

## Production Deployment

When deploying to production:

1. Update `.env.local` (or use platform environment variables):
```bash
NEXT_PUBLIC_API_URL=https://your-production-api.com/api
```

2. Backend CORS must allow production domain:
```javascript
origin: 'https://your-production-domain.com'
```

3. Ensure HTTPS is enabled for secure token transmission

## Support

For issues or questions:
1. Check browser console for errors
2. Check network tab for failed API requests
3. Verify backend is running and accessible
4. Review `AUTHENTICATION_GUIDE.md` for detailed flow
5. Check backend logs for server-side errors

## Next Features to Implement

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Remember me option
- [ ] Token refresh mechanism
- [ ] Session timeout warning
- [ ] Multi-factor authentication
