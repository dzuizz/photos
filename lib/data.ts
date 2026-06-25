import { join } from "node:path";
import rollsData from "@/data/rolls.json";
import seriesData from "@/data/series.json";
import { imageSize } from "./imageSize";
import type { Frame, RawFrame, RawRoll, Roll, Series } from "./types";

function imageFor(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

function dimensionsFor(raw: RawFrame): { width: number; height: number } {
  if (raw.width && raw.height) return { width: raw.width, height: raw.height };
  if (raw.src?.startsWith("/")) {
    const size = imageSize(join(process.cwd(), "public", raw.src));
    if (size) return size;
  }
  return { width: 1600, height: 1200 };
}

function hydrateFrame(raw: RawFrame, rollId: string): Frame {
  const seed = raw.seed ?? raw.id;
  const src = raw.src ?? imageFor(seed, 1600, 1200);
  return {
    id: raw.id,
    rollId: raw.rollId ?? rollId,
    frameNum: raw.frameNum,
    src,
    thumb: raw.thumb ?? raw.src ?? imageFor(seed, 600, 450),
    ...dimensionsFor(raw),
    caption: raw.caption,
    location: raw.location,
    shootDate: raw.shootDate,
    filmStock: raw.filmStock,
    camera: raw.camera,
    lens: raw.lens,
    series: raw.series ?? [],
    isFeatured: raw.isFeatured ?? false,
  };
}

function hydrateRoll(raw: RawRoll): Roll {
  return {
    id: raw.id,
    label: raw.label,
    filmStock: raw.filmStock,
    shootDate: raw.shootDate,
    location: raw.location,
    frames: raw.frames.map((f) => hydrateFrame(f, raw.id)),
  };
}

const rolls: Roll[] = (rollsData as RawRoll[]).map(hydrateRoll);
const series: Series[] = seriesData as Series[];

export function getRolls(): Roll[] {
  return rolls;
}

export function getSeriesList(): Series[] {
  return series;
}

export function getSeries(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}

export function getAllFrames(): Frame[] {
  return rolls.flatMap((r) => r.frames);
}

export function getFrame(id: string): Frame | undefined {
  return getAllFrames().find((f) => f.id === id);
}

export function getRollsForSeries(slug: string): Roll[] {
  return rolls
    .map((roll) => ({
      ...roll,
      frames: roll.frames.filter((f) => f.series.includes(slug)),
    }))
    .filter((roll) => roll.frames.length > 0);
}

export function getFrameNeighbours(id: string): {
  prev?: Frame;
  next?: Frame;
} {
  const all = getAllFrames();
  const idx = all.findIndex((f) => f.id === id);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}
