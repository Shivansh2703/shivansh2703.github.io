// Screenshot + overflow diagnostic harness using the system Chrome.
// Usage: node scripts/shoot.mjs <url> <outDir>
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:4321";
const outDir = process.argv[3] ?? ".shots";
mkdirSync(outDir, { recursive: true });

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--hide-scrollbars"],
});

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });

  // Detect horizontal overflow: any element whose right edge exceeds the viewport width.
  const overflow = await page.evaluate((vw) => {
    const docW = document.documentElement.scrollWidth;
    const offenders = [];
    for (const el of document.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width <= vw + 200) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.toString().slice(0, 60)) || "",
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    }
    // De-dup by right edge, keep the widest few
    offenders.sort((a, b) => b.right - a.right);
    return { docW, viewport: vw, top: offenders.slice(0, 8) };
  }, vp.width);

  console.log(`\n[${vp.name}] scrollWidth=${overflow.docW} viewport=${overflow.viewport}` +
    (overflow.docW > overflow.viewport ? "  ⚠ HORIZONTAL OVERFLOW" : "  ✓ no overflow"));
  for (const o of overflow.top) {
    console.log(`   ${o.right.toString().padStart(5)}px  <${o.tag}> .${o.cls}`);
  }

  await page.screenshot({ path: `${outDir}/${vp.name}.png`, fullPage: true });
  await page.close();
}

await browser.close();
