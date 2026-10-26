# Math Helper

**Snap a photo of your math homework and get every answer with a clear, step-by-step explanation — then keep learning with lessons and quizzes.**

**Live demo:** https://mathelper-theta.vercel.app

Built with **React Native + Expo SDK 54** and **Expo Router**, running on iOS, Android and the web from one codebase.

## Features

- **AI homework scanner** — take or upload a photo; Google Gemini reads every question (printed or handwritten) and returns the answer, a numbered step-by-step breakdown, a check of the answer and the key concepts used. Save any solution to revisit later.
- **Learn** — 29 courses and 113 lessons from Foundations (K–5) through Middle School, High School and College (calculus, linear algebra, differential equations, statistics). Every lesson has key ideas, formulas, worked examples, common mistakes and practice problems.
- **Quiz** — 34 short quizzes (179 questions) at Easy, Medium and Hard levels, plus Mental Math Sprints that generate new questions every attempt. Questions and answers are shuffled each time, and the results screen explains every answer.
- **Progress** — saved problems, quiz history and theme (light / dark / system) stored on the device.

## Tech stack

| Area | Tools |
| --- | --- |
| App | React Native 0.81, Expo SDK 54, Expo Router 6, TypeScript |
| AI | Google Gemini API (vision + structured JSON output), called from a server-only API route |
| Device | expo-image-picker (camera / gallery), expo-image-manipulator (resize before upload), AsyncStorage |
| Hosting | Vercel (via `expo-server`'s Vercel adapter) |

**Security:** the Gemini API key lives only on the server (`src/app/api/scan+api.ts`) and is never bundled into the app.
The hosted demo can be locked with a password by setting `DEMO_PASSWORD`.

## Run it locally

```bash
npm install
cp .env.example .env      # then add your Gemini API key to .env
npx expo start            # press w for web, or scan the QR code with Expo Go
```

Get a Gemini API key at https://aistudio.google.com/apikey. Never commit `.env`.

## Deploy to Vercel

The repo includes `vercel.json` and `api/index.ts`, so importing it into Vercel works out of the box.
In the Vercel project settings, add these environment variables:

| Name | Required | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes | Server-side key for photo scanning |
| `GEMINI_MODEL` | No | Defaults to `gemini-3.5-flash` |
| `DEMO_PASSWORD` | No | If set, visitors must enter this password |

## Project structure

```
api/index.ts      Vercel entry point (serves the app + API routes, optional demo password)
src/
  app/            Screens (Expo Router) and the /api/scan server route
  components/     Reusable UI (photo widget, scan results, quiz cards…)
  context/        On-device store (saved problems, quiz history, theme)
  data/learn/     Course and lesson content
  data/quizzes/   Quiz content and generators
  lib/            Scan API client and helpers
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npx expo start` | Start the dev server |
| `npx tsc --noEmit` | Type-check |
| `npx expo lint` | Lint |
| `npx expo-doctor` | Check dependencies and config |
