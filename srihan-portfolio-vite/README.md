# Srihan Portfolio — Vite + React + Tailwind

Deploy easily on **Netlify** or **GitHub Pages**.

## Local dev
```bash
npm install
npm run dev
# open http://localhost:5173
```

## Build
```bash
npm run build
npm run preview
```

## Deploy to Netlify
- Create a new site from GitHub, select this repo.
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

## Deploy to GitHub Pages
- (Optional) Add `"homepage": "https://<your-username>.github.io/<repo-name>/"` to `package.json` for absolute asset paths.
- Build: `npm run build`
- Publish the `dist/` folder to GitHub Pages (gh-pages branch or Pages from `dist/`).

## Edit content
- `src/App.tsx`: update `INFO`, `PROJECTS`, etc.
- Replace `public/resume.pdf` with your resume (Resume button points to `/resume.pdf`).
