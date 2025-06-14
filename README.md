# Chatbot + Instagram Analytics (MERN)
## 📸 Module 1: Instagram Content Idea Assistant

This module allows users to generate AI-powered content ideas for Instagram reels based on a given topic and niche.

### 🚀 Features
- Input form for topic and niche
- Fetches reel ideas, caption, hook, and 5 relevant hashtags using OpenAI API (Gemini or GPT-4)
- Displays result in a clean card format
- Includes loading animation and error handling
- Responsive and user-friendly UI

### 🛠️ Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- AI: Google Gemini API (or OpenAI GPT)
- Deployment: Vercel / Render (optional)

### 🔄 API Endpoint
`POST /api/ideas/generate`

#### Request Body:
```json
{
  "topic": "city walks",
  "niche": "travel"
}
```

#### Sample Response:
```json
{
  "idea": [
    "Idea 1...",
    "Idea 2...",
    "Idea 3...",
    "Idea 4...",
    "Idea 5..."
  ],
  "caption": "Sample caption here",
  "hashtags": ["#travel", "#citywalks", "#urbanexploration", "#wanderlust", "#reels"],
  "hook": "Stop scrolling! Here's why city walks are the best."
}
```
### How to Run Locally:
```bash
# Backend
cd server
npm install
npm run dev

# Frontend
Open index.html in browser or use a simple live server

