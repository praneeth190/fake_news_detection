# Deployment Guide - Fake News Detector

## Backend Deployment (Render)

### Step 1: Prepare Backend Files
1. Ensure `requirements.txt` is in the root directory ✓
2. Create `Procfile` in root directory:
   ```
   web: uvicorn app:app --host 0.0.0.0 --port $PORT
   ```

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository

### Step 3: Configure Render Service
- **Name:** fake-news-detector-api
- **Branch:** main
- **Root Directory:** (leave empty)
- **Runtime:** Python 3.11
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`

### Step 4: Add Environment Variables
In Render dashboard, go to Environment:
```
TAVILY_API_KEY=your_tavily_api_key
GROQ_API_KEY=your_groq_api_key
```

### Step 5: Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Copy the URL (e.g., `https://fake-news-detector-api.onrender.com`)

---

## Frontend Deployment (Vercel)

### Step 1: Update Backend URL
Before deploying, update `frontend/src/utils/api.js`:
```javascript
const api = axios.create({
  baseURL: "https://fake-news-detector-api.onrender.com" // Replace with your Render URL
});
```

### Step 2: Rebuild Frontend
```bash
cd frontend
npm run build
```

### Step 3: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository

### Step 4: Configure Vercel
- **Framework Preset:** Create React App
- **Root Directory:** `frontend`
- Leave build settings as default

### Step 5: Deploy
- Click "Deploy"
- Vercel automatically detects Create React App
- Your app will be live at `https://your-project-name.vercel.app`

---

## Alternative: Netlify for Frontend

### Step 1: Build Frontend
```bash
cd frontend
npm run build
```

### Step 2: Deploy to Netlify
Option A - Manual Upload:
1. Go to https://netlify.com
2. Drag & drop the `frontend/build` folder
3. Your site is live!

Option B - Connect GitHub:
1. Sign up with GitHub
2. Click "New site from Git"
3. Select your repository
4. Set build command: `cd frontend && npm run build`
5. Set publish directory: `frontend/build`

---

## Environment Variables Configuration

### For Render Backend:
```
TAVILY_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
```

Get these from:
- **Tavily:** https://tavily.com
- **Groq:** https://groq.com

---

## Testing After Deployment

1. Update `frontend/src/utils/api.js` with deployed backend URL
2. Rebuild frontend: `npm run build`
3. Deploy to Vercel/Netlify
4. Test the full flow:
   - Go to your Vercel URL
   - Enter a news query
   - Verify it connects to your Render backend

---

## Troubleshooting

### CORS Errors
- Backend already has CORS enabled for all origins
- Ensure frontend URL is not being blocked

### API Connection Issues
- Verify backend URL in `api.js`
- Check environment variables on Render
- Test backend directly: `https://your-backend.onrender.com/docs`

### Build Failures
- Check build logs in Vercel/Netlify
- Run `npm run build` locally to debug

---

## Quick Links

- **Render Dashboard:** https://dashboard.render.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Actions (Optional):** Set up CI/CD for auto-deployment on push
