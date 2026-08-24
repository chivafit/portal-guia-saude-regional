// Gera PNGs transparentes de EXEMPLO para logos de empresas apoiadoras.
// São só placeholders (marca colorida sobre fundo transparente) — troque pelos
// PNGs reais das empresas em public/supporters/, mantendo fundo transparente.
//   node scripts/generate-example-logos.mjs
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const S = 240; // lado do canvas
const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "supporters");
mkdirSync(outDir, { recursive: true });

// ---- Canvas RGBA (fundo transparente) ----
function canvas() {
  return new Uint8Array(S * S * 4); // tudo 0 = transparente
}
function px(buf, x, y, [r, g, b], a = 255) {
  if (x < 0 || y < 0 || x >= S || y >= S) return;
  const i = (y * S + x) * 4;
  buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = a;
}
function disc(buf, cx, cy, rad, color) {
  for (let y = cy - rad; y <= cy + rad; y++)
    for (let x = cx - rad; x <= cx + rad; x++)
      if ((x - cx) ** 2 + (y - cy) ** 2 <= rad * rad) px(buf, x, y, color);
}
function rect(buf, x0, y0, w, h, color) {
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) px(buf, x, y, color);
}
function triDown(buf, cx, topY, halfW, height, color) {
  for (let dy = 0; dy < height; dy++) {
    const w = Math.round(halfW * (1 - dy / height));
    for (let x = cx - w; x <= cx + w; x++) px(buf, x, topY + dy, color);
  }
}
function triUp(buf, cx, apexY, halfW, height, color) {
  for (let dy = 0; dy < height; dy++) {
    const w = Math.round(halfW * (dy / height));
    for (let x = cx - w; x <= cx + w; x++) px(buf, x, apexY + dy, color);
  }
}

// ---- Encoder PNG (RGBA, sem filtro) ----
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const body = Buffer.concat([t, data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}
function encodePng(rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(S, 0); ihdr.writeUInt32BE(S, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const raw = Buffer.alloc(S * (S * 4 + 1));
  for (let y = 0; y < S; y++) {
    raw[y * (S * 4 + 1)] = 0; // filtro None
    Buffer.from(rgba.buffer, y * S * 4, S * 4).copy(raw, y * (S * 4 + 1) + 1);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

// ---- Marcas de exemplo ----
const WHITE = [255, 255, 255];
const c = S / 2;

function cross(buf, color) {
  disc(buf, c, c, 116, color);
  rect(buf, c - 16, c - 52, 32, 104, WHITE);
  rect(buf, c - 52, c - 16, 104, 32, WHITE);
}
function drop(buf, color) {
  disc(buf, c, c, 116, color);
  disc(buf, c, c + 26, 42, WHITE);        // base arredondada
  triUp(buf, c, c - 44, 42, 74, WHITE);   // ponta pra cima
}
function heart(buf, color) {
  disc(buf, c, c, 116, color);
  disc(buf, c - 26, c - 18, 30, WHITE);
  disc(buf, c + 26, c - 18, 30, WHITE);
  triDown(buf, c, c - 34, 56, 78, WHITE);
}

const logos = [
  { file: "empresa-farmacia.png", draw: (b) => cross(b, [31, 157, 99]) },   // verde farmácia
  { file: "empresa-clinica.png", draw: (b) => heart(b, [23, 56, 78]) },     // petróleo clínica
  { file: "empresa-laboratorio.png", draw: (b) => drop(b, [58, 141, 189]) },// azul laboratório
];

for (const l of logos) {
  const buf = canvas();
  l.draw(buf);
  writeFileSync(join(outDir, l.file), encodePng(buf));
}
console.log(`Gerados ${logos.length} PNGs transparentes de exemplo em public/supporters/`);
