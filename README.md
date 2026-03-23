# SkillGap AI

> An AI-powered interview preparation platform that analyses your resume, self-description, and a target job listing to generate a personalised skill gap report, curated interview questions, and a day-by-day preparation plan.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [How It Works](#how-it-works)

---

## Overview

SkillGap AI helps candidates prepare smarter for job interviews. You paste a job description, upload your resume (PDF), and optionally describe yourself — the app uses **Google Gemini** to return:

- A **match score** (0–100) against the job
- **Technical & behavioural interview questions** with suggested answers
- A list of **skill gaps** ranked by severity
- A **day-wise preparation plan** tailored to close those gaps

All reports are saved to your account so you can revisit them anytime via the collapsible left panel.

---

## Features

- 🔐 **JWT Authentication** — register, login, logout with HTTP-only cookie sessions and a token blacklist
- 📄 **PDF Resume Parsing** — upload your resume and the text is extracted server-side with `pdf-parse`
- 🤖 **AI Report Generation** — powered by Google Gemini with a strict Zod-validated JSON schema
- 📋 **Report History** — all past reports stored in MongoDB, accessible via a slide-in left panel
- 🎨 **Premium UI** — glassmorphism design, animated background, drag-and-drop resume upload
- 📱 **Responsive** — works across desktop, tablet, and mobile screens

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| React Router 7 | Client-side routing |
| Vite 8 | Dev server & bundler |
| SCSS (Sass) | Styling with design tokens |
| Axios | HTTP client |

### Backend
| Tool | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose 9 | Database & ODM |
| Google Gemini (`@google/genai`) | AI report generation |
| Zod | AI output schema validation |
| Multer | PDF file upload handling |
| pdf-parse | Extract text from uploaded PDFs |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT auth tokens |

---

## Project Structure

```
SkillGap/
├── backend/
│   ├── server.js                   # Entry point — connects DB, starts server
│   └── src/
│       ├── app.js                  # Express app, middleware, route mounting
│       ├── config/
│       │   └── database.js         # Mongoose connection
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── interview.controller.js
│       ├── middlewares/
│       │   ├── auth.middleware.js  # JWT verification
│       │   └── file.middleware.js  # Multer PDF upload
│       ├── models/
│       │   ├── user.models.js
│       │   ├── blacklist.model.js  # Invalidated tokens
│       │   └── interviewReport.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   └── interview.routes.js
│       └── services/
│           └── ai.services.js      # Gemini API + Zod schema
│
└── frontend/
    └── src/
        ├── features/
        │   ├── auth/
        │   │   ├── auth.context.jsx
        │   │   ├── hooks/useAuth.js
        │   │   ├── services/auth.api.js
        │   │   └── pages/          # Login, Register
        │   └── interview/
        │       ├── interview.context.jsx
        │       ├── hooks/useInterview.js
        │       ├── services/interview.api.js
        │       ├── styles/
        │       │   ├── home.scss
        │       │   └── interview.scss
        │       └── pages/
        │           ├── Home.jsx        # Report generation form
        │           ├── Leftpanel.jsx   # Collapsible report history panel
        │           └── Interview.jsx   # Individual report view
        └── app.routes.jsx
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- A MongoDB Atlas cluster (or local MongoDB instance)
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

---

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env   # then fill in the values (see below)

# Start development server (with nodemon)
npm run dev
```

The backend runs on **http://localhost:3000** by default.

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

The frontend runs on **http://localhost:5173** by default.

---

## Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_here
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on |
| `MONGO_URI` | Full MongoDB connection string |
| `JWT_SECRET` | Secret used to sign/verify JWT tokens |
| `GOOGLE_GEMINI_API_KEY` | API key for Google Gemini |

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/register` | Public | Register a new user |
| `POST` | `/login` | Public | Login and receive a session cookie |
| `GET` | `/logout` | Public | Clear session cookie and blacklist token |
| `GET` | `/get-me` | Private | Get the currently authenticated user |

### Interview — `/api/interview`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/` | Private | Generate a new skill gap report (multipart/form-data with `resume` PDF) |
| `GET` | `/` | Private | Get all reports for the logged-in user |
| `GET` | `/report/:interviewId` | Private | Get a single report by ID |

---

## How It Works

```
User fills in form
      │
      ▼
Frontend sends multipart request (resume PDF + job description + self description)
      │
      ▼
Backend extracts text from PDF (pdf-parse)
      │
      ▼
Prompt is built and sent to Google Gemini with a strict JSON response schema (Zod)
      │
      ▼
AI returns: matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan, title
      │
      ▼
Report is saved to MongoDB, linked to the authenticated user
      │
      ▼
Frontend navigates to the report page and shows the full breakdown
```

---

## License

This project is for educational purposes.
