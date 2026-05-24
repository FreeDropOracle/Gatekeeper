# GateKeeper — Digital Life Management Platform

> **"Control your digital chaos. Organize your world in one place."**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Cloud_Firestore-FFCA28?logo=firebase)](https://firebase.google.com/)

---

## 🎯 Overview

**GateKeeper** is not just a bookmark manager — it is a **Digital Headquarters** designed to transform personal data management from a tedious chore into an enjoyable, integrated experience.

In the age of information overload, users suffer from **Digital Fragmentation** — links, tools, and resources scattered across browsers, note-taking apps, and cloud drives. GateKeeper solves this by merging **organization, tracking, and motivation** into a single, visually cohesive, futuristic interface.

---

## ✨ Core Features

### 🔗 1. Centralization
- **Smart Link Grid**: An elegant, card-based layout for categorized links with Glassmorphism styling.
- **Quick Add FAB**: Floating Action Button enabling link addition in under 3 seconds.
- **Instant Filtering**: Real-time link filtering via the dynamic sidebar.

### 🎨 2. Dynamism
- **Category Manager**: Create, rename, delete, reorder, and customize icons/colors for your categories.
- **Flexible Structure**: The app adapts to the user's mental model, not the other way around.

### 📊 3. Real-Time Tracking
- **Progress Widgets**: Interactive bars for tracking courses, goals, and personal habits.
- **Crypto Market Ticker**: Live price strip powered by the CoinGecko API.

### 🏆 4. Gamification
- **Badge System**: Rewards for achievements (first link, 50 links, 10 learning hours, etc.).
- **Hall of Fame**: Visual gallery of unlocked and locked badges with personal statistics.
- **Streak Counter**: Daily tracking of platform engagement and link additions.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Role |
|------------|------|
| **Next.js 14** (App Router) | Framework — Superior performance, SEO-friendly, optimal route splitting |
| **TypeScript** | Language — Type safety that reduces runtime errors in complex state |
| **Tailwind CSS** | Styling — Rapid Glassmorphism implementation with built-in dark mode |
| **Zustand / Jotai** | State Management — Lightweight global state for auth, categories, and UI preferences |

### Backend & Infrastructure
| Technology | Role |
|------------|------|
| **Firebase Authentication** | Identity — Secure Google OAuth with minimal boilerplate |
| **Cloud Firestore** | Database — Real-time NoSQL sync for categories, links, progress, and badges; offline support included |
| **CoinGecko API** | Market Data — Free, reliable crypto prices without API keys for basic tiers |

---

## 🎨 Design System (The Neon-Glass Aesthetic)

### Visual Identity
A deep dark theme with neon accent colors that evoke the feeling of a **"futuristic operating system"**.

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `dark-bg` | `#0a0a14` | Primary background (deep void) |
| `primary-text` | `#E0FCFF` | Headlines, active labels (icy white, easier on eyes than pure #FFF) |
| `secondary-text` | `#94A3B8` | Descriptions, metadata, inactive sidebar items (Slate Blue) |
| `accent-neon` | `#00F0FF` | Interactive elements, active states, progress percentages, crypto gains (Cyan Neon) |
| `muted-text` | `#64748B` | Placeholders, footers, disabled states |
| `glass-border` | `rgba(0, 240, 255, 0.1)` | Card borders for depth |
| `glass-bg` | `rgba(255, 255, 255, 0.03)` | Card backgrounds with blur |

### Glass Card Primitive
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 16px;
}
```

### Background Layer
- Subtle radial glows at `opacity: 0.03–0.05`.
- Faint geometric cyan lines (`rgba(0, 240, 255, 0.05)`) creating a "cyber-whisper" effect.
- No solid gradients; depth is achieved through layered transparency.

---

## 🗺️ Route Map

```
/              → The Gateway (Landing + Auth)
                 Google OAuth authentication + animated welcome screen reflecting the brand identity

/dashboard     → The Command Center (Daily operational interface)
                 Dynamic Sidebar + Smart Link Grid + Tracking Widgets (Progress + Crypto Ticker) + Quick Add FAB

/settings      → The Architect Studio (Workspace structure management)
                 Category Manager (CRUD) + Profile Settings + Danger Zone (export / delete)

/achievements  → The Hall of Fame (Psychological reinforcement)
                 Badge gallery (locked/unlocked) + Statistics cards + Shareable achievement cards
```

---

## 🗄️ Data Model (Firestore Collections)

```
/users/{userId}
  ├── displayName: string
  ├── email: string
  ├── photoURL: string
  ├── preferences: { reducedMotion: boolean, defaultView: string }
  └── createdAt: timestamp

/users/{userId}/categories/{categoryId}
  ├── name: string
  ├── icon: string (emoji or lucide name)
  ├── colorTag: string (hex)
  ├── orderIndex: number
  └── createdAt: timestamp

/users/{userId}/links/{linkId}
  ├── url: string
  ├── title: string
  ├── description: string
  ├── categoryId: ref
  ├── favicon: string
  ├── clickCount: number
  └── createdAt: timestamp

/users/{userId}/progress/{progressId}
  ├── title: string (e.g., "React Advanced Course")
  ├── currentValue: number
  ├── targetValue: number
  ├── unit: string (e.g., "%", "hours", "chapters")
  ├── categoryId: ref (optional)
  └── updatedAt: timestamp

/users/{userId}/achievements/{achievementId}
  ├── badgeId: string (static catalog reference)
  ├── unlockedAt: timestamp
  └── progressSnapshot: map
```

---

## 🎮 Gamification System

### Badge Catalog
| Badge ID | Name | Unlock Condition | Rarity |
|----------|------|------------------|--------|
| `first_link` | Gate Opened | Save your first link | Common |
| `collector_50` | Digital Hoarder | Save 50 links | Uncommon |
| `architect` | World Builder | Create 5 custom categories | Uncommon |
| `learner_10h` | Deep Diver | Log 10 hours of progress | Rare |
| `crypto_watcher` | Market Hawk | Check crypto widget 7 days in a row | Rare |
| `master_500` | The Librarian | Save 500 links | Legendary |

### Mechanics
- **Progressive Disclosure**: Locked badges appear as silhouettes; unlocked ones reveal with a neon glow + subtle confetti animation.
- **Streak Counter**: Daily login and link-addition streaks.
- **Social Proof**: Optional shareable image generation for unlocked rare+ badges.

---

## 🚀 Phased Rollout Plan

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1: MVP** | Weeks 1–6 | Auth, Dashboard, Link CRUD, Basic Categories, Firestore schema |
| **Phase 2: Core Experience** | Weeks 7–10 | Widgets (Progress + Crypto), Badge system, Settings studio, Glassmorphism polish |
| **Phase 3: Optimization** | Weeks 11–13 | E2E tests, performance audit (Lighthouse 90+), a11y audit, onboarding flow, beta launch |
| **Phase 4: Scale** | Post-launch | Social sharing, AI recommendations, Tasks module (`/tasks`), mobile PWA |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Universal search |
| `Ctrl/Cmd + N` | Add new link |
| `Ctrl/Cmd + B` | Toggle sidebar |
| `Esc` | Close modal / clear selection |

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/gatekeeper.git
cd gatekeeper

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env.local file and add:
# NEXT_PUBLIC_FIREBASE_API_KEY=...
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
# NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
# NEXT_PUBLIC_FIREBASE_APP_ID=...
# COINGECKO_API_URL=https://api.coingecko.com/api/v3

# 4. Run the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 📊 Success Metrics (KPIs)

| Metric | Target |
|--------|--------|
| **Time-to-First-Link** | < 10 seconds |
| **Daily Active Links Added** | 3+ per active user |
| **Category Customization Rate** | > 60% of users create a custom category |
| **Widget Engagement** | > 40% of DAUs interact with a widget |
| **Retention (D30)** | > 25% |
| **Performance (Lighthouse)** | > 90 across all categories |

---

## 🔒 Accessibility (a11y)

- **WCAG 2.1 AA Compliance**: Minimum contrast ratio of 4.5:1 for all body text.
- **`prefers-reduced-motion`**: Supported for all animations and glow effects.
- **Keyboard Navigation**: Full keyboard accessibility across all routes and components.

---

## 🔮 Future Scalability Roadmap

1. **Social System**: Share "educational link collections" with other users.
2. **AI Assistant**: Smart recommendations for links and learning resources based on user categories.
3. **Task Management**: A `/tasks` route for integrated daily to-do management within the Command Center.
4. **PWA**: Full mobile support as a Progressive Web App.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <p><strong style="color: #00F0FF;">GateKeeper</strong></p>
  <p style="color: #94A3B8;">Control your digital chaos. Organize your world in one place.</p>
</div>
