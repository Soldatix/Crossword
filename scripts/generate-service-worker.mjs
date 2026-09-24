import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const allFiles = await walk(dist);
const precacheFiles = allFiles
  .filter((file) => path.basename(file) !== 'sw.js')
  .filter((file) => {
    const rel = path.relative(dist, file).split(path.sep).join('/');
    return rel === 'index.html'
      || rel === 'manifest.webmanifest'
      || rel === 'app.js'
      || rel === 'app-core.js'
      || rel === 'library.js'
      || rel === 'replay.js'
      || rel === 'flags.js'
      || rel === 'puzzles/manifest.json'
      || /^icons\/crossword-(?:180|192|512)\.png$/.test(rel)
      || /^assets\/.*\.(?:js|css)$/.test(rel);
  })
  .sort();

const urls = [];
const hash = createHash('sha256');

for (const file of precacheFiles) {
  const rel = path.relative(dist, file).split(path.sep).join('/');
  const url = rel === 'index.html' ? '/' : '/' + rel;
  const content = await readFile(file);
  urls.push(url);
  hash.update(url);
  hash.update('\0');
  hash.update(content);
  hash.update('\0');
}

const required = [
  '/',
  '/manifest.webmanifest',
  '/app.js',
  '/app-core.js',
  '/library.js',
  '/replay.js',
  '/flags.js',
  '/icons/crossword-192.png',
  '/icons/crossword-512.png'
];

for (const url of required) {
  if (!urls.includes(url)) throw new Error('Missing required precache resource: ' + url);
}

if (!urls.some((url) => /^\/assets\/.*\.js$/.test(url))) {
  throw new Error('No production JavaScript asset found for precache.');
}
if (!urls.some((url) => /^\/assets\/.*\.css$/.test(url))) {
  throw new Error('No production CSS asset found for precache.');
}

const revision = hash.digest('hex').slice(0, 16);
const cacheName = 'crossword-' + revision;
const serializedUrls = JSON.stringify(urls, null, 2);

const source = `const CACHE_NAME = ${JSON.stringify(cacheName)};
const CACHE_PREFIX = 'crossword-';
const PRECACHE_URLS = ${serializedUrls};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request, cacheKey = request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(cacheKey, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(cacheKey)) || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, '/'));
    return;
  }

  if (url.pathname.startsWith('/puzzles/')) {
    event.respondWith(networkFirst(request, url.pathname));
    return;
  }

  event.respondWith((async () => {
    const cacheKey = url.pathname;
    const cached = await caches.match(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(cacheKey, response.clone());
      }
      return response;
    } catch {
      return Response.error();
    }
  })());
});
`;

await writeFile(path.join(dist, 'sw.js'), source, 'utf8');
console.log(`Generated dist/sw.js with cache ${cacheName} and ${urls.length} precached resources.`);
