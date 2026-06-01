# 🚀 Deployment Checklist

## Backend - Render Setup

1. **Create Render Service:**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repo
   - Select `backend` as the build command directory
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Set Environment Variables on Render:**

   ```
   PORT=5001
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string_here
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

   ⚠️ **IMPORTANT:** Use your actual MongoDB URI from Atlas and your actual Vercel URL

3. **Deploy and Check Logs:**
   - Should see: `✅ Server running on port: 5001`
   - Should see: `✅ MongoDB connected successfully`
   - Test health: `https://your-render-url.render.com/health`

---

## Frontend - Vercel Setup

1. **Update `.env.production`:**

   ```
   VITE_API_URL=https://your-render-backend-url.render.com/api/task
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Select root directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Deploy!

3. **Test:**
   - Open your Vercel URL
   - Try creating a task
   - Check browser console (F12) for errors

---

## Troubleshooting

| Error                    | Solution                                                                  |
| ------------------------ | ------------------------------------------------------------------------- |
| "MONGODB_URI is not set" | Add MONGODB_URI to Render env vars                                        |
| "Not allowed by CORS"    | Update FRONTEND_URL in Render env vars to your actual Vercel URL          |
| "Cannot reach backend"   | Check that VITE_API_URL in frontend .env.production is correct Render URL |
| Build fails on Vercel    | Make sure you selected `frontend` as root directory                       |
| Build fails on Render    | Make sure dependencies are installed (check logs)                         |

---

## Quick Render Backend URL Format

```
https://task-manager-backend.onrender.com
```

(Your actual URL will be different - copy it from Render dashboard)
