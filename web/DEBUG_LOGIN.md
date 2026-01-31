# Backend Integration Debugging Guide

## Current Issue: Login 404 Error

### Problem
Login requests are returning 404 errors when trying to authenticate.

### Root Cause Analysis

**Error in Browser Console:**
```
POST http://localhost:8080/auth/login [HTTP/1.1 404 Not Found 0ms]
```

**Issues Identified:**
1. ❌ Request going to `/auth/login` instead of `/api/auth/login`
2. ❌ Port mismatch (8080 vs 8081)
3. ❌ Empty `VITE_API_BASE_URL` not being handled correctly

### Solution

The API base URL should be `/api` (not empty) to match the Vite proxy configuration.

**Update `.env` file:**
```bash
# Route through Vite proxy
VITE_API_BASE_URL=/api
```

### How the Proxy Works

1. **Frontend makes request** → `/api/auth/login`
2. **Vite proxy intercepts** → Matches `/api` pattern
3. **Proxy forwards to** → `https://aee-hackathon.onrender.com/api/auth/login`
4. **Response returns** → Through proxy to frontend

### Vite Proxy Configuration

```typescript
proxy: {
  '/api': {
    target: 'https://aee-hackathon.onrender.com',
    changeOrigin: true,
    secure: false,
    rewrite: (path) => path.replace(/^\/api/, '/api'),
  },
}
```

### Testing After Fix

1. Restart dev server
2. Open browser dev tools (F12)
3. Try logging in
4. Check Network tab - should see:
   - ✅ `POST http://localhost:8081/api/auth/login`
   - ✅ Status 200 OK (if credentials are correct)

### Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| CORS Error | Direct backend URL | Use Vite proxy |
| 404 Error | Missing `/api` prefix | Set `VITE_API_BASE_URL=/api` |
| Port mismatch | Server restarted | Refresh browser |
| Empty response | Wrong API structure | Check backend API docs |

### Backend API Endpoints

All endpoints should be prefixed with `/api`:

- ✅ `/api/auth/login`
- ✅ `/api/auth/register`
- ✅ `/api/farmers/profile`
- ✅ `/api/buyers/profile`
- etc.

### Verification Steps

```bash
# 1. Check .env file
cat .env

# 2. Restart dev server
npm run dev

# 3. Test API endpoint
curl http://localhost:8081/api/auth/login -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### Expected Behavior

**Successful Login:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "...",
      "email": "test@example.com",
      "role": "buyer",
      ...
    }
  }
}
```

**Failed Login:**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```
