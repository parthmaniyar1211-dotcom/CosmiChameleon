# CosmiChameleon 🦎

> **Technology That Adapts. Ideas That Evolve.**

An immersive 3D technology portfolio and product showcase built for **CosmiChameleon** — an engineering studio crafting intelligent software, production AI systems, autonomous agents, and adaptive digital experiences.

🌐 **Live Website**: [https://parthmaniyar1211-dotcom.github.io/CosmiChameleon/](https://parthmaniyar1211-dotcom.github.io/CosmiChameleon/)

---

## 🌟 Overview

CosmiChameleon is designed around an interactive, living 3D centerpiece — **The Core** — which morphs, pulses, adapts, and reacts dynamically to user scrolling, cursor coordinates, and navigation state.

Unlike conventional agency websites, this project demonstrates real-time 3D capability, robust performance tiering, responsive interaction, and production-grade software engineering.

---

## 🚀 Featured Products & Production Systems

| Product | Description | Category | Live URL |
|---|---|---|---|
| **ShieldScope** | Real-time AI content moderation and brand safety intelligence engine analyzing toxic content, spam, and visual violations in <50ms. | AI & Safety | [shieldscope.netlify.app](https://shieldscope.netlify.app/) |
| **MailX** | Multi-provider cold email deliverability infrastructure featuring AI inbox warm-up, DNS health scoring, and smart sequence scheduling. | Systems & SaaS | [mailx-mu.vercel.app](https://mailx-mu.vercel.app/) |
| **Voice Agent** | Autonomous real-time conversational voice intelligence with low-latency bidirectional audio streaming and live call steering. | Voice AI | [voice-agent-lac-ten.vercel.app](https://voice-agent-lac-ten.vercel.app/login) |
| **SKRT** | Modern, high-performance digital commerce platform with instantaneous search, fluid cart mechanics, and headless integration. | E-Commerce | [skrt.company](https://www.skrt.company/) |

---

## 🛠️ Architecture & Tech Stack

### Core Technologies
- **React 19** + **TypeScript** — Modern, component-driven UI architecture
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — Hardware-accelerated 3D scene rendering
- **@react-three/postprocessing** — Cinematic bloom, vignette, noise, and chromatic aberration
- **Tailwind CSS** — Custom design system with glassmorphic surfaces, dynamic glow accents, and responsive layout
- **Vite** — High-speed build tooling and hot module replacement

### 3D Creative Engineering
- **Single Persistent Canvas (`SharedCanvas`)**: One global WebGL context sits fixed in the background while DOM layers glide over it, completely eliminating multi-canvas memory overhead and context switching.
- **Dynamic State Engine (`SceneController`)**: Linearly interpolates geometry, rotation, color palette, wireframe density, and camera position between 8 distinct narrative phases based on viewport scroll position.
- **Adaptive Performance Tiering (`useWebGLTier`)**: Detects GPU capabilities and frame-rate stability:
  - High-tier devices: Full dynamic bloom, chromatic aberration, 1500+ particle field, dynamic lighting.
  - Low-tier or mobile devices: Automatically falls back to optimized materials and streamlined particle systems.
- **Experience Mode Switcher**: Visitors can effortlessly toggle between the full **3D Immersive** experience and a streamlined **Standard Experience** with accessible motion settings.

---

## 💻 Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# Clone repository
git clone https://github.com/officialpm/CosmiChameleon.git

# Navigate into directory
cd CosmiChameleon

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
CosmChameleon/
├── public/                # Static assets, SVG icons, and favicons
├── src/
│   ├── assets/            # Static imagery and branding
│   ├── components/
│   │   ├── sections/      # Hero, About, Services, Products, Work, Process, Tech, Contact, Footer
│   │   ├── three/         # 3D Core, SharedCanvas, SceneController, Lights, Environment
│   │   └── ui/            # Navigation, ExperienceToggle, Modal, Form components
│   ├── content/           # Structured content data (products, work, principles, services, tech)
│   ├── hooks/             # useMousePosition, useReducedMotion, useScrollProgress, useWebGLTier
│   ├── App.tsx            # Main application shell and layout
│   ├── index.css          # Tailwind base directives and custom keyframe animations
│   └── main.tsx           # Application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License

Copyright © 2026 CosmiChameleon. All rights reserved.
