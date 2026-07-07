const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #000;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }

  /* Main orb */
  .orb {
    width: 340px; height: 340px;
    border-radius: 50%;
    position: relative;
    background: radial-gradient(circle at 35% 30%, rgba(57,255,20,0.4), rgba(0,20,0,0.9) 60%, #000 100%);
    box-shadow:
      0 0 100px rgba(57,255,20,0.15),
      0 0 200px rgba(57,255,20,0.08),
      inset 0 0 80px rgba(0,0,0,0.5);
  }

  /* Glowing ring around orb */
  .orb::before {
    content: '';
    position: absolute; inset: -4px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent, rgba(57,255,20,0.3), rgba(57,255,20,0.6), rgba(57,255,20,0.3), transparent);
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 1px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 1px));
    animation: spin 4s linear infinite;
  }

  /* Second ring (outer, slower) */
  .orb::after {
    content: '';
    position: absolute; inset: -12px;
    border-radius: 50%;
    background: conic-gradient(from 180deg, transparent, rgba(57,255,20,0.1), rgba(57,255,20,0.3), rgba(57,255,20,0.1), transparent);
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1px), #fff calc(100%));
    mask: radial-gradient(farthest-side, transparent calc(100% - 1px), #fff calc(100%));
    animation: spin 6s linear reverse infinite;
    opacity: 0.5;
  }

  /* Shine highlight */
  .shine {
    position: absolute; top: 15%; left: 20%; width: 80px; height: 50px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%);
    transform: rotate(-30deg);
  }

  /* Letters Y and A moving around */
  .letter {
    position: absolute;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 64px; font-weight: 800;
    color: rgba(57,255,20,0.6);
    text-shadow: 0 0 30px rgba(57,255,20,0.3);
  }

  .y {
    top: 50%; left: 50%;
    transform: translate(-100%, -50%);
    margin-left: -20px;
    color: rgba(57,255,20,0.8);
    text-shadow: 0 0 40px rgba(57,255,20,0.4);
  }

  .a {
    top: 50%; left: 50%;
    transform: translate(0, -50%);
    margin-left: 20px;
    color: rgba(57,255,20,0.8);
    text-shadow: 0 0 40px rgba(57,255,20,0.4);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
</head>
<body>
  <div class="orb">
    <div class="shine"></div>
    <span class="letter y">Y</span>
    <span class="letter a">A</span>
  </div>
</body>
</html>`;

const htmlPath = path.join(__dirname, '..', 'public', 'og-temp.html');
const pngPath = path.join(__dirname, '..', 'public', 'og-image.png');

fs.writeFileSync(htmlPath, html);

try {
  execSync(
    `google-chrome --headless --disable-gpu --no-sandbox --screenshot="${pngPath}" --window-size=1200,630 "${htmlPath}"`,
    { timeout: 15000, stdio: 'pipe' }
  );
  console.log('OG image generated at public/og-image.png');
} catch (e) {
  console.error('OG image generation failed:', e.message);
} finally {
  try { fs.unlinkSync(htmlPath); } catch {}
}
