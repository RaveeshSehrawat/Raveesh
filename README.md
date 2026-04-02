# 🖥️ Portfolio OS — Setup Guide

A personal portfolio website styled as a desktop OS, built with **Next.js 14 + TypeScript**.

## 🚀 Quick Start

```bash
# 1. Navigate to the project
cd portfolio-os

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

## 📁 Project Structure

```
portfolio-os/
├── src/
│   ├── app/
│   │   ├── globals.css       ← All OS styles (blue/white theme)
│   │   ├── layout.tsx        ← Root layout
│   │   └── page.tsx          ← Desktop / main orchestrator
│   └── components/
│       ├── OSWindow.tsx      ← Draggable window component
│       ├── Taskbar.tsx       ← Bottom taskbar + clock
│       ├── BootScreen.tsx    ← Animated boot sequence
│       ├── AboutWindow.tsx   ← "About Me" window
│       ├── SkillsWindow.tsx  ← Skills with progress bars
│       ├── ProjectsWindow.tsx← Project cards
│       ├── ContactWindow.tsx ← Contact links
│       └── TerminalWindow.tsx← Interactive terminal
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## ✨ Features

- **Boot Screen** — animated startup sequence with log lines
- **Draggable Windows** — click & drag any window by the title bar
- **Window Management** — z-index focus, open/close, taskbar tracking
- **Terminal** — interactive, supports: `help`, `whoami`, `skills`, `projects`, `contact`, `date`, `clear`
- **Skills Sidebar** — 4 categories with animated progress bars
- **Project Cards** — hover effects, status badges, tech tags
- **Live Clock** — taskbar clock updates every second
- **Desktop Icons** — click to open windows

## 🎨 Customization

Edit these files to personalize:
- `AboutWindow.tsx` — your bio, name, location
- `SkillsWindow.tsx` — your skill categories & levels
- `ProjectsWindow.tsx` — your projects list
- `ContactWindow.tsx` — your email, GitHub, LinkedIn
- `TerminalWindow.tsx` — terminal command responses
- `globals.css` — colors via CSS variables at `:root`

## 🔧 Build for Production

```bash
npm run build
npm start
```
