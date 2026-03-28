/**
 * Generates public/favicon.ico from app/icon.svg using sharp.
 * Run once: node scripts/generate-favicon.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const svgBuffer = readFileSync(join(root, 'app', 'icon.svg'))

async function svgToPng(size) {
  return sharp(svgBuffer)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 8, g: 8, b: 8, alpha: 255 },
    })
    .png()
    .toBuffer()
}

function buildIco(pngBuffers) {
  const count = pngBuffers.length
  const headerSize = 6
  const entrySize = 16
  const dataOffset = headerSize + entrySize * count

  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: 1 = ICO
  header.writeUInt16LE(count, 4)

  const entries = []
  let currentOffset = dataOffset
  for (const png of pngBuffers) {
    const entry = Buffer.alloc(entrySize)
    // 0 = 256px, otherwise the actual size (capped at 255)
    const dim = Math.min(png._size, 255)
    entry.writeUInt8(dim === 256 ? 0 : dim, 0)
    entry.writeUInt8(dim === 256 ? 0 : dim, 1)
    entry.writeUInt8(0, 2)  // color count
    entry.writeUInt8(0, 3)  // reserved
    entry.writeUInt16LE(0, 4)  // planes
    entry.writeUInt16LE(32, 6) // bit count
    entry.writeUInt32LE(png.length, 8)
    entry.writeUInt32LE(currentOffset, 12)
    entries.push(entry)
    currentOffset += png.length
  }

  return Buffer.concat([header, ...entries, ...pngBuffers])
}

const [png16, png32, png48] = await Promise.all([
  svgToPng(16),
  svgToPng(32),
  svgToPng(48),
])

png16._size = 16
png32._size = 32
png48._size = 48

const ico = buildIco([png16, png32, png48])
writeFileSync(join(root, 'public', 'favicon.ico'), ico)
console.log('✓ public/favicon.ico generated (16, 32, 48px)')

// Also write standalone PNGs used by layout metadata
const png180 = await svgToPng(180)
writeFileSync(join(root, 'public', 'icon-180.png'), png180)
console.log('✓ public/icon-180.png generated')

const png32File = await svgToPng(32)
writeFileSync(join(root, 'public', 'icon-32.png'), png32File)
console.log('✓ public/icon-32.png generated')
