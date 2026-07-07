const { execSync } = require('child_process');
const path = require('path');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page { margin: 0.4in; size: A4; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: #1a1a2e;
    line-height: 1.3;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .header {
    display: flex;
    gap: 16px;
    align-items: start;
    padding-bottom: 12px;
    border-bottom: 3px solid #39ff14;
    margin-bottom: 12px;
  }
  .header-content { flex: 1; }
  .header h1 { font-size: 24px; margin: 0; }
  .header .title { font-size: 14px; color: #39ff14; font-weight: 600; margin: 2px 0; }
  .header .contact { font-size: 10px; color: #4a4a6a; display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px; }
  .header .contact a { color: #39ff14; text-decoration: none; }
  .photo { width: 60px; height: 60px; border-radius: 50%; overflow: hidden; border: 2px solid #39ff14; flex-shrink: 0; }
  .photo img { width: 100%; height: 100%; object-fit: cover; }
  .summary { font-size: 11px; color: #4a4a6a; margin-bottom: 12px; line-height: 1.4; }
  .section { margin-bottom: 10px; }
  .section-title {
    font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
    display: flex; align-items: center; gap: 6px; margin-bottom: 6px; color: #1a1a2e;
  }
  .section-title .bar { width: 4px; height: 14px; background: #39ff14; border-radius: 2px; display: inline-block; }
  .exp-item { margin-bottom: 6px; }
  .exp-header { display: flex; align-items: baseline; gap: 6px; }
  .exp-header h3 { font-size: 12px; font-weight: 700; color: #1a1a2e; }
  .exp-company { font-size: 10px; color: #39ff14; font-weight: 600; }
  .exp-period { font-size: 9px; color: #4a4a6a; margin-left: auto; white-space: nowrap; }
  .exp-desc { font-size: 10px; color: #4a4a6a; margin-top: 1px; }
  .edu-item { margin-bottom: 4px; }
  .edu-header { display: flex; align-items: baseline; gap: 6px; }
  .edu-header h3 { font-size: 12px; font-weight: 700; color: #1a1a2e; }
  .edu-school { font-size: 10px; color: #39ff14; font-weight: 600; }
  .edu-period { font-size: 9px; color: #4a4a6a; margin-left: auto; white-space: nowrap; }
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
  .skill-group h4 { font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; color: #39ff14; margin-bottom: 1px; }
  .skill-group p { font-size: 10px; color: #4a4a6a; }
</style>
</head>
<body>
  <div class="header">
    <div class="header-content">
      <h1>Yoseph Ayalew</h1>
      <div class="title">Junior Software Engineer</div>
      <div class="contact">
        <span>yosefayalew56@gmail.com</span>
        <span>Addis Ababa, Ethiopia</span>
        <a href="https://github.com/Solohater">GitHub</a>
        <a href="https://gitlab.com/yosephh">GitLab</a>
        <a href="https://linkedin.com/in/yoseph-ayalew-65247b291">LinkedIn</a>
      </div>
    </div>
  </div>

  <div class="summary">
    Motivated Computer Science graduate and Junior Software Developer with professional experience building web applications using <strong>Java, Vert.x, Angular, PostgreSQL,</strong> and <strong>SQL</strong>. Skilled in full-stack development, debugging, testing, and collaboration. Currently expanding backend expertise with <strong>Go</strong>.
  </div>

  <div class="section">
    <div class="section-title"><span class="bar"></span>Experience</div>
    <div class="exp-item">
      <div class="exp-header">
        <h3>Junior Software Developer</h3>
        <span class="exp-company">eTech SC</span>
        <span class="exp-period">Mar 2026 &ndash; Present</span>
      </div>
      <div class="exp-desc">Developing full-stack features using Java, Vert.x, Angular, and PostgreSQL. Debugging, testing, and collaborating via Git/GitLab. Participating in code reviews and feature implementation.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title"><span class="bar"></span>Education</div>
    <div class="edu-item">
      <div class="edu-header">
        <h3>BSc in Computer Science</h3>
        <span class="edu-school">St. Mary's University</span>
        <span class="edu-period">2020 &ndash; 2023</span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title"><span class="bar"></span>Skills</div>
    <div class="skills-grid">
      <div class="skill-group">
        <h4>Languages</h4>
        <p>Java, JavaScript, TypeScript, SQL, Go</p>
      </div>
      <div class="skill-group">
        <h4>Frontend</h4>
        <p>Angular, React, Next.js, Tailwind CSS, Redux, Material UI</p>
      </div>
      <div class="skill-group">
        <h4>Backend</h4>
        <p>Vert.x, Node.js, Express.js, REST APIs, JWT</p>
      </div>
      <div class="skill-group">
        <h4>Databases</h4>
        <p>PostgreSQL, MongoDB</p>
      </div>
      <div class="skill-group">
        <h4>Tools</h4>
        <p>Git, GitLab, GitHub, Postman, Figma, Vercel, Render</p>
      </div>
    </div>
  </div>
</body>
</html>`;

const htmlPath = path.join(__dirname, '..', 'public', 'cv-temp.html');
const pdfPath = path.join(__dirname, '..', 'public', 'cv.pdf');

require('fs').writeFileSync(htmlPath, html);

try {
  execSync(
    `google-chrome --headless --disable-gpu --no-sandbox --print-to-pdf="${pdfPath}" "${htmlPath}"`,
    { timeout: 15000, stdio: 'pipe' }
  );
  console.log('PDF generated at public/cv.pdf');
} catch (e) {
  console.error('PDF generation failed:', e.message);
} finally {
  try { require('fs').unlinkSync(htmlPath); } catch {}
}
