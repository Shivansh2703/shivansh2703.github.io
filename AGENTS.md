<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio site

Personal portfolio (robotics / low-latency systems). Next.js 16 App Router · TypeScript ·
Tailwind v4 · Framer Motion · Shiki. **Static-exported** to GitHub Pages; auto-deploys on push
to `main` — everything must survive `next build` static export (no server-only features).

## Commands

```bash
npm ci          # install (Node 20+)
npm run dev     # local dev at http://localhost:3000
npm run build   # static export to ./out — run before declaring done
npm run lint    # eslint
```

## Conventions

- **Content is data-driven**: all copy/projects live in `content/`; pages iterate over it.
  Adding or editing content should never require touching layout or page code.
- Tailwind v4 — config conventions differ from v3; check existing usage before styling.
- Parked ideas go in `PARKINGLOT.md`.

## Judgment rules

- Unclear requirement → ask; never run with a silent assumption. Flag any assumption you make.
- Prefer the simplest solution that works; complexity needs justification.
- Only modify code the task requires. No drive-by refactors of unrelated code.
- A change isn't done until `npm run build` and `npm run lint` pass.
