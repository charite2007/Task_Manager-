# 🚀 Deployment Guide - Task Manager Application

## Prerequisites

- GitHub account with your repository pushed
- Render account (render.com)
- Vercel account (vercel.com)
- MongoDB Atlas account with connection URI

---

## STEP 1: Build Frontend Distribution Files

Before deploying, you need to create the `dist` directory locally:

```bash
cd frontend
npm run build
```

This creates:

```
frontend/dist/
├── index.html
├── assets/
│   ├── index-xxx.js
│   ├── index-xxx.css
│   └── ... (other bundled files)
```

The `dist` folder is what Vercel will serve.

---

## STEP 2: Deploy Backend to Render

### Option A: Using render.yaml (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Add render.yaml and deployment config"
   git push
   ```

2. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click **New +** → **Blueprint**
   - Authorize GitHub
   - Select your repository
   - It will auto-detect `render.yaml`
   - Click **Deploy**

3. **Add Environment Variables**
   - Go to your service → **Environment**
   - Add:
     ```
     PORT=5001
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
     NODE_ENV=production
     ```

4. **Wait for Deployment** (2-3 min)
   - Copy your URL: `https://task-manager-backend.onrender.com`

### Option B: Manual Setup

1. **Create Web Service**
   - Dashboard → **New +** → **Web Service**
   - Connect GitHub repo
   - Fill in:
     - Name: `task-manager-backend`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Create Service

2. **Add Environment Variables** (same as above)

---

## STEP 3: Deploy Frontend to Vercel

### Option A: Using Vercel Config (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click **Add New** → **Project**
   - Select your repository

2. **Configure Project**
   - Framework: **Vite**
   - Root Directory: **frontend**
   - Build Command: **npm run build**
   - Output Directory: **dist**

3. **Add Environment Variables**
   - Click **Environment Variables** before deploying
   - Add:
     ```
     VITE_API_URL=https://task-manager-backend.onrender.com/api/task
     ```
   - (Replace with your actual Render URL)

4. **Deploy**
   - Click **Deploy**
   - Copy your URL: `https://your-app.vercel.app`

### Option B: Using vercel.json

Vercel will automatically read your `vercel.json` configuration.

---

## STEP 4: Update Backend CORS

Your backend needs to allow requests from Vercel:

```javascript
// File: backend/src/app.js

import cors from "cors";

const corsOptions = {
  origin: "https://your-app.vercel.app", // ← Replace with your Vercel URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
```

**Then push to GitHub:**

```bash
git add backend/src/app.js
git commit -m "Update CORS for production"
git push
```

**Render will auto-redeploy!** ✅

---

## STEP 5: Test Live Application

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Test all features:
   - ✅ Create a task
   - ✅ Refresh page (task persists)
   - ✅ Edit a task
   - ✅ Mark complete
   - ✅ Delete task

---

## File Structure After Deployment

```
Local Machine:
frontend/
├── dist/                    ← Build output
│   ├── index.html
│   └── assets/
├── src/
├── package.json
├── vite.config.js
└── vercel.json              ← ✅ Created

backend/
├── src/
├── package.json
├── render.yaml              ← ✅ Created
├── .nvmrc                   ← ✅ Created
└── .env                     ← Local only (not pushed)
```

---

## Environment Variables Summary

### Backend (Render Dashboard)

```
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
NODE_ENV=production
```

### Frontend (Vercel Dashboard)

```
VITE_API_URL=https://task-manager-backend.onrender.com/api/task
```

---

## Free Tier Limits & Behavior

| Service             | Limit         | Behavior                                     |
| ------------------- | ------------- | -------------------------------------------- |
| **Render Backend**  | 750 hrs/month | Spins down after 15 min → 5-10 sec wake time |
| **Vercel Frontend** | Unlimited     | Always fast                                  |
| **MongoDB**         | 512 MB        | Enough for 1000s of tasks                    |

---

## Troubleshooting

### Backend Won't Deploy

- Check render.yaml syntax
- Verify .nvmrc is in repo
- Check logs in Render dashboard

### Frontend Build Fails

- Run `npm run build` locally to test
- Check `vite.config.js` syntax
- Verify all dependencies in `package.json`

### Tasks Not Saving

- Check CORS error in browser console (F12)
- Verify `VITE_API_URL` is correct
- Check backend logs in Render dashboard

### Connection Timeout on First Request

- Normal on Render free tier
- Backend spins down after inactivity
- First request wakes it (takes 5-10 sec)

### CORS Error

- Update backend CORS with correct Vercel URL
- Redeploy backend after changes
- Wait 1-2 min for propagation

---

## Live URLs (After Deployment)

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://task-manager-backend.onrender.com`
- **API**: `https://task-manager-backend.onrender.com/api/task`

---

## Next Steps

1. ✅ Run local build: `npm run build` (frontend)
2. ✅ Push all files to GitHub
3. ✅ Deploy backend to Render
4. ✅ Get Render URL
5. ✅ Deploy frontend to Vercel
6. ✅ Update CORS in backend
7. ✅ Test live app
8. ✅ Share your deployed app! 🎉

---

**Questions? Check the main README.md or troubleshooting section above!**
