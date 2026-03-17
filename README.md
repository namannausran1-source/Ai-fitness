# 💪 BulkUp — Gamified Muscle Gain Tracker

> The fitness app built for **hardgainers** — people who struggle to gain weight and muscle. Track workouts, calories, and protein with Duolingo-style gamification and real competitive leaderboards.

🌐 **Live App:** [getbulkup.netlify.app](https://getbulkup.netlify.app)
---

## 🚀 What is BulkUp?

Most fitness apps are built for weight loss or casual cardio. BulkUp is different — it's designed specifically for the **hardgainer niche**: skinny guys trying to bulk up, eat enough, and stay consistent.

It combines:
- 🎮 **Duolingo-style XP & streaks** to build workout habits
- 🏆 **Strava-style leaderboards** for real competitive motivation
- 🍱 **AI meal planning** personalised for Indian users (region, diet, budget)
- 📊 **Progress tracking** with weight logs, muscle focus maps, and body measurements

## 🧬 The DNA of BulkUp

BulkUp isn't a new idea from scratch — it's the best parts of the apps you already love, rebuilt for one specific person: **the skinny guy trying to bulk up.**

| | Duolingo | Strava | BulkUp |
|---|---|---|---|
| **Core Loop** | Streak + XP per lesson | Log activity, see friends | Streak + XP per workout |
| **Motivation** | Don't break the streak | Don't fall behind friends | Both — streak AND leaderboard |
| **Social** | Global leaderboard | Follow friends, segments | Weekly competitive leaderboard |
| **Personalisation** | Language path | Activity type | Diet, region, budget, body stats |
| **Target user** | Language learners | Runners & cyclists | Hardgainers (skinny → muscular) |
| **Retention hook** | Daily habit loop | Social shame of missing | XP + missions + rank |

> **BulkUp = Duolingo's habit engine + Strava's competitive identity — for muscle gain.**
> 

## ✨ Features

### 🏠 Home Dashboard
- Daily calorie & protein rings with visual progress
- XP bar with 5 levels: Rookie → Grinder → Builder → Beast → Legend
- Weekly workout chart
- Daily habit tasks (+XP for each: breakfast, calories, workout, weight log)
- Mission card with bonus XP for completing all 3 core tasks

### 💪 Workout Tab
- Home workouts (no equipment needed)
- Gym workout plans (Push/Pull/Legs/Full Body)
- Live workout timer with set tracking
- Rest timer between exercises
- XP awarded on completion (anti-cheat: once per day)

### 🏆 Leaderboard
- Real-time leaderboard via Firestore
- Weekly points, all-time points, habit streak tabs
- Weekly challenges (3-Week Streak, 10 Workouts, Protein Pro, etc.)
- Daily habit loop visualiser

### 🍽️ AI Meal Planner
- Powered by Gemini 2.5 Flash via Netlify serverless function
- Personalised for Indian diet types: Veg / Eggetarian / Non-veg
- Region-aware (uses local foods from your city/state)
- Budget-aware: ₹3k / ₹3–6k / ₹6k+ per month
- Full day plan with exact quantities and macros summary

### 📈 Progress Tab
- Weight log with trend chart
- Activity calendar (workout vs missed days)
- Muscle focus map (tracks which muscles you've trained)
- Body measurements (chest, arms)
- Progress photos (Week 1 / 2 / 3)
- Milestone tracker

### 👤 Profile
- Avatar, level, streak display
- Achievement badges (8 total)
- XP history and leaderboard rank

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (Single file PWA) |
| Auth | Firebase Authentication (Google + Email) |
| Database | Firebase Firestore |
| AI | Gemini 2.5 Flash (`gemini-2.5-flash`) |
| Backend | Netlify Serverless Functions |
| Hosting | Netlify |

---

## 📁 Project Structure
Ai-fitness/
├── index.html          # Entire app (single-file PWA)
├── manifest.json       # PWA manifest
├── netlify/
│   └── functions/
│       └── claude.js   # Serverless function — routes AI meal plan requests
---

## 🔒 Security

- AI API key is **never exposed to the client** — all requests go through a Netlify serverless function
- Firebase Auth token verified on every AI request
- Anti-cheat XP caps: max 2 workouts/day, XP awarded once per day per action
- Meal plan beta limit: 3 generations per user

---

## 🇮🇳 Built for India

- Indian meal plans by default (dal, roti, paneer, curd, etc.)
- Region-aware food suggestions
- Budget tiers in INR (₹3k / ₹6k / ₹6k+)
- Targeting the massive underserved hardgainer segment in India

---

## 🗺️ Roadmap

- [ ] Social features (follow friends, share workouts)
- [ ] Custom workout builder
- [ ] Freemium paywall (target: 500 active users first)
- [ ] Indian diaspora monetisation (USD pricing)
- [ ] Native Android app

---

## 👨‍💻 Author

**Naman** — Student founder, building BulkUp as his first startup.

> *"Most fitness apps want you to lose weight. BulkUp wants you to build it."*

---

## 📄 License

MIT License — feel free to fork and build on it.
