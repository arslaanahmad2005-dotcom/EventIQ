# EventIQ — AI-Powered Tech Event Recommendation System

> **Discover the tech events worth showing up for.**  
> A production-grade, fully functional AI-powered web platform for discovering and recommending technology conferences, hackathons, workshops, and developer meetups with transparent personalization.

---

## ✨ Key Features

- **Genuine Dual-Mode Recommendation Architecture:**
  - **Live AI Engine (Google Gemini 2.5):** Sends user preference vector (interests, skills, experience level, format, mode, location, activity history) to a secure backend endpoint (`POST /api/recommend`) for genuine structured AI recommendations.
  - **Adaptive Local Fallback:** If an AI API key is not present or the network is unavailable, the deterministic weighted algorithm (Interests 30%, Skills 25%, Event Type 15%, Experience 10%, Location/Mode 10%, Activity Signals 10%) immediately generates personalized matches with zero downtime.
- **Transparent Reasoning ("Why We Recommend This"):**
  - No random opaque scores. Every recommendation breaks down skill alignment, experience fit, format preference, and activity correlation.
- **Realistic 32+ Tech Event Dataset:**
  - Spanning 10 technical domains: AI/ML, Web Development, Cloud Computing, Cybersecurity, DevOps, Data Science, Startups, Open Source, Blockchain, UI/UX.
  - Both Online, Offline (San Francisco, New York, London, Bengaluru, Berlin, Austin, Seattle, Tokyo), and Hybrid formats.
- **Interactive Multi-Step Onboarding Flow (`/onboarding`):**
  - 5-step wizard with real multi-stage AI scanning animation (`Analyzing profile → Matching interests → Evaluating events → Preparing recommendations`).
- **Comprehensive Discovery Page (`/discover`):**
  - Instant live keyword search (across titles, organizers, descriptions, technologies, and cities).
  - Multi-factor filters: Event Format, Category, Technology, Attendance Mode, Experience Level.
  - Sorting: Most Popular, AI Recommended, Soonest Date, Most Relevant.
  - Grid / List view toggle.
- **Dedicated Event Details (`/event/:id`):**
  - Agenda schedule timeline, speaker profiles, technology tags, location, and prototype digital pass registration modal with Google Calendar export.
- **Activity-Aware Personalization (`/saved` & `/profile`):**
  - Tracks bookmarked and viewed events in `localStorage`.
  - Profile editor dynamically affects recommendation scores and transparent explanations upon save.
- **Global Search Modal (`Ctrl+K` / `⌘K`):**
  - Instant search modal with keyboard navigation, recent searches, and domain shortcuts.
- **Linear × Vercel × Raycast Aesthetic:**
  - Charcoal surfaces (`#070A11`, `#0B0F17`, `#0F1523`), electric blue glow (`#3B82F6`), subtle purple accents, and responsive mobile bottom navigation.

---

## 🛠 Tech Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS v3, React Router v7, Lucide React
- **Backend / API:** Node.js, Express, dotenv, cors, Google Gemini 2.5 Flash API
- **State & Storage:** React Context API + LocalStorage persistence

---

## 🚀 Getting Started

### 1. Installation

```bash
# Clone or navigate into project directory
cd "Event Rec System"

# Install dependencies
npm install
```

### 2. Configure Environment (Optional for AI)

Edit `.env` in the root directory:

```env
# Add your Google Gemini API Key:
AI_API_KEY=your_gemini_api_key_here
AI_PROVIDER=gemini
PORT=3001
```

*(Note: If no API key is set, EventIQ automatically uses the local personalized recommendation engine seamlessly without errors).*

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 🗺 Application Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero, interactive preview, trending events, categories & workflow |
| `/discover` | Event discovery catalog with live search, filters, and sorting |
| `/recommendations` | AI recommendations page with match scores, transparent reasoning & regenerate |
| `/event/:id` | Event details page with timeline, speakers, and registration pass modal |
| `/saved` | Bookmarked events filtered by All, Upcoming, and Past |
| `/categories` | 10 technology domains with live event counters and direct links |
| `/profile` | Profile editor for interests, skills, experience, and activity stats |
| `/settings` | AI status diagnostics, appearance, notification toggles, and data export |
| `/onboarding` | 5-step onboarding wizard with staged AI loading sequence |

---

## 🧠 Recommendation Scoring Formula (Fallback Engine)

$$\text{Score} = \text{Interests}(30\%) + \text{Skills}(25\%) + \text{Type}(15\%) + \text{Experience}(10\%) + \text{Mode/Location}(10\%) + \text{User Activity}(10\%)$$

Scores are normalized between 50% and 99% with deterministic human-readable explanations.

---

## 🔒 Security & Secret Management

- **Zero Client-Side Exposure:** No API keys, credentials, or secrets are bundled into client-side JavaScript or prefixed with `VITE_`. All AI API interactions are proxied server-side via `server.js` or Vite backend middleware.
- **Header-Based Authentication:** Outgoing AI API requests transmit credentials via secure HTTP headers (`x-goog-api-key` / `Authorization`) rather than URL query parameters, preventing leakages in access logs and proxy metrics.
- **Sanitized Logging & Responses:** Error handlers and API responses never output raw upstream error objects, tokens, or endpoints.
- **Environment Isolation:** Local `.env` files are excluded from Git via `.gitignore`. Reference parameters are documented in `.env.example`.

> ⚠️ **CRITICAL GIT HISTORY WARNING:**  
> If any API key, password, or secret was previously hardcoded or committed to git in past revisions or during local testing, **that old value remains in Git commit history**. You must **ROTATE any previously used secrets immediately** in your cloud provider console (e.g., Google Cloud / AI Studio, OpenAI, Supabase, AWS) before pushing or deploying to a public repository or production environment.
