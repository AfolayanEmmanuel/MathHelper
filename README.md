# Math Helper

A math-focused homework helper built with **React Native + Expo SDK 54** and **Expo Router**.

- **Dashboard** — snap or upload a photo of homework; AI (Google Gemini) reads every question and returns the answer with a full step-by-step breakdown. Save any solution for later.
- **Learn** — 29 courses / 113 lessons from Foundations (K–5) to College (calculus, linear algebra, differential equations…), each with key ideas, formulas, worked examples, common mistakes and practice problems.
- **Quiz** — 34 short quizzes (Easy / Medium / Hard) plus Mental Math Sprints that generate new questions every attempt. Results show every correct answer with an explanation.
- **Saved** and **Settings** — saved solutions, quiz history and theme, stored on the device.

## Getting started

```bash
npm install
cp .env.example .env      # then add your Gemini API key to .env
npx expo start            # press w for web, or scan the QR code with Expo Go
```

Get a Gemini API key at https://aistudio.google.com/apikey. The key is only read by the server route
`src/app/api/scan+api.ts` and is never bundled into the app. Never commit `.env`.

## Project structure

```
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
