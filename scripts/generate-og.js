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
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    background: #0a0a0f;
  }

  /* Holographic gradient background */
  .bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 20% 50%, #0d1a0d 0%, #0a0a0f 50%, #0a0a1a 100%);
  }
  .bg-glow1 {
    position: absolute; top: -120px; right: -80px; width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(57,255,20,0.15) 0%, transparent 70%);
  }
  .bg-glow2 {
    position: absolute; bottom: -150px; left: -100px; width: 450px; height: 450px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(100,0,255,0.1) 0%, transparent 70%);
  }
  .bg-glow3 {
    position: absolute; top: 50%; left: 60%; width: 300px; height: 300px;
    border-radius: 50%; transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(0,200,255,0.06) 0%, transparent 70%);
  }

  /* Subtle grid */
  .grid {
    position: absolute; inset: 0;
    opacity: 0.3;
    background-image:
      linear-gradient(rgba(57,255,20,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(57,255,20,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  /* Floating particles */
  .p { position: absolute; border-radius: 50%; background: #39ff14; }
  .p1 { width: 4px; height: 4px; top: 15%; left: 10%; opacity: 0.4; box-shadow: 0 0 6px #39ff14; }
  .p2 { width: 3px; height: 3px; top: 25%; right: 15%; opacity: 0.3; box-shadow: 0 0 4px #39ff14; }
  .p3 { width: 5px; height: 5px; bottom: 20%; left: 20%; opacity: 0.35; box-shadow: 0 0 8px #39ff14; }
  .p4 { width: 3px; height: 3px; bottom: 30%; right: 25%; opacity: 0.25; }
  .p5 { width: 4px; height: 4px; top: 50%; left: 5%; opacity: 0.3; box-shadow: 0 0 6px #39ff14; }

  /* ---- Glass Card ---- */
  .card {
    position: relative; z-index: 10;
    width: 800px; height: 420px;
    border-radius: 32px;
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(57,255,20,0.15);
    box-shadow:
      0 30px 80px rgba(0,0,0,0.5),
      0 0 0 1px rgba(57,255,20,0.05),
      inset 0 1px 0 rgba(255,255,255,0.05);
    display: flex; align-items: center; padding: 50px 60px;
    gap: 50px;
  }

  /* Card reflection line */
  .card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(57,255,20,0.2), transparent);
  }

  /* ---- 3D Coin / Badge ---- */
  .badge {
    width: 180px; height: 180px; flex-shrink: 0;
    border-radius: 50%;
    position: relative;
    background: conic-gradient(from 45deg, #1a1a2e, #39ff14, #00ff88, #1a1a2e);
    box-shadow:
      0 0 60px rgba(57,255,20,0.2),
      0 20px 50px rgba(0,0,0,0.4),
      inset 0 0 30px rgba(0,0,0,0.3);
    display: flex; align-items: center; justify-content: center;
  }
  .badge-inner {
    width: 150px; height: 150px; border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, rgba(20,20,40,0.9), rgba(10,10,20,0.95));
    border: 1px solid rgba(57,255,20,0.3);
    box-shadow: inset 0 0 40px rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    font-size: 56px; font-weight: 800;
    color: #39ff14;
    text-shadow: 0 0 30px rgba(57,255,20,0.4);
    letter-spacing: -2px;
  }
  /* Shine on badge */
  .badge-shine {
    position: absolute; top: -20px; left: -20px; width: 80px; height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
  }
  /* Shadow under badge (floating effect) */
  .badge-shadow {
    position: absolute; bottom: -12px; left: 10%; width: 80%; height: 20px;
    background: radial-gradient(ellipse, rgba(57,255,20,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  /* ---- Text ---- */
  .text-content { flex: 1; }
  .text-content h2 {
    font-size: 20px; font-weight: 500; color: rgba(255,255,255,0.4);
    letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4px;
  }
  .text-content h1 {
    font-size: 48px; font-weight: 800; color: #fff;
    margin-bottom: 4px; letter-spacing: -0.5px;
  }
  .text-content h1 .green { color: #39ff14; }
  .text-content .role {
    font-size: 20px; font-weight: 500; color: rgba(255,255,255,0.6);
    margin-bottom: 20px;
  }
  .text-content .role span { color: #39ff14; }

  /* Tags row */
  .tags { display: flex; gap: 8px; flex-wrap: wrap; }
  .tag {
    padding: 5px 14px; border-radius: 14px; font-size: 12px; font-weight: 500;
    background: rgba(57,255,20,0.06); color: rgba(57,255,20,0.7);
    border: 1px solid rgba(57,255,20,0.12);
  }
  .tag.active {
    background: rgba(57,255,20,0.12); color: #39ff14;
    border-color: rgba(57,255,20,0.3);
  }

  /* Bottom watermark */
  .watermark {
    position: absolute; bottom: 20px; right: 30px;
    font-size: 11px; color: rgba(255,255,255,0.1);
    letter-spacing: 1px; font-weight: 300;
  }
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="bg-glow1"></div>
  <div class="bg-glow2"></div>
  <div class="bg-glow3"></div>
  <div class="grid"></div>
  <div class="p p1"></div><div class="p p2"></div><div class="p p3"></div><div class="p p4"></div><div class="p p5"></div>

  <div class="card">
    <div class="badge">
      <div class="badge-shine"></div>
      <div class="badge-inner">YA</div>
      <div class="badge-shadow"></div>
    </div>

    <div class="text-content">
      <h2>Portfolio</h2>
      <h1>Yoseph <span class="green">Ayalew</span></h1>
      <div class="role"><span>Junior Software Engineer</span> &bull; Full-Stack Developer</div>
      <div class="tags">
        <span class="tag active">Java</span>
        <span class="tag active">Angular</span>
        <span class="tag active">React</span>
        <span class="tag active">Next.js</span>
        <span class="tag active">PostgreSQL</span>
        <span class="tag active">Vert.x</span>
        <span class="tag">TypeScript</span>
        <span class="tag">Go</span>
      </div>
    </div>
  </div>

  <div class="watermark">portfolio-7ypn.onrender.com</div>
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
