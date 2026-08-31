# Parking lot

Deferred work — not blocking, do not pick up mid-phase. Date added in parens.

## 1. Linked-repo sweep (2026-07-03, list refreshed 2026-08-31)

The site points at public repos, which makes them part of the portfolio.
Nobody has reviewed them.

- Secrets scan: hardcoded API keys / tokens / .env files across all linked
  repos — especially `brettyang003/Rescue-Ranger` (Google Maps + AWS keys from
  a 2023 hackathon). If a live key is found: revoke/rotate first, then purge.
- Quality pass: README with a screenshot + build/run steps for each repo the
  site links. The current set is `snoopdogg`, `Rescue-Ranger`, `pvz-de1soc`,
  `accent_ace`, `tracon`, `agent-radar`, `orphan`, `paperdeck`, `chute` and
  `tally`. The site raises expectations these repos must meet; a bare repo
  undercuts the click-through. The 2026 repos mostly carry real READMEs
  already; `accent_ace` is the thin one.
- Link rot is real and silent: two links broke between July and August (one
  repo went private, one was renamed and survived only on GitHub's redirect).
  Re-run `curl -sIL -o /dev/null -w '%{http_code}'` over every `repo`/`links`
  URL whenever the content file changes — see item 3.

## 2. Visitor analytics (2026-07-15)

No hit counting exists today — GitHub Pages has no built-in analytics and no
script is wired into the site, so traffic is unrecorded until one is added.

- Recommended: GoatCounter (free, cookie-free, no consent banner) — create an
  account at goatcounter.com, add their script tag to the root layout, deploy.
- Alternative: Cloudflare Web Analytics (also free/cookie-free, no DNS move).
- Counting starts only from deploy time; historical traffic is unrecoverable,
  so earlier is better.

## 3. CI guardrails for deploys (2026-07-03)

Deploys go straight to main with no automated checks beyond lint/tsc/build.
Add to the Pages workflow (or a scheduled job):

- Run `scripts/console-check.mjs` against the built output (home + one case
  page) — catches hydration/console regressions.
- Run `scripts/shoot.mjs` overflow check at 1440/390.
- External link sweep (all `repo`/`links` URLs in content + media files
  return 200) — links rot silently; today's all-green was a one-time manual
  check. A weekly scheduled run is enough.
