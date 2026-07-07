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
    background: #0f0f15;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 80px;
    position: relative;
    overflow: hidden;
  }
  .accent-bar { position: absolute; top: 0; left: 0; width: 8px; height: 100%; background: #39ff14; }
  .accent-line { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: #39ff14; }
  h1 { font-size: 64px; font-weight: 800; color: #fff; margin-bottom: 8px; letter-spacing: -1px; }
  .title { font-size: 28px; color: #39ff14; font-weight: 600; margin-bottom: 20px; }
  .tags { display: flex; gap: 10px; flex-wrap: wrap; }
  .tag { padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; background: rgba(57, 255, 20, 0.12); color: #39ff14; border: 1px solid rgba(57, 255, 20, 0.3); }
  .subtitle { font-size: 16px; color: #888; margin-top: 24px; }
  .glow { position: absolute; right: -100px; top: -100px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%); }
</style>
</head>
<body>
  <div class="accent-bar"></div>
  <div class="accent-line"></div>
  <div class="glow"></div>
  <h1>Yoseph Ayalew</h1>
  <div class="title">Junior Software Engineer</div>
  <div class="tags">
    <span class="tag">Java</span>
    <span class="tag">Angular</span>
    <span class="tag">React</span>
    <span class="tag">Next.js</span>
    <span class="tag">PostgreSQL</span>
    <span class="tag">Vert.x</span>
  </div>
  <div class="subtitle">Full-Stack Developer &bull; Addis Ababa, Ethiopia</div>
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
