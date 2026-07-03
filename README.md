# shivansh2703.github.io

My portfolio — robotics & low-latency systems projects. Dark, engineered, data-forward.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Shiki
**Host:** GitHub Pages (static export) · auto-deploys on push to `main`
**Live:** https://shivansh2703.github.io

---

## Quick start

```bash
npm ci          # install
npm run dev     # local dev at http://localhost:3000
npm run build   # static export to ./out
npm run lint
```

Requires Node 20+.

---

## Everything is data-driven — you rarely touch components

All content lives in `content/`. The pages iterate over it, so adding or editing content never means
touching layout or page code.

```
content/
  projects.ts      # every project (hero + grid)
  experience.ts    # work timeline
  about.ts         # bio, links, résumé path
public/
  media/<slug>/    # per-project images/video
  shivansh_singh_resume.pdf
```

### ➕ Add a grid project
Append one object to `projects` in `content/projects.ts`:

```ts
{
  slug: "my-thing",
  name: "My Thing",
  tagline: "One line on what it is.",
  year: "2026",
  tier: "grid",
  tags: ["C++", "whatever"],
  metrics: [{ label: "throughput", value: "10×" }], // optional
  repo: null, // or "https://github.com/you/my-thing"
}
```

It shows up in the grid automatically. That's the whole change.

### ⭐ Promote a project to a hero case study
Change `tier: "grid"` → `tier: "hero"` and fill the optional case-study fields:

```ts
tier: "hero",
problem: "…",
approach: ["…", "…"],
results: ["…"],
codeSnippet: { lang: "cpp", caption: "…", code: `…` }, // optional
architecture: "…",                                     // optional
```

The `/projects/<slug>` page is generated automatically from the data (via `generateStaticParams`).
Any field you omit simply doesn't render — nothing breaks.

### 🖼️ Add photos or video to a project
1. Drop the file in `public/media/<slug>/`.
2. Add one entry to that project's `media` array:

```ts
media: [
  { type: "image", src: "/media/my-thing/photo.jpg", alt: "descriptive alt text" },
  { type: "video", src: "/media/my-thing/demo.mp4",  alt: "what the clip shows" },
],
```

Compress first (video → H.264 mp4, **under ~20 MB per clip** — the repo is the CDN; no Git LFS).
Keep images < ~300 KB. No other change needed.

### 🔗 Wire a GitHub repo when it goes public
Change `repo: null` → the URL. The card/CTA switches from "Private · coming soon" to a live link.

### 📄 Update the résumé
Replace `public/shivansh_singh_resume.pdf`. The download button always points there.

### ↕️ Reorder
Hero order = array order in `projects.ts` (grid too). No layout edits.

---

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs the static export and publishes
`./out` to GitHub Pages. Nothing manual.

Local production check before pushing:

```bash
npm run build && npx serve out
```

### Custom domain (optional)
1. Add a `CNAME` file at the repo root containing the domain (e.g. `shivanshsonit.com`).
2. Point DNS at GitHub Pages (A records to GitHub's IPs, or a CNAME to `shivansh2703.github.io`).
3. Enable "Enforce HTTPS" in repo Settings → Pages.

---

## Notes
- Static export: no SSR / API routes / server image optimization (`next.config.ts` sets
  `output: 'export'`, `images.unoptimized: true`). Not needed for this site.
- Respects `prefers-reduced-motion` — animations degrade gracefully.
- `public/.nojekyll` must stay (keeps GitHub Pages from stripping `_next/`).
