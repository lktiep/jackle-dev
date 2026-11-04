// Renders /cv to public/Jack-Le-CV.pdf with headless Chrome.
// Usage: npm run build && npm run cv   (re-run whenever lib/content.ts changes)
import { spawn, execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = process.env.CV_PORT ?? '3199';
const OUT = resolve('public/Jack-Le-CV.pdf');
const CHROME =
  process.env.CHROME_PATH ??
  [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find(existsSync);

if (!CHROME) throw new Error('Chrome not found; set CHROME_PATH');

const server = spawn('npx', ['next', 'start', '-p', PORT], { stdio: 'ignore' });
try {
  const url = `http://localhost:${PORT}/cv`;
  for (let i = 0; ; i++) {
    try {
      if ((await fetch(url)).ok) break;
    } catch {}
    if (i > 60) throw new Error('server did not start');
    await new Promise((r) => setTimeout(r, 500));
  }
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=4000',
    `--print-to-pdf=${OUT}`,
    url,
  ], { stdio: 'ignore' });
  console.log(`wrote ${OUT}`);
} finally {
  server.kill();
}
