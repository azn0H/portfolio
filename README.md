# Alex Morgan — Portfolio

A modern, premium personal portfolio website built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Dark / Light mode** toggle with smooth transition
- **Glassmorphism** navbar with active section highlighting
- **Framer Motion** animations — entrance, scroll-reveal, hover
- **Responsive** mobile-first layout (1 → 2 → 3 column grid)
- **Contact form** with client-side validation
- **Custom scrollbar** and noise texture overlay
- **Floating badge** hero illustration with animated rings
- **Project filter** pills (All / Featured / by tech)

## 🗂 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── ProjectCard.jsx
│   └── Contact.jsx
├── data/
│   └── projects.js       ← Edit your projects & skills here
├── hooks/
│   └── useActiveSection.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 🏗 Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customisation

1. **Personal info** – update `src/components/Hero.jsx` (name, title, bio, links)
2. **About bio & stats** – edit `src/components/About.jsx`
3. **Projects** – edit `src/data/projects.js`
4. **Skills** – edit `src/data/projects.js` → `skills` array
5. **Colors** – adjust CSS variables in `src/index.css` and `tailwind.config.js`

## 🛠 Tech Stack

- [React 18](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS v3](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev)
- [Syne + DM Sans + JetBrains Mono](https://fonts.google.com) (Google Fonts)
