# AI Interview Preparation Portal

An AI-powered web platform designed to analyze target job descriptions against candidate resumes/self-descriptions to produce a highly personalized, structured interview preparation strategy.

---

## 🚀 Key Features

- **Profile & Resume Analysis**: Seamlessly parse PDF/DOCX resumes using advanced PDF extraction tools.
- **Match Score Assessment**: Get a personalized compatibility score indicating how well your profile matches the target job description.
- **Custom Interview Guide**: Generates targeted **Technical** and **Behavioral** interview questions, including:
  - The specific question.
  - The interviewer's core intention.
  - Best-practice model answers.
- **Personalized Roadmap**: Generates a step-by-step, day-wise timeline to prepare for the specific role.
- **Resume Tailoring & Export**: AI customizes your resume content to align with the target job and allows high-fidelity client-side PDF export (using native print capability).

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: SCSS (Sass)
- **State & Router**: React Context API, React Router DOM
- **Client-Side Export**: Dynamic hidden print frame system for vector-quality print-to-PDF.

### Backend
- **Framework**: Node.js & Express
- **Database**: MongoDB (Mongoose ORM)
- **PDF Extraction**: `pdf-parse` (Class-based API)
- **AI Orchestration**: `@google/genai` (utilizing Gemini model engines)

---

## ⚙️ Local Development Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) and [MongoDB](https://www.mongodb.com/try/download/community) installed locally.

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend/` folder and add:
   ```env
   PORT
   MONGO_URI
   GOOGLE_GENAI_API_KEY
   JWT_SECRET
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deployment (Render)

The project is structured to deploy smoothly on **Render** (or Vercel/Heroku) with minimal overhead:

- **Build Command**: Runs the optimized build script that handles both front and back ends:
  ```bash
  chmod +x ./backend/render-build.sh && ./backend/render-build.sh
  ```
- **Start Command**:
  ```bash
  node backend/server.js
  ```
- **Environment Variables**: Make sure to add `MONGO_URI`, `GOOGLE_GENAI_API_KEY`, `JWT_SECRET`, and `NODE_ENV=production` on the Render dashboard.

Open [https://ai-interview-prep-dvoc.onrender.com/](https://ai-interview-prep-dvoc.onrender.com/) in your browser.

