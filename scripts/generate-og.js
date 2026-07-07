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
    background: #0a0a0f;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 80px;
    position: relative;
    overflow: hidden;
  }

  /* Grid background */
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(57,255,20,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(57,255,20,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* Glowing orbs */
  .orb1 { position: absolute; top: -150px; right: -100px; width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(57,255,20,0.12) 0%, transparent 70%); }
  .orb2 { position: absolute; bottom: -100px; left: -80px; width: 350px; height: 350px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,150,255,0.08) 0%, transparent 70%); }

  /* Vertical accent bar */
  .accent-bar { position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: linear-gradient(180deg, #39ff14, #00ff88, #39ff14);
    box-shadow: 0 0 20px rgba(57,255,20,0.4); }

  /* Floating code lines */
  .code-line { position: absolute; font-family: 'Courier New', monospace; font-size: 11px; color: rgba(57,255,20,0.15); letter-spacing: 0; white-space: nowrap; }
  .cl1 { top: 40px; right: 60px; }
  .cl2 { bottom: 50px; left: 100px; }
  .cl3 { top: 200px; right: 100px; font-size: 10px; color: rgba(57,255,20,0.1); }
  .cl4 { bottom: 100px; right: 150px; }
  .cl5 { top: 100px; left: 80px; font-size: 10px; color: rgba(57,255,20,0.08); }

  /* Name */
  h1 {
    font-size: 68px; font-weight: 800; color: #fff;
    margin-bottom: 6px; letter-spacing: -1px; position: relative; z-index: 2;
    text-shadow: 0 0 40px rgba(57,255,20,0.2);
  }
  h1 .highlight { color: #39ff14; text-shadow: 0 0 30px rgba(57,255,20,0.5); }

  /* Title */
  .title-row { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; position: relative; z-index: 2; }
  .title {
    font-size: 26px; color: #39ff14; font-weight: 600;
    text-shadow: 0 0 20px rgba(57,255,20,0.3);
  }
  .title-dot { width: 6px; height: 6px; border-radius: 50%; background: #39ff14; box-shadow: 0 0 10px #39ff14; animation: pulse 2s infinite; }

  /* Tags */
  .tags { display: flex; gap: 10px; flex-wrap: wrap; position: relative; z-index: 2; margin-bottom: 28px; }
  .tag {
    padding: 7px 18px; border-radius: 20px; font-size: 13px; font-weight: 500;
    background: rgba(57,255,20,0.08); color: #39ff14;
    border: 1px solid rgba(57,255,20,0.25);
    box-shadow: 0 0 15px rgba(57,255,20,0.05);
  }
  .tag:nth-child(2) { border-color: rgba(57,255,20,0.4); }
  .tag:nth-child(5) { border-color: rgba(0,150,255,0.3); }

  /* Bottom bar */
  .bottom-bar {
    position: relative; z-index: 2; display: flex; align-items: center; gap: 16px;
    padding-top: 20px; border-top: 1px solid rgba(57,255,20,0.12);
  }
  .bottom-bar span { font-size: 14px; color: rgba(255,255,255,0.5); }
  .bottom-bar .loc { color: rgba(57,255,20,0.6); }

  /* Status dot */
  .status { display: flex; align-items: center; gap: 6px; font-size: 12px; color: rgba(255,255,255,0.4); }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #39ff14; box-shadow: 0 0 8px #39ff14; }

  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="orb1"></div>
  <div class="orb2"></div>
  <div class="accent-bar"></div>

  <div class="code-line cl1">const dev = { name: &quot;Yoseph&quot;, role: &quot;SWE&quot; };</div>
  <div class="code-line cl2">while(alive) { code(); learn(); grow(); }</div>
  <div class="code-line cl3">System.out.println(&quot;Hello, World!&quot;);</div>
  <div class="code-line cl4">git commit -m &quot;build: portfolio v2&quot;</div>
  <div class="code-line cl5">SELECT * FROM skills WHERE proficiency &gt; 90;</div>

  <h1>Yoseph <span class="highlight">Ayalew</span></h1>

  <div class="title-row">
    <span class="title">Junior Software Engineer</span>
    <span class="title-dot"></span>
    <span class="status"><span class="status-dot"></span> Open to work</span>
  </div>

  <div class="tags">
    <span class="tag">Java</span>
    <span class="tag">Angular</span>
    <span class="tag">React</span>
    <span class="tag">Next.js</span>
    <span class="tag">PostgreSQL</span>
    <span class="tag">Vert.x</span>
    <span class="tag">TypeScript</span>
  </div>

  <div class="bottom-bar">
    <span class="loc">✦ Addis Ababa, Ethiopia</span>
    <span>✦ Full-Stack Developer</span>
    <span>✦ portfolio-7ypn.onrender.com</span>
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
