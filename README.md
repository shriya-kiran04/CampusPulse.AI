# CampusPulse.AI

**Your campus. Your course. Your updates.**

CampusPulse.AI is a personalized college notice assistant. Instead of making students dig through every announcement, it shows each student only the notices that apply to them, based on their registration number, and uses AI to explain what changed and what they need to do.

## The Problem

College notices are scattered across WhatsApp groups, PDFs and notice boards. Students miss deadlines, and when an exam date or room changes, it's easy to never notice. Most notices also aren't relevant to a given student's program, year or division.

## What It Does

- **Registration-based identity.** A student enters their registration number, and the app loads their program (B.Tech, MCA, BCA, etc.), branch, year and division.
- **Personalized feed.** Each notice targets a program, branch, year and division, or is marked "Any" for everyone. Students only see notices that match their profile.
- **Priority levels.** Notices are marked 🔴 Critical, 🟡 Important or 🔵 General, and the feed is sorted by priority.
- **Change tracking.** When an admin edits a notice, the previous version is saved automatically. Students can open the notice and see the original next to the update.
- **AI change summaries.** Google Gemini turns each change into a short plain-language explanation of what changed and what the student needs to do.
- **Ask CampusPulse.** A chat where students ask questions like "What do I need to do?". Answers come only from that student's own notices, and the assistant says so when it can't find the information.
- **Admin panel.** Admins create notices, choose who they target, and edit existing notices.

## How It Works

```
Admin creates or edits a notice
        ↓
SQLite stores the notice (old version saved on edit)
        ↓
Student logs in with registration number
        ↓
Notices are filtered to the student's program / branch / year / division
        ↓
Dashboard shows a priority-sorted feed
        ↓
Gemini explains changes and answers questions from the student's notices
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, JavaScript) |
| Styling | Tailwind CSS |
| Database | SQLite via `better-sqlite3` |
| AI | Google Gemini API via `@google/genai` |

## Getting Started

**1. Clone and install**
```
git clone https://github.com/shriya-kiran04/CampusPulse.AI.git
cd CampusPulse.AI
npm install
```

**2. Add your Gemini API key**

Create a `.env.local` file in the project root:
```
GEMINI_API_KEY=your_key_here
```
You can get a free key from [Google AI Studio](https://aistudio.google.com). `.env.local` is gitignored, so never commit your key.

**3. Seed demo data**
```
node seed.js
```
This resets the database to a clean demo state. Run it again any time you want to start over.

**4. Run the app**
```
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## Demo Accounts

| Registration No. | Student | Profile |
|---|---|---|
| `BT23CSE1042` | Rahul Sharma | B.Tech CSE, Year 3, Division B |
| `BT23CSE1015` | Ananya Rao | B.Tech CSE, Year 3, Division A |
| `BT22ECE2031` | Kabir Mehta | B.Tech ECE, Year 2, Division A |
| `MCA24A007` | Sneha Patil | MCA, Year 1, Division A |

## Suggested Demo Flow

1. **Personalization:** log in as Rahul and note his three notices. Then log in as Ananya (Division A) and Sneha (MCA) and see that their feeds differ.
2. **Change tracking:** go to `/admin`, edit the *Internship Registration Deadline* notice, then open it as Rahul. You'll see the AI summary and the original vs. updated text. (The seeded *DBMS Practical* notice already has a change history.)
3. **Ask CampusPulse:** open `/ask` and try "What do I need to do?". Then ask about a notice outside Rahul's feed and see the assistant decline to guess.

## Project Structure

```
CampusPulse.AI/
├── app/
│   ├── page.js                 # Student login
│   ├── dashboard/              # Personalized notice feed
│   ├── notice/[id]/            # Notice detail, AI summary, change history
│   ├── ask/                    # Ask CampusPulse chat
│   ├── admin/                  # Create and edit notices
│   └── api/
│       ├── notices/            # Notices filtered for a student
│       ├── notice/[id]/        # One notice + version history
│       ├── explain/[id]/       # AI explanation of a notice's change
│       ├── ask/                # AI Q&A endpoint
│       └── admin-notices/      # Admin list / create / edit
├── lib/
│   ├── db.js                   # SQLite schema
│   ├── queries.js              # Database queries
│   └── ai.js                   # Gemini integration with retry and fallback
├── seed.js                     # Demo data
└── README.md
```

## Current Limitations

This is a hackathon MVP, so a few things are simplified on purpose:

- **Login uses the registration number only.** There is no password or OTP yet, so it isn't secure enough for real use.
- **The admin page has no authentication.**
- **Notices are entered by hand.** There is no PDF or website import yet.
- **SQLite saves to a local file**, so the app is meant to run locally rather than on serverless hosting.
- **Change comparison is on the notice description.** It is not a field-by-field diff of date, time and room.

## Roadmap

- Upload a notice PDF and have Gemini extract the details and target audience automatically
- Field-level change detection (date, time, room)
- Real authentication (college email and OTP) and an admin login
- Push and email notifications for critical notices
- Calendar view of deadlines and exams
- A hosted database so the app can be deployed publicly

## Author

**Shriya Pawar** — [@shriya-kiran04](https://github.com/shriya-kiran04)