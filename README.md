# CampusPulse.AI

**Your campus. Your course. Your updates.**

CampusPulse.AI is an AI-powered college notice assistant that helps students find the announcements, deadlines, schedule changes, exams, admissions, events, and other updates that actually matter to them.

Instead of searching through a large collection of college notices, students get a personalized feed based on their academic profile — including program, branch, year, and division.

The system also tracks changes between notice versions and uses AI to explain what changed and what the student needs to do.

## ✨ Features

* **🎓 Registration-based identity**
  Students are identified using their registration number, which maps to their program, branch, year, and division.

* **📌 Personalized notice feed**
  Students see notices relevant to their academic profile, along with notices marked for everyone.

* **🚨 Priority-based updates**
  Notices are categorized as:

  * 🔴 Critical
  * 🟡 Important
  * 🔵 General

* **🔄 Notice change tracking**
  When an existing notice is updated — for example, when an exam date or deadline changes — previous versions are preserved and the differences are highlighted.

* **🤖 AI-powered explanations**
  Google Gemini converts raw notice changes into concise, student-friendly explanations describing:

  * What changed
  * What the new information is
  * What action the student needs to take

* **⏰ Deadline and schedule awareness**
  Important deadlines, examinations, schedule changes, cancellations, admissions, and events can be surfaced more clearly.

* **🛡️ Outdated notice prevention**
  Notice processing considers information such as authority, academic year, semester, and event details to reduce the risk of surfacing outdated announcements.

* **🧑‍💼 Admin panel**
  Administrators can create and target notices based on program, branch, year, and division.

* **💬 AI Q&A**
  Students can interact with the AI layer to ask questions about available campus information.

## 🧠 How It Works

```text
College Notice
      ↓
Notice Processing
      ↓
Targeting & Validation
      ↓
Database
      ↓
Student Academic Profile
      ↓
Personalized Notice Feed
      ↓
AI Explanation / Q&A
```

When a notice is updated, CampusPulse.AI compares the new version with the previous version and uses AI to explain the meaningful changes in simple language.

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router, JavaScript)
* **Styling:** Tailwind CSS
* **Database:** SQLite
* **Database Driver:** `better-sqlite3`
* **AI:** Google Gemini API
* **AI SDK:** `@google/genai`
* **Development:** Node.js, npm, Git, GitHub

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shriya-kiran04/CampusPulse.AI.git
cd CampusPulse.AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Gemini API

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_key_here
```

> Never commit your actual API key to GitHub.

### 4. Seed the database

Populate the local database with demo students and notices:

```bash
node seed.js
```

### 5. Start the development server

```bash
npm run dev
```

### 6. Open the application

Visit:

```text
http://localhost:3000
```

Use one of the demo registration numbers created by the seed script to explore the student dashboard.

## 📁 Project Structure

```text
campuspulse/
│
├── app/
│   ├── page.js                  # Student login
│   ├── dashboard/              # Personalized student dashboard
│   ├── notice/[id]/             # Notice details and change history
│   ├── admin/                  # Admin interface
│   │
│   └── api/
│       ├── notices/             # Personalized notice APIs
│       ├── notice/[id]/         # Notice details and version history
│       ├── admin-notices/       # Admin notice APIs
│       └── ask/                 # AI Q&A endpoint
│
├── lib/
│   ├── db.js                   # SQLite database setup
│   ├── queries.js               # Database queries
│   └── ai.js                   # Gemini AI integration
│
├── seed.js                      # Demo database seeding
├── package.json
└── README.md
```

## 🔐 Environment Variables

The project currently requires the following environment variable:

```env
GEMINI_API_KEY=your_key_here
```

Keep `.env.local` private and make sure it is included in `.gitignore`.

## 🧪 Development

The project is currently being developed as a working MVP.

Development areas include:

* Improving notice processing
* Refining AI-generated explanations
* Connecting AI responses more deeply with the student dashboard
* Improving notice targeting and validation
* Expanding student-facing interactions
* Testing with more realistic college notice data

## 📌 Current Status

🚧 **CampusPulse.AI is an active MVP under development.**

The core personalized notice flow, database structure, notice version tracking, admin functionality, and Gemini AI integration are being developed and tested.

## 🎯 Vision

CampusPulse.AI aims to turn the traditional college notice system into a personalized information layer where every student can quickly understand:

> **What happened?**
> **Does it affect me?**
> **What changed?**
> **What do I need to do?**

---

Built with ❤️ for a smarter campus experience.

## 👩‍💻 Author

**Shriya Pawar**

GitHub: [shriya-kiran04](https://github.com/shriya-kiran04)
