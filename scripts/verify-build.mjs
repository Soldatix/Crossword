import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const requiredFiles = [
  'index.html',
  'manifest.webmanifest',
  'sw.js',
  'app.js',
  'app-core.js',
  'library.js',
  'replay.js',
  'flags.js',
  'icons/crossword-180.png',
  'icons/crossword-192.png',
  'icons/crossword-512.png',
  'puzzles/manifest.json',
  'puzzles/en/library.json',
  'puzzles/hr/library.json',
  'puzzles/de/library.json',
  'puzzles/it/library.json',
  'puzzles/es/library.json'
];

for (const rel of requiredFiles) {
  await access(path.join(dist, rel));
}

const manifest = JSON.parse(await readFile(path.join(dist, 'manifest.webmanifest'), 'utf8'));
const sizes = new Set((manifest.icons || []).map((icon) => icon.sizes));
if (!sizes.has('192x192') || !sizes.has('512x512')) {
  throw new Error('Manifest is missing required 192x192 or 512x512 icons.');
}

const index = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!index.includes('manifest.webmanifest')) throw new Error('Built index is missing manifest link.');
if (!index.includes('installPanel')) throw new Error('Built index is missing install panel.');

const sw = await readFile(path.join(dist, 'sw.js'), 'utf8');
if (!sw.includes("CACHE_PREFIX = 'crossword-'")) throw new Error('Generated service worker cache prefix is missing.');
if (!sw.includes("url.pathname.startsWith('/puzzles/')")) throw new Error('Generated service worker puzzle caching is missing.');

console.log('Crossword production build verification passed.');
