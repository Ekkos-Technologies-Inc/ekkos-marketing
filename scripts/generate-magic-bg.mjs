#!/usr/bin/env node

/**
 * Generate Magic Moment background image using FLUX 2 Max
 * Run: node apps/marketing/scripts/generate-magic-bg.mjs
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { experimental_generateImage as generateImage } from 'ai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prompt = `Swirling trails of purple and cyan stardust spiral elegantly across a deep dark blue-black void. Tiny glowing geometric shapes - hexagons, diamonds, and circles - float within the particle streams like digital fireflies. A central burst of soft golden light emanates outward, with delicate light rays spreading across the composition. The particles form a graceful S-curve flow from bottom-left to top-right. Ethereal volumetric lighting creates depth and atmosphere. Abstract magical technology aesthetic, ultra-clean with lots of dark negative space for text overlay. No objects, just pure particle effects and light.`;

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function generateMagicBackground() {
  // Ensure images directory exists
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const outputPath = path.join(imagesDir, 'magic-moment-bg.png');

  console.log('🪄 Generating Magic Moment background...');
  console.log('📝 Prompt:', prompt.substring(0, 80) + '...');

  try {
    const result = await generateImage({
      model: 'bfl/flux-2-max',
      prompt: prompt,
    });

    if (result.image) {
      // If it's a URL
      if (typeof result.image === 'string' && result.image.startsWith('http')) {
        await downloadImage(result.image, outputPath);
        console.log(`✅ Saved: ${outputPath}`);
      }
      // If it's base64 data
      else if (result.image.base64) {
        const buffer = Buffer.from(result.image.base64, 'base64');
        fs.writeFileSync(outputPath, buffer);
        console.log(`✅ Saved: ${outputPath}`);
      }
      // If it's a Uint8Array
      else if (result.image instanceof Uint8Array) {
        fs.writeFileSync(outputPath, Buffer.from(result.image));
        console.log(`✅ Saved: ${outputPath}`);
      }
      // URL in object
      else if (result.image.url) {
        await downloadImage(result.image.url, outputPath);
        console.log(`✅ Saved: ${outputPath}`);
      }
      else {
        console.log('⚠️ Unknown image format:', typeof result.image);
        fs.writeFileSync(outputPath + '.json', JSON.stringify(result, null, 2));
      }
    } else {
      console.log('❌ No image in result:', JSON.stringify(result).substring(0, 200));
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.cause) console.error('Cause:', error.cause);
  }
}

generateMagicBackground();
