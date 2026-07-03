// Load a URL and report console errors/warnings + page errors.
// Catches hydration mismatches that `next build` won't surface.
// Usage: node scripts/console-check.mjs <url>
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:3000";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const msgs = [];
page.on("console", (m) => {
  const t = m.type();
  if (t === "error" || t === "warning") msgs.push(`[${t}] ${m.text()}`);
});
page.on("pageerror", (e) => msgs.push(`[pageerror] ${e.message}`));

await page.goto(url, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500)); // let hydration + a few rAF ticks run

await browser.close();

const hydration = msgs.filter((m) => /hydrat|did not match|server rendered|mismatch/i.test(m));
if (msgs.length === 0) {
  console.log("✓ clean — no console errors/warnings, no page errors");
} else {
  console.log(`⚠ ${msgs.length} console message(s):`);
  for (const m of msgs) console.log("  " + m.slice(0, 300));
  console.log(hydration.length ? `\n⚠ ${hydration.length} look hydration-related` : "\n✓ none hydration-related");
}
