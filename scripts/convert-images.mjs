import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Modify this path if your images are in a different directory
const TARGET_DIR = path.join(__dirname, '../public');
const RESOLUTIONS = [384, 640, 1024, 2048]; // The widths you want to generate

async function processDirectory(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        await processDirectory(fullPath);
      } else {
        const ext = path.extname(file.name).toLowerCase();
        
        // Target specifically PNG and JPEG/JPG files
        // and ignore already resized files (-384.png, etc) to prevent recursive resizing
        if (['.png', '.jpeg', '.jpg'].includes(ext) && !file.name.match(/-\d+\.(png|jpeg|jpg|webp|avif)$/)) {
          const filePathWithoutExt = fullPath.substring(0, fullPath.lastIndexOf('.'));
          
          console.log(`\nProcessing: ${fullPath}`);

          for (const width of RESOLUTIONS) {
            const widthSuffix = `-${width}`;
            const webpPath = `${filePathWithoutExt}${widthSuffix}.webp`;
            const avifPath = `${filePathWithoutExt}${widthSuffix}.avif`;
            // Un-comment if you also want the resized original format
            // const originalResizedPath = `${filePathWithoutExt}${widthSuffix}${ext}`;

            try {
              // Generate WebP
              await sharp(fullPath)
                .resize({ width, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(webpPath);
              
              // Generate AVIF
              await sharp(fullPath)
                .resize({ width, withoutEnlargement: true })
                .avif({ quality: 80 })
                .toFile(avifPath);
              
              console.log(` ✅ Generated ${width}w WebP & AVIF`);
            } catch (err) {
              console.error(` ❌ Error converting ${file.name} to ${width}w:`, err);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error(`Failed to read directory ${dir}:`, err);
  }
}

async function main() {
  console.log(`Starting multi-resolution image conversion in: ${TARGET_DIR}`);
  await processDirectory(TARGET_DIR);
  console.log('Conversion complete!');
}

main();
