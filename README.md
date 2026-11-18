# GymBuddy AI ⚡🏋️
> **Intelligent Self-Training & Gym Floor Companion**  
> *Inspired by cult.fit's DIY self-training UX, upgraded with a data science analytics engine, dual-phase biomechanical form guides, and an interactive AI gym coach.*

---

## 🌟 Overview

**GymBuddy AI** is a modern, high-contrast, dark-mode web application built for serious lifters, gym floor athletes, and self-trainers. Designed to operate **100% offline inside basement gyms** with zero cellular reception, it combines biomechanical muscle balance, real-time machine bottleneck swapping, voice-assisted rest timers, dual-lifter partner sync, and progressive overload analytics.

---

## 🚀 Key Modules & Features

### 1. 🧬 Fast 5-Step Athlete Calibration Modal
- **Biometrics & Energy:** Age, Biological Sex, Height (cm), Weight (kg) with real-time auto-calculation of **Basal Metabolic Rate (BMR)** via the Mifflin-St Jeor equation and **Active TDEE**.
- **Goal Specificity:** Hypertrophy (+300 kcal lean bulk), Strength & Power, Fat Loss / Recomp (-450 kcal deficit), or General Conditioning.
- **Strength Calibration:** Beginner, Intermediate, or Advanced + optional baseline working weights (Bench Press, Back Squat, Lat Pulldown) to calculate floor starting weights.
- **Floor Equipment & Schedule:** 3–6 days/week, 30/45/60/75m duration caps, and gear profiles (*Full Commercial Gym*, *Dumbbells + Bench*, *Cables + Machines*, *Bodyweight + Bands*).
- **Joint Safeguards:** Multi-select injury filters (*Shoulder Impingement*, *Lower Back Sensitivity*, *Knee Pain*, *None*) that automatically swap out high-shear movements.

---

### 2. 🗺️ Interactive Anatomical Body-Map & Resistance Balancer
- **Dual-View Vector SVG Anatomy (Front & Back):** Direct interactive selection of target muscle groups (Chest, Delts, Biceps, Triceps, Lats, Upper Back, Abs, Quads, Hamstrings, Glutes, Calves).
- **Biomechanical Preset Splits:** Instant selection of Push, Pull, Legs, Upper, Lower, Arm Specialization, and Full Body routines.
- **Resistance-Profile Balancer:** Automatically matches **lengthened-position movements** (e.g., Incline DB Curl, Overhead Cable Tricep Extension) with **shortened-position movements** (e.g., Preacher Curl, Rope Pushdown) for complete mechanical hypertrophy.

---

### 3. 🛡️ Dual-Phase Visual Form Guides & 1-Tap Bottleneck Swapper
- **42+ Staple Gym Movements:** Comprehensive database across all primary and synergist muscle groups.
- **Dual-Phase SVG Biomechanics:** Toggleable vector illustrations displaying **Phase 1: Starting Position / Deep Stretch** vs. **Phase 2: Peak Execution / Contraction**, labeled joint angles (`45° Elbow Tuck`, `90° Parallel Knee Angle`), bar path arrows, and glowing target muscles in `#FF5A36`.
- **Execution Checklist:** 3 crisp form cues + 1 highlighted "Common Mistake to Avoid" warning badge.
- **1-Tap Equipment Bottleneck Swapper:** "Swap (Machine Busy)" dropdown on every exercise card to instantly replace occupied gym equipment with biomechanically equivalent alternatives without losing hypertrophy stimulus.

---

### 4. ⏱️ Live Gym Floor Companion, Voice Cues & Partner Sync
- **Distraction-Free Floor Mode:** 5-minute dynamic warm-up protocol & CNS ramp-up sets (50% and 75% warmups).
- **Set, Load & RPE Logger:** Auto-suggests progressive overload targets (+2.5kg or +1 rep), RPE (6–10) tracker, and 1-tap set completion.
- **Smart Auto-Rest Timer + Web Speech Voice Coach:** Circular countdown (150–180s compound, 60–90s isolation) with +/- 30s adjustment. When rest expires, `window.speechSynthesis` announces rest completion and cues the next exercise name and top form cue aloud.
- **Gym Partner Sync Mode:** Side-by-side logging for two athletes (User + Gym Buddy) with a live head-to-head session tonnage comparison bar.
- **Post-Workout PR & Share Card:** Generates a downloadable dark-mode summary card displaying total tonnage moved (kg), duration, new estimated 1RM PRs, and a muscle activation heatmap.

---

### 5. 🤖 Context-Aware AI Coach & Routine Architect
- **1-Click Weekly Split Architect:** Reads athlete biometrics and generates a personalized multi-day periodized split.
- **Mid-Workout Dynamic Modifiers:** 1-tap action chips:
  - *"Shoulder feels tight — modify Push"*
  - *"Only have 30 mins — convert to supersets"*
  - *"Focus on upper chest & side delts"*
  - *"Low energy today — reduce volume, maintain intensity"*
- **Deterministic + Gemini LLM Hybrid:** Runs offline via a rule-based biomechanics engine, or optionally connects to the Google Gemini API when an API key is provided in settings.

---

### 6. 📊 Data Science Analytics, Recovery & Plateau Engine
- **Weekly MEV / MAV / MRV Volume Heatmap:** Tracks weekly hard sets per muscle group against Dr. Mike Israetel’s volume landmarks (Blue = Under MEV, Emerald = Optimal MAV, Coral = Approaching MRV / Junk Volume).
- **48–72 Hour Recovery Readiness:** Calculates cellular recovery percentages based on elapsed hours and session intensity, highlighting the **"Recommended Workout Today"** badge.
- **Plateau Predictor (Recharts):** Tracks Estimated 1RM ($Weight \times (1 + Reps/30)$) over weeks; flags stalls across 3 consecutive sessions at RPE $\ge 9.5$ and issues deload recommendations.
- **High-Protein Fuel & Supplement Timing Planner:** Tailored to Vegetarian, Eggetarian, Non-Veg, and Vegan lifters (featuring paneer, soya chunks, whey isolate, Greek yogurt, lentils, whole eggs, and chicken breast) with an automated Pre-Workout vs. Post-Workout nutrient timing protocol.

---

## 🛠️ Tech Stack & Design System

| Technology | Role |
| :--- | :--- |
| **React 18** | UI component architecture & reactive state |
| **Vite 5** | High-performance bundler and dev server |
| **Tailwind CSS 3.4** | Custom athletic dark-mode design system |
| **Recharts** | Progressive overload & e1RM trend visualizations |
| **Lucide React** | Clean athletic icon suite |
| **Web Speech API** | Hands-free audio coaching for floor sets |
| **LocalStorage** | 100% offline-first persistent storage |

### Palette:
- **Background:** `#0B0F17` (Pitch Black Slate)
- **Cards / Surfaces:** `#131A26` & `#1C2536`
- **Primary Accent:** `#00E5A8` (Electric Emerald)
- **Muscle Activation:** `#FF5A36` (Coral / Amber)
- **Secondary:** `#38BDF8` (Cyan) & `#FACC15` (Gold)

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Niranjan-343/gymbuddy-basic.git

# Enter project directory
cd gymbuddy-basic

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Instant Demo Preview
Click the **"Load Sample Data"** button in the top navigation bar at any time to pre-fill 4 weeks of historical workouts, estimated 1RM progression charts, recovery landmarks, and PR cards.

---

## 🔒 Offline & Privacy Architecture
- All workout history, PRs, and profile data remain stored **exclusively in your browser's `localStorage`**.
- No account registration or external cloud server is required.
- If you choose to enter an optional Google Gemini API key in settings, it is stored only in local storage and called directly from your client.

---

## 📄 License
MIT License. Built for lifters and self-trainers everywhere.
