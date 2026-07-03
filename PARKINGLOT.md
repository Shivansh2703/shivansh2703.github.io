# Parking lot

Deferred work — not blocking, do not pick up mid-phase. Date added in parens.

## 1. Linked-repo sweep (2026-07-03)

The site now points at public repos, which makes them part of the portfolio.
Nobody has reviewed them.

- Secrets scan: hardcoded API keys / tokens / .env files across all linked
  repos — especially `brettyang003/Rescue-Ranger` (Google Maps + AWS keys from
  a 2023 hackathon). If a live key is found: revoke/rotate first, then purge.
- Quality pass: README with a screenshot + build/run steps for each repo the
  site links (snoopdogg, bird_animation_model, Plants-vs-Zombies, r-1,
  accent_ace, pacbot1, civ300). The site raises expectations these repos must
  meet; a bare repo undercuts the click-through.

## 2. CI guardrails for deploys (2026-07-03)

Deploys go straight to main with no automated checks beyond lint/tsc/build.
Add to the Pages workflow (or a scheduled job):

- Run `scripts/console-check.mjs` against the built output (home + one case
  page) — catches hydration/console regressions.
- Run `scripts/shoot.mjs` overflow check at 1440/390.
- External link sweep (all `repo`/`links` URLs in content + media files
  return 200) — links rot silently; today's all-green was a one-time manual
  check. A weekly scheduled run is enough.
