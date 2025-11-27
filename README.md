# HaiIntel Chat Companion — README

## Overview
This project implements **Option A** of the **HaiIntel UI Developer Challenge**:  
a **floating AI chat companion interface** built to match HaiIntel’s brand aesthetic — dark, minimal, and intelligent.

The widget integrates seamlessly into a modern web layout and provides a realistic chat experience with streaming responses, typing animations, and session persistence.

Deployed on Vercel:  
**https://hiaiintel-chat-widget.vercel.app/**

---

## Features

### Floating Launcher & Responsive Chat Window
- Minimal round floating launcher button  
- Animated expand/collapse  
- Smooth transitions using **Framer Motion**  
- Auto-scrolling with controlled viewport motion

### Brand-Aligned UI
- Dark, elegant visual theme inspired by HaiIntel.com  
- Minimalistic structure, purposeful spacing  
- Clean typography and decluttered layout

### Conversational Experience
- User and AI message bubbles  
- Character-by-character **streaming text effect**  
- Typing indicator animation  
- Follow-up suggestion chips  
- Session state persistence (React + localStorage)

### Simulated AI Behavior
- Static JSON-based AI responses  
- Content inspired by the real HaiIntel site  
- Fully client-side, no backend required

### Tech Stack
- **Next.js (App Router)**
- **React 18**
- **Tailwind CSS**
- **Framer Motion**
- **TypeScript**
- **Vercel** Deployment

---

## Project Structure

```
|
├── app/
│ ├── components/
│ │ ├── ChatWidget/
│ │ │ ├── ChatWindow.tsx
│ │ │ ├── ChatLauncher.tsx
│ │ │ ├── MessageBubble.tsx
│ │ │ └── SuggestionChips.tsx
│ ├── globals.css
│ ├── page.tsx
├── public/
├── utils/
│ └── responses.json
├── hooks/
│ ├── useChatSession.ts
│ ├── useLockBodyScroll.ts
├── package.json
└── README.md
```

---

## Development Workflow

### Install Dependencies
```bash
npm install

// Run Locally
npm run dev

// Build
npm run build
```

### Deploy

- Linked repo to Vercel
- Deployed via Vercel Dashboard
- Zero backend configuration required

## AI-Assisted Development Process

### Claude Sonnet 4.5
Used extensively for:
- Initial component scaffolding
- Message streaming logic
- Animation patterns and UI behavior ideas
- Structural improvements and refactor suggestions

### VS Code + GitHub Copilot

Used for:
- Real-time code completion
- TypeScript fixes
- Tailwind utility generation
- Minor refactors and logic simplifications
- Manual Design & Verification
- Git commits

### All UI/UX decisions were human-led:
- Finetuned animations
- Polished spacing and transitions
- Ensured responsiveness across breakpoints
- Verified scroll behavior, overflow handling, and session restoration
- Aligned visuals to HaiIntel’s dark minimal brand feel
- Validation Process


##### Every AI-generated block was:
- Reviewed for correctness
- Refined manually
- Tested locally
- Re-verified on Vercel preview builds

### Key Implementation Notes

- Auto-scroll triggers when new messages are added
- Streaming animation uses interval-driven slicing
- Unique message IDs ensure stable React rendering
- Framer Motion handles scale, opacity, and 3D rotate effects
- Body scroll prevented during chat window open
- Session restored automatically via localStorage hydration

### Limitations & Future Enhancements

- Integrate real AI responses via backend or API
- Better history persistence using IndexedDB
- Multi-theme support (light / contrast / system)
- Add analytics for widget usage
- Convert to embeddable npm package

### License

This project is submitted for the HaiIntel UI Developer Challenge and intended solely for evaluation purposes.