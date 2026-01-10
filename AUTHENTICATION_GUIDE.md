# Authentication Flow Guide

## Overview
This document explains the complete JWT token-based authentication system implemented in the Charak frontend.

## Architecture

### Token Storage
- **Location**: Browser localStorage
- **Key**: `authToken`
- **Format**: JWT (JSON Web Token)
- **Lifetime**: Set by backend (typically 24h or 7d)

### User Data Storage
- **Location**: Browser localStorage  
- **Key**: `userData`
- **Format**: JSON stringified user object
- **Contents**: `{ id, username, role }`

## Authentication Flow

### 1. User Signup (`/signup`)
```typescript
// User fills form → POST /api/auth/signup
authApi.signup({ username, password, role })
→ Success: Redirect to /login
→ Failure: Show error toast
```

### 2. User Login (`/login`)
```typescript
// User enters credentials → POST /api/auth/login
authApi.login({ username, password })
→ Backend validates credentials
→ Returns: { success: true, token: "jwt...", user: {...} }
→ Frontend stores token in localStorage
→ Frontend stores user data in localStorage
→ Redirect to /admin dashboard
```

### 3. Accessing Protected Routes (`/admin`)
```typescript
// On page load:
1. Check isAuthenticated() → Reads localStorage for token
2. If no token → Redirect to /login with error toast
3. If token exists → Fetch data with Authorization header
4. Backend validates token
5. Success → Display data
6. Failure (401) → Token invalid/expired → Redirect to /login
```

### 4. API Requests with Authentication
```typescript
// Every API call to protected endpoints:
fetchWithAuth(endpoint, options)
→ Reads token from localStorage
→ Adds Authorization: Bearer <token> header
→ Makes request
→ Backend verifies token
→ Returns data or 401 Unauthorized
```

### 5. User Logout
```typescript
// User clicks logout:
authApi.logout()
→ Removes authToken from localStorage
→ Removes userData from localStorage
→ Redirect to /login
→ All protected routes now inaccessible
```

## Key Functions

### `lib/api.ts`
```typescript
// Token Management
getAuthToken(): string | null        // Read token
setAuthToken(token: string): void    // Store token
removeAuthToken(): void              // Delete token

// API Endpoints
authApi.login(credentials)           // POST /auth/login
authApi.signup(signupData)           // POST /auth/signup
authApi.logout()                     // Clear local storage

adminApi.getPendingDoctors()         // GET /admin/doctors/pending (requires auth)
adminApi.approveDoctor(id, remarks)  // POST /admin/doctors/:id/approve (requires auth)
adminApi.rejectDoctor(id, remarks)   // POST /admin/doctors/:id/reject (requires auth)
```

### `lib/auth-utils.ts`
```typescript
isAuthenticated(): boolean           // Check if token exists
getCurrentUser(): User | null        // Get stored user data
setCurrentUser(userData): void       // Store user data
clearCurrentUser(): void             // Remove user data
```

## Protected Route Pattern

```typescript
// Example: Admin Page
useEffect(() => {
  // 1. Auth guard
  if (!isAuthenticated()) {
    toast({ 
      title: "Authentication Required",
      description: "Please login to access this page.",
      variant: "destructive" 
    });
    router.push("/login");
    return;
  }
  
  // 2. Fetch protected data
  fetchData();
}, []);
```

## Navigation State Management

The navigation component dynamically shows/hides buttons based on auth state:

**Logged Out:**
- Login button
- Get Started (signup) button

**Logged In:**
- Dashboard button (links to /admin)
- Logout button

## Error Handling

### 401 Unauthorized
```typescript
// Indicates token is missing, invalid, or expired
catch (error: any) {
  if (error.message.includes("authentication required")) {
    // Clear invalid token
    removeAuthToken();
    clearCurrentUser();
    // Redirect to login
    router.push("/login");
  }
}
```

### Network Errors
```typescript
catch (error: any) {
  toast({
    title: "Connection Error",
    description: error.message || "Please check your internet connection",
    variant: "destructive"
  });
}
```

## Security Considerations

1. **Token Storage**: localStorage (persistent across tabs/windows)
2. **HTTPS Only**: Tokens should only be transmitted over HTTPS in production
3. **Token Expiration**: Backend sets expiration, frontend doesn't validate (relies on 401)
4. **XSS Protection**: Avoid `dangerouslySetInnerHTML`, sanitize user input
5. **CORS**: Backend must whitelist frontend origin

## Backend Requirements

### CORS Configuration
```javascript
// Backend must enable CORS for frontend origin
app.use(cors({
  origin: 'http://localhost:3000',  // Development
  // origin: 'https://yourdomain.com', // Production
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### JWT Middleware
```javascript
// Backend must verify Authorization header
const token = req.headers.authorization?.split(' ')[1];
if (!token) return res.status(401).json({ message: "Authentication required" });
const decoded = jwt.verify(token, SECRET_KEY);
req.user = decoded;
```

## Testing Checklist

- [ ] User can signup successfully
- [ ] User can login with valid credentials
- [ ] Invalid credentials show error
- [ ] Token is stored in localStorage after login
- [ ] Admin page redirects to login when not authenticated
- [ ] Admin page loads data when authenticated
- [ ] Expired/invalid token triggers logout
- [ ] Logout clears token and user data
- [ ] Navigation buttons update based on auth state
- [ ] Protected API calls include Authorization header
- [ ] 401 errors redirect to login
- [ ] CORS is configured on backend

## Troubleshooting

### "401 Unauthorized" on admin page
**Cause**: No token in localStorage  
**Solution**: Login first at `/login`

### CORS errors
**Cause**: Backend hasn't enabled CORS  
**Solution**: Add CORS middleware on backend

### Token not persisting
**Cause**: localStorage is disabled or blocked  
**Solution**: Check browser privacy settings

### Infinite redirect loop
**Cause**: Auth check fails → redirect → auth check fails  
**Solution**: Ensure token is actually stored after successful login

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://charakbackendapi.onrender.com/api
```

## Complete Flow Diagram

```
┌─────────┐     ┌─────────┐     ┌──────────────┐     ┌─────────┐
│ Signup  │ --> │  Login  │ --> │ Admin Panel  │ --> │ Logout  │
└─────────┘     └─────────┘     └──────────────┘     └─────────┘
     │               │                  │                   │
     │ POST          │ POST             │ GET               │ Clear
     │ /signup       │ /login           │ /admin/...        │ Storage
     │               │                  │                   │
     │               └─> Store Token    │ Send Token   <────┘
     │                   in localStorage │ in Header
     │                                   │
     └───> Redirect ───> Redirect ──────┘
           to /login     to /admin
```

## Next Steps

1. **Backend CORS**: Configure CORS middleware on backend server
2. **Token Refresh**: Implement refresh token logic for expired tokens
3. **Remember Me**: Add option to persist login longer
4. **Password Reset**: Add forgot password functionality
5. **Email Verification**: Add email confirmation for new signups
