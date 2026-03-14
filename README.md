# Fake News Detector 🔍

A modern web application that uses AI to detect fake news and verify claims. Built with React, FastAPI, Tavily Search API, and Groq LLM for real-time fact-checking.

## ✨ Features

- **🎨 Beautiful UI** - Animated landing page with smooth transitions using Framer Motion
- **🤖 AI-Powered Analysis** - Uses Groq LLM for intelligent fact-checking
- **🔎 Real-Time Search** - Tavily API searches the web for relevant evidence
- **📊 Confidence Scores** - Displays confidence level for fact-checking results
- **🌐 Source Links** - Shows verified sources for claims
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **⚡ Production Ready** - Deployed on Vercel (Frontend) and Render (Backend)

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Framer Motion** - Smooth animations and page transitions
- **Material-UI (MUI)** - Professional component library
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

### Backend
- **FastAPI** - High-performance Python web framework
- **Groq** - Fast LLM for fact-checking analysis
- **Tavily API** - Real-time web search for evidence gathering
- **Pydantic** - Data validation
- **CORS** - Cross-origin request handling

## 🚀 Live Demo

**Frontend:** https://fake-news-detection-4zw7.vercel.app/  
**Backend API:** https://fake-news-detector-api-jh62.onrender.com

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.11+
- Git

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/praneeth190/fake_news_detection.git
cd fake_news_detection
```

2. **Create a Python virtual environment**
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env and add your API keys:
# TAVILY_API_KEY=your_key_here
# GROQ_API_KEY=your_key_here
```

5. **Run the backend server**
```bash
uvicorn app:app --reload --port 8001
```

Backend will be available at `http://localhost:8001`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

Frontend will be available at `http://localhost:3000`

## 🎯 Usage

1. **Open the app** in your browser
2. **Click "Check Now"** on the landing page
3. **Enter a news claim** (e.g., "The Earth is flat")
4. **Wait for analysis** - The app searches the web and analyzes with AI
5. **View results** - See if the claim is true or fake with confidence score and sources

## 🔌 API Endpoints

### POST `/detect`
Analyzes a news claim and returns fact-check result.

**Request:**
```json
{
  "query": "The Moon is made of cheese"
}
```

**Response:**
```json
{
  "claim": "The Moon is made of cheese",
  "result": "Fake News",
  "sources": [
    {
      "title": "Moon Composition - NASA",
      "url": "https://example.com"
    }
  ]
}
```

## 🌐 Getting API Keys

### Tavily API
1. Go to https://tavily.com
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add to `.env` as `TAVILY_API_KEY`

### Groq API
1. Go to https://groq.com
2. Sign up for a free account
3. Get your API key from the console
4. Add to `.env` as `GROQ_API_KEY`

## 📁 Project Structure

```
fake_news_detection/
├── app.py                 # FastAPI backend server
├── requirements.txt       # Python dependencies
├── Procfile              # Render deployment config
├── runtime.txt           # Python version specification
├── .env.example          # Environment variables template
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js        # Main app component with routing
│   │   ├── App.css       # Global styles
│   │   ├── index.js      # React entry point
│   │   ├── components/
│   │   │   ├── LandingPage.js    # Animated landing page
│   │   │   └── NewsChecker.js    # Fact-checking interface
│   │   └── utils/
│   │       └── api.js    # Axios API configuration
│   └── package.json      # Node dependencies
└── README.md
```

## 🚀 Deployment

### Deploy Backend to Render
1. Go to https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
6. Add environment variables (TAVILY_API_KEY, GROQ_API_KEY)
7. Deploy!

### Deploy Frontend to Vercel
1. Go to https://vercel.com
2. Import your GitHub repository
3. Set Root Directory to `frontend`
4. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🔧 Configuration

### Update Backend URL
Edit `frontend/src/utils/api.js`:
```javascript
const api = axios.create({
  baseURL: "https://your-render-backend-url.onrender.com"
});
```

### Customize Models
In `app.py`, change the Groq model:
```python
model="compound-beta"  # Change to your preferred model
```

## 📊 How It Works

1. **User submits a claim** through the React frontend
2. **Frontend sends request** to FastAPI backend
3. **Tavily API searches** the web for relevant information
4. **Groq LLM analyzes** the claim against the evidence
5. **Result is returned** with confidence score and sources
6. **Frontend displays** the result with animations

## 🐛 Troubleshooting

### Backend Won't Start
- Ensure Python 3.11+ is installed
- Check that virtual environment is activated
- Verify API keys are set in `.env`
- Run `pip install -r requirements.txt` again

### Frontend Build Fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear browser cache
- Check for ESLint errors: `npm run build`

### API Connection Issues
- Verify backend is running
- Check backend URL in `frontend/src/utils/api.js`
- Ensure CORS is enabled on backend
- Test backend directly: `https://your-backend-url/docs`

### Slow Fact-Checking
- Tavily API needs ~3-5 seconds for search
- Groq LLM needs ~1-2 seconds for analysis
- Total response time: ~5-10 seconds

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
TAVILY_API_KEY=your_tavily_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

## 📦 Dependencies

### Backend
- fastapi>=0.110.0
- uvicorn[standard]>=0.28.0
- pydantic>=2.10.0
- requests>=2.32.0
- openai>=1.50.0
- python-dotenv>=1.0.1

### Frontend
- react@^19.1.0
- react-router-dom@^7.7.1
- axios@^1.10.0
- framer-motion@^12.36.0
- @mui/material@^7.1.2
- react-scripts@5.0.1

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Steps to contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is Open Source and available under the MIT License.

## 🙏 Acknowledgments

- **Tavily** - For powerful web search API
- **Groq** - For fast LLM inference
- **OpenAI** - For SDK used with Groq
- **React & Framer Motion** - For beautiful UI framework and animations
- **Vercel & Render** - For seamless deployment platforms

## 📧 Contact

For questions or feedback, feel free to open an issue on GitHub.

---

**Made with ❤️ by Praneeth to fight misinformation**
