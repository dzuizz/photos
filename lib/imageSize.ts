import { readFileSync } from "node:fs";

export interface Size {
  width: number;
  height: number;
}

function isSOF(marker: number): boolean {
  return (
    marker >= 0xc0 &&
    marker <= 0xcf &&
    marker !== 0xc4 &&
    marker !== 0xc8 &&
    marker !== 0xcc
  );
}

function jpegSize(buf: Buffer): Size | null {
  if (buf.readUInt16BE(0) !== 0xffd8) return null;
  let o = 2;
  while (o + 9 < buf.length) {
    if (buf[o] !== 0xff) {
      o++;
      continue;
    }
    const marker = buf[o + 1];
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      o += 2;
      continue;
    }
    const len = buf.readUInt16BE(o + 2);
    if (isSOF(marker)) {
      return { height: buf.readUInt16BE(o + 5), width: buf.readUInt16BE(o + 7) };
    }
    o += 2 + len;
  }
  return null;
}

function pngSize(buf: Buffer): Size | null {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

export function imageSize(absPath: string): Size | null {
  try {
    const buf = readFileSync(absPath);
    return jpegSize(buf) ?? pngSize(buf);
  } catch {
    return null;
  }
}
