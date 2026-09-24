import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { deflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'icons');
await mkdir(outDir, { recursive: true });

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([length, typeBuf, data, crc]);
}

function makePng(size) {
  const stride = size * 4 + 1;
  const raw = Buffer.alloc(stride * size);
  const bg = [16, 25, 54, 255];
  const cyan = [84, 232, 255, 255];
  const white = [255, 255, 255, 255];

  for (let y = 0; y < size; y++) {
    const row = y * stride;
    raw[row] = 0;
    for (let x = 0; x < size; x++) {
      const o = row + 1 + x * 4;
      raw[o] = bg[0];
      raw[o + 1] = bg[1];
      raw[o + 2] = bg[2];
      raw[o + 3] = bg[3];
    }
  }

  const cells = 5;
  const gap = Math.max(2, Math.round(size * 0.012));
  const cell = Math.floor(size * 0.105);
  const total = cells * cell + (cells - 1) * gap;
  const start = Math.floor((size - total) / 2);

  const active = new Set([
    '0,0','2,0','4,0',
    '0,1','2,1','4,1',
    '0,2','1,2','2,2','3,2','4,2',
    '0,3','2,3','4,3',
    '0,4','2,4','4,4'
  ]);

  for (let gy = 0; gy < cells; gy++) {
    for (let gx = 0; gx < cells; gx++) {
      const key = gx + ',' + gy;
      const color = active.has(key) ? cyan : white;
      const x0 = start + gx * (cell + gap);
      const y0 = start + gy * (cell + gap);
      for (let y = y0; y < y0 + cell; y++) {
        const row = y * stride;
        for (let x = x0; x < x0 + cell; x++) {
          const o = row + 1 + x * 4;
          raw[o] = color[0];
          raw[o + 1] = color[1];
          raw[o + 2] = color[2];
          raw[o + 3] = color[3];
        }
      }
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

for (const size of [180, 192, 512]) {
  const file = path.join(outDir, `crossword-${size}.png`);
  await writeFile(file, makePng(size));
  console.log(`Generated ${path.relative(root, file)}`);
}
