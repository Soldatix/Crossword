import { copyFile, cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

await mkdir(dist, { recursive: true });

for (const file of ['app.js', 'app-core.js', 'library.js', 'replay.js', 'flags.js']) {
  await copyFile(path.join(root, file), path.join(dist, file));
}

await cp(path.join(root, 'puzzles'), path.join(dist, 'puzzles'), {
  recursive: true,
  force: true
});

console.log('Copied Crossword runtime scripts and puzzle library into dist/.');
