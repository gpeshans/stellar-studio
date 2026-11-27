// Builds the project images the site serves from the originals.
//
// For every folder in originals/projects/<slug>/ it writes
// public/images/projects/<slug>/<name>.jpg:
// - resized to at most 2400px on the longer side
// - compressed, with camera and editing metadata removed
// - watermarked with the studio logo in the bottom-right corner, white on
//   dark corners and black on light ones
//
// Next to each one it writes plain/<name>.jpg: the same image without the
// mark, smaller, for places that crop images (cards, the home page hero),
// where a cut-off mark would look broken.
//
// It also writes src/lib/project-images.json with each image's size, so pages
// can reserve the space and lay images out by shape.
//
// Run it after adding or changing originals:  npm run images

import { readdir, rm, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "originals/projects");
const OUTPUT = path.join(ROOT, "public/images/projects");
const MANIFEST = path.join(ROOT, "src/lib/project-images.json");
// The header logo, white on transparent, rendered large from the logo font.
const WATERMARK = path.join(ROOT, "originals/watermark.png");

const MAX_SIDE = 2400;
const QUALITY = 80;
const PLAIN_MAX_SIDE = 1600;
const PLAIN_QUALITY = 78;

// Watermark width and its distance from the edges, as shares of the image's
// shorter side, so it looks the same on landscape and portrait images.
const MARK_WIDTH = 0.13;
const MARK_INSET = 0.035;
// Corners brighter than this (0-255) get the black mark.
const LIGHT_CORNER = 150;
const OPACITY = { light: 0.82, dark: 0.55 };

// These renders already carry the old "stellar." logo at the bottom centre,
// within the bottom 7%. Trim it off until clean exports replace them.
const TRIM_BOTTOM = {
  "dkk-apartment": 0.08,
  "kei-apartment": 0.08,
  "sv-weekend-house": 0.08,
};

// Images whose bottom-right corner holds content, such as a drawing's title,
// and the corner the mark goes in instead.
const MARK_CORNER = {
  "sv-weekend-house/4.jpg": "top-left",
};

const IMAGE = /\.(jpe?g|png|webp|tiff?)$/i;
const naturalOrder = (a, b) => a.localeCompare(b, "en", { numeric: true });
const outputName = (file) =>
  path
    .parse(file)
    .name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") + ".jpg";

async function watermark(width, dark) {
  const opacity = dark ? OPACITY.dark : OPACITY.light;
  let mark = sharp(WATERMARK).resize({ width });
  if (dark) mark = mark.negate({ alpha: false });
  // Scale the logo's own transparency by the opacity.
  const fade = { input: Buffer.from([0, 0, 0, Math.round(255 * opacity)]), raw: { width: 1, height: 1, channels: 4 }, tile: true, blend: "dest-in" };
  return mark.composite([fade]).png().toBuffer();
}

async function buildImage(slug, file) {
  const source = path.join(SOURCE, slug, file);
  const options = { limitInputPixels: false };
  const meta = await sharp(source, options).metadata();
  const turned = (meta.orientation ?? 1) >= 5;
  const width = turned ? meta.height : meta.width;
  let height = turned ? meta.width : meta.height;

  let image = sharp(source, options).rotate();
  const trim = TRIM_BOTTOM[slug];
  if (trim) {
    height = Math.round(height * (1 - trim));
    image = image.extract({ left: 0, top: 0, width, height });
  }
  const { data, info } = await image
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .toColourspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });
  const raw = { raw: { width: info.width, height: info.height, channels: info.channels } };

  const shorter = Math.min(info.width, info.height);
  const markWidth = Math.round(shorter * MARK_WIDTH);
  const markHeight = Math.round((markWidth * WATERMARK_SIZE.height) / WATERMARK_SIZE.width);
  const inset = Math.round(shorter * MARK_INSET);
  const corner = MARK_CORNER[`${slug}/${file}`] ?? "bottom-right";
  const left = corner.endsWith("left") ? inset : info.width - inset - markWidth;
  const top = corner.startsWith("top") ? inset : info.height - inset - markHeight;

  const behind = await sharp(data, raw)
    .extract({ left, top, width: markWidth, height: markHeight })
    .greyscale()
    .stats();
  const dark = behind.channels[0].mean > LIGHT_CORNER;

  const name = outputName(file);
  await sharp(data, raw)
    .composite([{ input: await watermark(markWidth, dark), left, top }])
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(path.join(OUTPUT, slug, name));
  await sharp(data, raw)
    .resize({ width: PLAIN_MAX_SIDE, height: PLAIN_MAX_SIDE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: PLAIN_QUALITY, mozjpeg: true })
    .toFile(path.join(OUTPUT, slug, "plain", name));

  return {
    src: `/images/projects/${slug}/${name}`,
    plain: `/images/projects/${slug}/plain/${name}`,
    width: info.width,
    height: info.height,
    bytes: (await stat(source)).size,
    dark,
  };
}

const WATERMARK_SIZE = await sharp(WATERMARK).metadata();

await rm(OUTPUT, { recursive: true, force: true });
const manifest = {};
let before = 0;
let after = 0;

const slugs = (await readdir(SOURCE, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort(naturalOrder);

for (const slug of slugs) {
  const files = (await readdir(path.join(SOURCE, slug))).filter((f) => IMAGE.test(f)).sort(naturalOrder);
  const names = files.map(outputName);
  const clash = names.find((name, i) => names.indexOf(name) !== i);
  if (clash) throw new Error(`${slug}: two originals would both become ${clash}`);

  await mkdir(path.join(OUTPUT, slug, "plain"), { recursive: true });
  const images = [];
  for (const file of files) {
    const { bytes, dark, ...image } = await buildImage(slug, file);
    before += bytes;
    for (const output of [image.src, image.plain]) {
      after += (await stat(path.join(ROOT, "public", output))).size;
    }
    images.push(image);
    process.stdout.write(dark ? "▪" : "▫");
  }
  manifest[slug] = images;
  console.log(` ${slug}: ${images.length}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
console.log(`\n${Object.values(manifest).flat().length} images: ${mb(before)} of originals -> ${mb(after)} on the site`);
