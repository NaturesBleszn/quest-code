<div align="center">

# ⚔️ QUEST CODE

### A gamified coding learning platform — battle, learn, and level up your skills.

[![GitHub issues](https://img.shields.io/github/issues/NaturesBleszn/quest-code)](https://github.com/NaturesBleszn/quest-code/issues)
[![Last commit](https://img.shields.io/github/last-commit/NaturesBleszn/quest-code)](https://github.com/NaturesBleszn/quest-code/commits/main)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev)
[![Notion Tracker](https://img.shields.io/badge/Notion-Feature%20Tracker-black?logo=notion)](https://notion.so)

</div>

## 🗺️ Pages

| Route | Page | Description |
|---|---|---|
| `/` | Dashboard | XP stats, streak, quick actions |
| `/learn` | Quest Learn | Structured coding lessons |
| `/range` | Code Range | Sandbox code editor |
| `/battle` | Quest Battle | 1v1 real-time coding duels (Socket.IO) |
| `/pouch` | Code Pouch | Personal project portfolio |
| `/snippets` | Quest Snippets | Reusable code snippets |
| `/prompts` | Quest Prompts | AI prompt library |
| `/quiz` | Quest Quiz | Knowledge check quizzes |
| `/articles` | Article Quest | Tech article reader |

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Real-time**: Socket.IO (Quest Battle)
- **AI**: Google Gemini (`@google/genai`)
- **Routing**: React Router v7
- **Icons**: Lucide React

## 🚀 Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in your GEMINI_API_KEY in .env.local
npm run dev
```

## 🔗 Integrations

- **Notion**: Feature Tracker database — tracks all quests, status, and GitHub Issue links
- **GitHub Issues**: Dev quests linked to Notion rows for full project visibility

## 📋 Environment Variables

See [.env.example](.env.example) for all required variables.

---

Built with ⚔️ by [NaturesBleszn](https://github.com/NaturesBleszn)
