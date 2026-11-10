# Srihari — Portfolio (React + Vite + Tailwind + GSAP)

## Run
    npm install
    npm run dev

## Make it yours
- `src/config/site.js` — name, intro, skills, services, projects, links
- `src/assets/projects/` — project screenshots (import them in `Project.jsx`)
- `src/assets/hero_assets/` — hero photo (for the particle portrait, coming next)
- `src/components/ParticleFace.jsx` — hero particles; portrait goes here
- `src/components/Ricochet.jsx` — pong game that breaks the HELLO WORLD letters (edit WORDS at the top)
- `src/components/ContactBg.jsx` — animated contact background (swap for a real mp4 if you have one)
- `src/components/Intro.jsx` — opening animation (name letters bounce in, turn into PORTFOLIO)
- `src/lib/motion.js` — GSAP + ScrollTrigger setup and helpers

## Deploy
    npm run build   # outputs dist/ — upload to Vercel or Netlify
