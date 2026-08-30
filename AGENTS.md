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

## Check

```bash
npm run build        # static export to ./out
npm run lint          # eslint
npx tsc --noEmit      # typecheck
npm run check:links   # broken internal links + required files, against ./out
```

No test framework — it's a static site, there's nothing to unit-test. `check:links`
(`scripts/check-links.mjs`, zero dependencies) walks every `.html` file the build produced
and fails if any internal `href`/`src` points at a file that doesn't exist, or if
`index.html`/`404.html` are missing. Together the four commands take under a minute and are
what `.github/workflows/deploy.yml` runs before every deploy — lint and typecheck first (fail
before deploying anything), then the build, then the link check against its output.

Red on lint/typecheck means fix the code. Red on `check:links` means a page references a
route, asset, or file that the build didn't emit — a renamed project slug, a moved PDF, a
typo'd href. Fix the reference, don't delete the check.

Not covered: visual regressions, accessibility, cross-browser rendering, or whether the
content is any good — those are read-with-your-eyes checks, not automatable ones here.
`scripts/console-check.mjs` and `scripts/shoot.mjs` are manual QA tools (need a running dev
server and local Chrome); they are not part of this gate.

## Judgment rules

- Unclear requirement → ask; never run with a silent assumption. Flag any assumption you make.
- Prefer the simplest solution that works; complexity needs justification.
- Only modify code the task requires. No drive-by refactors of unrelated code.
- A change isn't done until `npm run build` and `npm run lint` pass.
