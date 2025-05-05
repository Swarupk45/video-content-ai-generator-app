# 🎬 Video Content AI Generator

phone:9999999999
otp:123456 for login 
A powerful React-based application that helps users generate video content ideas using AI, create videos with Canva, and upload them to YouTube — all with seamless login, user experience, and full automation support.

---

## 🚀 Live Demo

👉 [Live Application](https://your-deployed-url.com)

---

## 🧩 Features

- 🔐 **Google Login with Firebase Authentication**
- 🧠 **AI-powered Idea Generator** using OpenAI
- 📝 **Script-based video creation recommendation** (e.g. Canva)
- ⬆️ **YouTube Video Upload** integration using Google OAuth
- 📂 **View all Generated Ideas and Uploaded Videos in Dashboard**
- ⚙️ **State Management using Redux Toolkit**
- 🛡️ **Protected Routes & Auto Logout**
- 🎯 **Error Handling & Validations**
- 💻 **Fully Responsive UI using Tailwind CSS**

---

## 🛠️ Tech Stack

| Technology       | Description                                   |
|------------------|-----------------------------------------------|
| **React.js**     | Frontend Library                              |
| **Redux Toolkit**| State Management                              |
| **Tailwind CSS** | Styling Framework                             |
| **Firebase**     | Auth (Google Sign-in)                         |
| **OpenAI API**   | AI Content Generation                         |
| **Google OAuth** | Upload Videos to YouTube                      |
| **Axios**        | API Requests                                  |
| **React Router** | Routing System                                |

---

## 🔑 API & Keys Setup

> ⚠️ All users **must create their own keys** for OpenAI & Google Cloud.

### 🧠 OpenAI API Key
1. Visit: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create your API key
3. Store in `.env` like:

REACT_APP_OPENAI_API_KEY=your-openai-api-key

markdown

### 📺 YouTube API Key (Google OAuth)
1. Go to: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Enable YouTube Data API v3
3. Create OAuth credentials
4. Save in `.env` like:

REACT_APP_GOOGLE_CLIENT_ID=your-client-id

yaml

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/video-content-ai-generator.git

# 2. Navigate to project directory
cd video-content-ai-generator

# 3. Install dependencies
npm install

# 4. Add your environment variables in .env

makefile
REACT_APP_OPENAI_API_KEY=your-key
REACT_APP_GOOGLE_CLIENT_ID=your-client-id

📚 Libraries Used
Library	Purpose
react-router-dom	Routing
redux, @reduxjs/toolkit	State Management
firebase	Auth (Google Login)
axios	HTTP Requests
tailwindcss	Utility-First CSS

🔁 App Flow Summary
User Login with Firebase (Google)

Redirected to Dashboard

Click "Generate Idea" → AI generates video idea/script

User clicks "Create in Canva":

Suggested Canva Template

After video creation, user returns and clicks "Upload to YouTube"

Video is uploaded using Google OAuth

Dashboard shows:

🧠 Ideas generated

📺 Videos uploaded

🎨 Responsive Design
Built with Tailwind CSS, the UI is optimized for:

📱 Mobile Devices

💻 Desktops

🖥️ Tablets

🚫 Error Handling
OpenAI or Firebase errors are handled gracefully.

Google API & upload errors are logged and notified.

🔐 Authentication Logic
Google Sign-In via Firebase

Auto Logout on Token Expiry

Protected Routes for Dashboard and Upload

✨ Recommended Improvements
✅ Add user video analytics (views, likes)

✅ Save AI ideas and videos in Firestore

✅ Add thumbnail preview before upload

✅ Convert script to voice-over (Text-to-Speech)

👨‍💻 Author
Swarup Kishor Kashid
Frontend Developer with experience in React, Tailwind, Firebase, and REST APIs.

📧 Email: swarupkishorkashid45@gmail.com
🌐 Portfolio: https://swarup-new-portfolio-k-k.netlify.app/
🔗 GitHub: https://github.com/Swarupk45
