import { createHash } from "node:crypto"
import { readdir, readFile, rm, writeFile } from "node:fs/promises"
import { join, relative, sep } from "node:path"

import sharp from "sharp"

const root = join(import.meta.dirname, "..")
const publicDir = join(root, "public")
const imagesDir = join(publicDir, "images")
const componentsDir = join(imagesDir, "components")
const manifestPath = join(root, "lib", "image-manifest.json")

const maxWidths = { ios: 672, mac: 960 }
const quality = 85

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true })
  return entries
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .map((entry) => join(entry.parentPath, entry.name))
    .sort()
}

function platformOf(file) {
  return relative(componentsDir, file).split(sep)[0]
}

async function convertPngs() {
  const pngs = (await listFiles(componentsDir)).filter((file) =>
    file.endsWith(".png")
  )

  for (const png of pngs) {
    const webp = png.replace(/\.png$/, ".webp")
    const width = maxWidths[platformOf(png)]
    await sharp(png)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(webp)
    await rm(png)
    console.log(`converted ${relative(publicDir, webp)}`)
  }
}

async function writeManifest() {
  const manifest = {}
  for (const file of await listFiles(imagesDir)) {
    const hash = createHash("sha256")
      .update(await readFile(file))
      .digest("hex")
      .slice(0, 10)
    manifest[`/${relative(publicDir, file).split(sep).join("/")}`] = hash
  }
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`hashed ${Object.keys(manifest).length} images`)
}

await convertPngs()
await writeManifest()
