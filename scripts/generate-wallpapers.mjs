#!/usr/bin/env node

/**
 * ekkOS Wallpaper Generator
 * Uses Imagen 4 via Google Cloud Vertex AI + ImageMagick compositing
 *
 * Usage:
 *   node generate-wallpapers.mjs --all              Generate all wallpapers
 *   node generate-wallpapers.mjs <wallpaper-id>     Generate a specific wallpaper
 *   node generate-wallpapers.mjs --list             List available wallpaper IDs
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { config } from 'dotenv';

config({ path: '/Volumes/MacMiniPort/DEV/EKKOS/.env' });

const execAsync = promisify(exec);

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  model: 'imagen-4.0-generate-001',
  projectId: process.env.GOOGLE_VERTEX_PROJECT || 'ekkos-pulse',
  location: process.env.GOOGLE_VERTEX_LOCATION || 'us-central1',

  logo: {
    path: '/Volumes/MacMiniPort/DEV/LOGO/ekkos_white.png',
  },

  outputDir: '/Volumes/MacMiniPort/DEV/EKKOS/apps/marketing/public/images/wallpapers',
  thumbDir: '/Volumes/MacMiniPort/DEV/EKKOS/apps/marketing/public/images/wallpapers/thumbs',

  sizes: {
    desktop: {
      width: 3840, height: 2160,
      aspectRatio: '16:9',
      logoSize: '400x', logoGravity: 'SouthEast', logoOffset: '+60+60',
    },
    mobile: {
      width: 1080, height: 1920,
      aspectRatio: '9:16',
      logoSize: '200x', logoGravity: 'South', logoOffset: '+0+60',
    },
  },

  thumbWidth: 640,
};

// ============================================================================
// WALLPAPER DEFINITIONS
// ============================================================================

const WALLPAPERS = [
  {
    id: 'circuit-landscape',
    name: 'Circuit Landscape',
    prompt: 'Vast cyberpunk landscape made of glowing circuit board traces stretching to the horizon, dark navy and black background, teal and cyan micro-LEDs scattered like stars, volumetric fog drifting between layered circuit planes, cinematic depth of field, ultra detailed photorealistic 3D render, no text no logos no watermarks',
  },
  {
    id: 'neon-cityscape',
    name: 'Neon Cityscape',
    prompt: 'Futuristic cyberpunk city at night viewed from above, dark angular buildings with cyan and amber neon accent lighting along edges, data streams flowing between towers like rivers of light, atmospheric haze and rain, cinematic wide angle shot, ultra detailed photorealistic 3D render, no text no logos no watermarks',
  },
  {
    id: 'data-streams',
    name: 'Data Streams',
    prompt: 'Abstract visualization of data flowing through neural pathways, glowing cyan particles forming graceful streams against a deep black void, amber accent nodes where streams converge and branch, ethereal volumetric lighting, macro photography aesthetic, ultra detailed photorealistic 3D render, no text no logos no watermarks',
  },
  {
    id: 'neural-network',
    name: 'Neural Network',
    prompt: 'Massive neural network visualization with thousands of interconnected glowing nodes suspended in dark space, cyan primary connections with amber highlight nodes pulsing with energy, depth of field creating layers, resembling a cosmic constellation map, clean geometric lines, ultra detailed photorealistic 3D render, no text no logos no watermarks',
  },
  {
    id: 'memory-cathedral',
    name: 'Memory Cathedral',
    prompt: 'Interior of a vast futuristic data cathedral, towering dark walls made of server rack panels with rows of cyan status LEDs, central beam of warm amber light cutting through from above, geometric angular architecture with chamfered corners, mist and volumetric god rays, cinematic perspective looking upward, ultra detailed photorealistic 3D render, no text no logos no watermarks',
  },
  {
    id: 'quantum-grid',
    name: 'Quantum Grid',
    prompt: 'Infinite perspective grid plane stretching into complete darkness, grid lines glowing faint cyan against pitch black, occasional amber pulse waves radiating outward from the center, tiny atmospheric particles floating above the plane, dark void above, minimalist and cinematic, ultra detailed photorealistic 3D render, no text no logos no watermarks',
  },
];

// ============================================================================
// VERTEX AI
// ============================================================================

async function getAccessToken() {
  try {
    const { stdout } = await execAsync('gcloud auth application-default print-access-token');
    return stdout.trim();
  } catch {
    console.error('Failed to get access token. Run: gcloud auth application-default login');
    process.exit(1);
  }
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function generateImage(prompt, aspectRatio, accessToken, retries = 3) {
  const url = `https://${CONFIG.location}-aiplatform.googleapis.com/v1/projects/${CONFIG.projectId}/locations/${CONFIG.location}/publishers/google/models/${CONFIG.model}:predict`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio },
      }),
    });

    if (response.status === 429 && attempt < retries) {
      const wait = 15000 * attempt;
      console.log(`    Rate limited, waiting ${wait / 1000}s (attempt ${attempt}/${retries})...`);
      await sleep(wait);
      continue;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vertex AI ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    if (!data.predictions?.[0]?.bytesBase64Encoded) {
      throw new Error('No image data in Vertex AI response');
    }

    return Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
  }
  throw new Error('Exhausted retries');
}

// ============================================================================
// IMAGE PROCESSING
// ============================================================================

async function processImage(tempFile, outputFile, size, thumbFile) {
  const { width, height, logoSize, logoGravity, logoOffset } = size;

  // Resize to exact dimensions
  await execAsync(
    `magick "${tempFile}" -resize ${width}x${height}^ -gravity center -extent ${width}x${height} "${outputFile}"`
  );

  // Composite logo
  await execAsync(
    `magick "${outputFile}" \\( "${CONFIG.logo.path}" -resize ${logoSize} \\) ` +
    `-gravity ${logoGravity} -geometry ${logoOffset} -composite "${outputFile}"`
  );

  // Generate thumbnail
  await execAsync(
    `magick "${outputFile}" -resize ${CONFIG.thumbWidth}x -quality 85 "${thumbFile}"`
  );
}

// ============================================================================
// MAIN
// ============================================================================

async function generateWallpaper(wallpaper, accessToken) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  ${wallpaper.name} (${wallpaper.id})`);
  console.log(`${'='.repeat(60)}`);

  for (const [sizeKey, size] of Object.entries(CONFIG.sizes)) {
    const outputFile = path.join(CONFIG.outputDir, `${wallpaper.id}-${sizeKey}.png`);
    const thumbFile = path.join(CONFIG.thumbDir, `${wallpaper.id}-${sizeKey}.jpg`);
    const tempFile = path.join('/tmp', `ekkos-wp-${wallpaper.id}-${sizeKey}-${Date.now()}.png`);

    console.log(`\n  [${sizeKey}] ${size.width}x${size.height} (${size.aspectRatio})`);

    // Skip if already exists
    try {
      await fs.access(outputFile);
      console.log(`    SKIP (already exists)`);
      continue;
    } catch { /* file doesn't exist, proceed */ }

    try {
      // Generate
      console.log(`    Generating with Imagen 4...`);
      const buffer = await generateImage(wallpaper.prompt, size.aspectRatio, accessToken);
      await fs.writeFile(tempFile, buffer);
      console.log(`    Generated (${(buffer.length / 1024 / 1024).toFixed(1)}MB raw)`);

      // Process
      console.log(`    Processing + compositing logo...`);
      await processImage(tempFile, outputFile, size, thumbFile);

      const stats = await fs.stat(outputFile);
      console.log(`    Output: ${outputFile} (${(stats.size / 1024 / 1024).toFixed(1)}MB)`);

      const thumbStats = await fs.stat(thumbFile);
      console.log(`    Thumb:  ${thumbFile} (${(thumbStats.size / 1024).toFixed(0)}KB)`);

      // Delay between requests to avoid rate limiting
      console.log(`    Cooling down 10s...`);
      await sleep(10000);
    } catch (error) {
      console.error(`    FAILED: ${error.message}`);
    } finally {
      await fs.unlink(tempFile).catch(() => {});
    }
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--list')) {
    console.log('Available wallpapers:');
    for (const wp of WALLPAPERS) {
      console.log(`  ${wp.id.padEnd(22)} ${wp.name}`);
    }
    return;
  }

  // Ensure output directories exist
  await fs.mkdir(CONFIG.outputDir, { recursive: true });
  await fs.mkdir(CONFIG.thumbDir, { recursive: true });

  // Auth
  console.log('Authenticating with Google Cloud...');
  const accessToken = await getAccessToken();
  console.log('Authenticated.\n');

  const targets = args.includes('--all')
    ? WALLPAPERS
    : WALLPAPERS.filter(wp => args.includes(wp.id));

  if (targets.length === 0) {
    console.error('Usage: node generate-wallpapers.mjs --all | --list | <wallpaper-id> [<id2> ...]');
    console.error('\nRun with --list to see available wallpaper IDs.');
    process.exit(1);
  }

  console.log(`Generating ${targets.length} wallpaper(s) x ${Object.keys(CONFIG.sizes).length} sizes...`);

  for (const wallpaper of targets) {
    await generateWallpaper(wallpaper, accessToken);
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('  COMPLETE');
  console.log(`${'='.repeat(60)}`);
  console.log(`\nOutput: ${CONFIG.outputDir}`);
  console.log(`Thumbs: ${CONFIG.thumbDir}`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
