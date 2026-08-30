// Walks the static export in ./out and fails if any internal href/src points
// at a file that doesn't exist. Zero dependencies — the whole point is that a
// deploy is broken by nothing more than a build passing with a dangling link.
// Usage: node scripts/check-links.mjs [outDir]
import { readFile, readdir, access } from "node:fs/promises";
import { join, dirname, extname } from "node:path";

const outDir = process.argv[2] ?? "out";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (e.name.endsWith(".html")) files.push(p);
  }
  return files;
}

function extractRefs(html) {
  const refs = [];
  const re = /\s(?:href|src)="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) refs.push(m[1]);
  return refs;
}

function isExternal(url) {
  return (
    /^([a-z]+:)?\/\//i.test(url) ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("data:") ||
    url.startsWith("#")
  );
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveTarget(url, fileDir) {
  const clean = url.split("#")[0].split("?")[0];
  if (clean === "") return null; // pure same-page anchor, already filtered by isExternal but be safe
  const base = clean.startsWith("/") ? join(outDir, clean) : join(fileDir, clean);
  if (extname(base) !== "") return base; // has its own extension (.js, .css, .pdf, .svg, ...)
  // extensionless: Next emits either <path>.html or <path>/index.html
  const candidates = [`${base}.html`, join(base, "index.html")];
  for (const c of candidates) if (await exists(c)) return c;
  return candidates[0]; // report the first as the missing target
}

const htmlFiles = await walk(outDir);
if (htmlFiles.length === 0) {
  console.error(`no .html files found under ${outDir} — did the build run?`);
  process.exit(1);
}

const broken = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const url of extractRefs(html)) {
    if (isExternal(url)) continue;
    const target = await resolveTarget(url, dirname(file));
    if (target === null) continue;
    if (!(await exists(target))) broken.push({ file, url, target });
  }
}

const required = ["index.html", "404.html"];
for (const rel of required) {
  if (!(await exists(join(outDir, rel)))) broken.push({ file: "(required)", url: rel, target: join(outDir, rel) });
}

if (broken.length > 0) {
  console.error(`✗ ${broken.length} broken internal reference(s):`);
  for (const b of broken) console.error(`  ${b.file} -> "${b.url}" (missing ${b.target})`);
  process.exit(1);
}

console.log(`✓ ${htmlFiles.length} page(s) checked, no broken internal links, required files present`);
