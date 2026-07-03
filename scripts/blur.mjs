// regenerate tiny blurDataURL placeholders into data/rolls.json
// run after adding/replacing photos:  node scripts/blur.mjs
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const file = join(root, "data", "rolls.json");
const rolls = JSON.parse(await readFile(file, "utf8"));

for (const roll of rolls) {
  for (const frame of roll.frames) {
    if (!frame.src?.startsWith("/")) continue;
    const buf = await sharp(join(root, "public", frame.src))
      .resize(20, 20, { fit: "inside" })
      .jpeg({ quality: 45 })
      .toBuffer();
    frame.blurDataURL = `data:image/jpeg;base64,${buf.toString("base64")}`;
  }
}

await writeFile(file, JSON.stringify(rolls, null, 2) + "\n");
console.log("blur placeholders written to data/rolls.json");
