export interface Frame {
  id: string;
  rollId: string;
  frameNum: string;
  src: string;
  thumb: string;
  width: number;
  height: number;
  caption: string;
  location: string;
  shootDate: string;
  filmStock: string;
  camera: string;
  lens: string;
  series: string[];
  isFeatured: boolean;
}

export interface Roll {
  id: string;
  label: string;
  filmStock: string;
  shootDate: string;
  location: string;
  frames: Frame[];
}

export interface Series {
  slug: string;
  name: string;
  description: string;
}


export interface RawFrame
  extends Omit<Frame, "rollId" | "src" | "thumb" | "width" | "height"> {
  rollId?: string;
  src?: string;
  thumb?: string;
  width?: number;
  height?: number;
  seed?: string;
}

export interface RawRoll extends Omit<Roll, "frames"> {
  frames: RawFrame[];
}
