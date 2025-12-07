/**
 * Generate animated OG image (GIF) with particle text effect
 * Similar to the intro loader animation
 *
 * Usage: node scripts/generate-og-gif.mjs
 */

import { createCanvas } from "canvas";
import GIFEncoder from "gif-encoder-2";
import { createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// OG Image dimensions
const WIDTH = 1200;
const HEIGHT = 630;

// Animation settings
const FPS = 20; // Higher FPS = smoother
const DURATION_SECONDS = 2.5;
const TOTAL_FRAMES = Math.floor(FPS * DURATION_SECONDS);

// Brand colors
const COLORS = {
  legal: { r: 212, g: 175, b: 55 }, // gold
  tech: { r: 6, g: 182, b: 212 }, // cyan
};

const BACKGROUND = { r: 11, g: 11, b: 12 };

// Particle class (simplified from IntroLoader)
class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.vx = 0;
    this.vy = 0;
    this.size = 3;
    this.maxSpeed = 25;
    this.maxForce = 1.5; // Lower = smoother curves

    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.targetR = 0;
    this.targetG = 0;
    this.targetB = 0;
    this.colorProgress = 0;
    this.colorSpeed = 0.03;
  }

  update() {
    // Steering towards target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 1) {
      // Slow down when close
      const proximityMult = dist < 100 ? dist / 100 : 1;
      const desiredVx = (dx / dist) * this.maxSpeed * proximityMult;
      const desiredVy = (dy / dist) * this.maxSpeed * proximityMult;

      let steerX = desiredVx - this.vx;
      let steerY = desiredVy - this.vy;

      const steerMag = Math.sqrt(steerX * steerX + steerY * steerY);
      if (steerMag > this.maxForce) {
        steerX = (steerX / steerMag) * this.maxForce;
        steerY = (steerY / steerMag) * this.maxForce;
      }

      this.vx += steerX;
      this.vy += steerY;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Color interpolation
    if (this.colorProgress < 1) {
      this.colorProgress = Math.min(1, this.colorProgress + this.colorSpeed);
    }

    const p = this.colorProgress;
    this.r = Math.round(this.r + (this.targetR - this.r) * p * 0.1);
    this.g = Math.round(this.g + (this.targetG - this.g) * p * 0.1);
    this.b = Math.round(this.b + (this.targetB - this.b) * p * 0.1);
  }
}

function getTextPixels(ctx, text, fontSize, color) {
  // Clear canvas
  ctx.fillStyle = `rgb(${BACKGROUND.r}, ${BACKGROUND.g}, ${BACKGROUND.b})`;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw text
  ctx.fillStyle = "white";
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, WIDTH / 2, HEIGHT / 2);

  // Get pixel data
  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
  const pixels = imageData.data;

  const positions = [];
  const pixelStep = 4; // Sample every 4th pixel for performance

  for (let y = 0; y < HEIGHT; y += pixelStep) {
    for (let x = 0; x < WIDTH; x += pixelStep) {
      const i = (y * WIDTH + x) * 4;
      if (pixels[i] > 128) {
        // White pixel = text
        positions.push({ x, y, color });
      }
    }
  }

  return positions;
}

function createParticles(textPositions) {
  const particles = [];

  for (const pos of textPositions) {
    const particle = new Particle();

    // Start from random position outside (closer for faster convergence)
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 200 + 200; // Closer start
    particle.x = WIDTH / 2 + Math.cos(angle) * distance;
    particle.y = HEIGHT / 2 + Math.sin(angle) * distance;

    particle.targetX = pos.x;
    particle.targetY = pos.y;

    // Random starting color
    const startColor = Math.random() > 0.5 ? COLORS.legal : COLORS.tech;
    particle.r = startColor.r;
    particle.g = startColor.g;
    particle.b = startColor.b;

    // Target color based on word
    particle.targetR = pos.color.r;
    particle.targetG = pos.color.g;
    particle.targetB = pos.color.b;

    particle.size = Math.random() * 2 + 2;
    particle.maxSpeed = Math.random() * 8 + 18; // Fast but smooth
    particle.maxForce = Math.random() * 0.5 + 1; // Variable smoothness
    particle.colorSpeed = Math.random() * 0.04 + 0.03;

    particles.push(particle);
  }

  return particles;
}

function renderFrame(ctx, particles, alpha = 0.15) {
  // Motion blur effect
  ctx.fillStyle = `rgba(${BACKGROUND.r}, ${BACKGROUND.g}, ${BACKGROUND.b}, ${alpha})`;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw particles
  for (const p of particles) {
    ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  }
}

async function generateGif() {
  console.log("Generating OG GIF...");
  console.log(`Size: ${WIDTH}x${HEIGHT}, FPS: ${FPS}, Duration: ${DURATION_SECONDS}s`);

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // Create GIF encoder
  const encoder = new GIFEncoder(WIDTH, HEIGHT, "neuquant", true);
  const outputPath = join(__dirname, "../public/og-image.gif");
  const writeStream = createWriteStream(outputPath);

  encoder.createReadStream().pipe(writeStream);
  encoder.start();
  encoder.setDelay(Math.round(1000 / FPS));
  encoder.setQuality(10); // Lower = better quality
  encoder.setRepeat(0); // Loop forever

  // Get text positions for "ЮРАЛЬЯНС" (gold color - legal)
  const fontSize = 110;
  const textPositions = getTextPixels(ctx, "ЮРАЛЬЯНС", fontSize, COLORS.legal);
  console.log(`Particles: ${textPositions.length}`);

  // Create particles
  const particles = createParticles(textPositions);

  // Clear to background
  ctx.fillStyle = `rgb(${BACKGROUND.r}, ${BACKGROUND.g}, ${BACKGROUND.b})`;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Render frames
  for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
    // Update particles
    for (const p of particles) {
      p.update();
    }

    // Smooth motion blur - lower alpha = more trail = smoother look
    const alpha = frame < TOTAL_FRAMES - 8 ? 0.12 : 0.3;
    renderFrame(ctx, particles, alpha);

    // Add frame to GIF
    encoder.addFrame(ctx);

    if ((frame + 1) % 10 === 0) {
      console.log(`Frame ${frame + 1}/${TOTAL_FRAMES}`);
    }
  }

  encoder.finish();

  return new Promise((resolve) => {
    writeStream.on("finish", () => {
      console.log(`\nGIF saved to: ${outputPath}`);
      resolve(outputPath);
    });
  });
}

// Run
generateGif().catch(console.error);
