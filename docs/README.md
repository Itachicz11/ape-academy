# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Ape Academy 🦍

A mobile-first PWA for learning options trading with a WSB-flavored personality. Duolingo-style lessons that take you from smooth brain to wrinkled.

## Features

- **12 Interactive Lessons** covering options basics, Greeks, and strategies
- **36 Quiz Questions** with detailed explanations
- **Progress Tracking** with XP and degeneracy levels
- **Mobile-First Design** optimized for phone usage
- **PWA Ready** for home screen installation
- **Dark Mode** default (like trading at 3am)

## Lessons

### 📚 Basics
1. WTF is an Option?
2. Calls: Going Long
3. Puts: Betting Against

### 🔢 The Greeks
4. Delta Δ
5. Theta Θ
6. Gamma Γ & Vega V

### 🎯 Strategies
7. Covered Calls
8. Cash Secured Puts
9. Vertical Spreads
10. Iron Condor
11. Straddles & Strangles
12. The Wheel Strategy

## Tech Stack

- **React** (via Vite)
- **No external UI libraries** — pure React + inline styles
- **Vercel** for hosting

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.

## Project Structure

```
ape-academy/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    └── App.jsx
```

## License

MIT