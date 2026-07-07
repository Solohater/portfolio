const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const imgPath = path.join(__dirname, '..', 'public', 'photojo.jpg');
const imgBase64 = fs.readFileSync(imgPath).toString('base64');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page { margin: 0.4in; size: A4; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: #000;
    line-height: 1.35;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .header {
    display: flex;
    gap: 20px;
    align-items: center;
    padding-bottom: 14px;
    border-bottom: 3px solid #006b3d;
    margin-bottom: 14px;
  }
  .header-content { flex: 1; }
  .header h1 { font-size: 26px; color: #000; margin: 0; }
  .header .title { font-size: 15px; color: #006b3d; font-weight: 600; margin: 3px 0; }
  .header .contact { font-size: 11px; color: #000; display: flex; flex-wrap: wrap; gap: 14px; margin-top: 5px; }
  .header .contact a { color: #000; text-decoration: none; border-bottom: 1px solid #ccc; }
  .photo { width: 72px; height: 72px; border-radius: 50%; overflow: hidden; border: 2px solid #006b3d; flex-shrink: 0; }
  .photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .summary { font-size: 12px; color: #000; margin-bottom: 14px; line-height: 1.45; }
  .section { margin-bottom: 12px; }
  .section-title {
    font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
    display: flex; align-items: center; gap: 7px; margin-bottom: 7px; color: #000;
  }
  .section-title .bar { width: 4px; height: 15px; background: #006b3d; border-radius: 2px; display: inline-block; }
  .exp-item { margin-bottom: 8px; }
  .exp-header { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
  .exp-header h3 { font-size: 13px; font-weight: 700; color: #000; }
  .exp-company { font-size: 11px; color: #006b3d; font-weight: 600; }
  .exp-period { font-size: 10px; color: #000; margin-left: auto; white-space: nowrap; }
  .exp-desc { font-size: 11px; color: #000; margin-top: 2px; line-height: 1.4; }
  .exp-points { margin: 4px 0 0 16px; }
  .exp-points li { font-size: 10.5px; color: #000; line-height: 1.4; margin-bottom: 1px; }
  .edu-item { margin-bottom: 6px; }
  .edu-header { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
  .edu-header h3 { font-size: 13px; font-weight: 700; color: #000; }
  .edu-school { font-size: 11px; color: #006b3d; font-weight: 600; }
  .edu-period { font-size: 10px; color: #000; margin-left: auto; white-space: nowrap; }
  .edu-desc { font-size: 11px; color: #000; margin-top: 2px; }
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 20px; }
  .skill-group { margin-bottom: 2px; }
  .skill-group h4 { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #000; border-bottom: 1px solid #ddd; padding-bottom: 1px; margin-bottom: 2px; }
  .skill-group p { font-size: 10.5px; color: #000; }
</style>
</head>
<body>
  <div class="header">
    <div class="photo"><img src="data:image/jpeg;base64,${imgBase64}" alt="Yoseph Ayalew"></div>
    <div class="header-content">
      <h1>Yoseph Ayalew</h1>
      <div class="title">Software Engineer</div>
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
    Computer Science graduate and Junior Software Developer with professional experience building full-stack web applications using <strong>Java, Vert.x, Angular, PostgreSQL,</strong> and <strong>SQL</strong>. Skilled in frontend and backend development, debugging, testing, and collaboration with Git and GitLab. Currently expanding backend expertise with <strong>Go</strong>.
  </div>

  <div class="section">
    <div class="section-title"><span class="bar"></span>Experience</div>
    <div class="exp-item">
      <div class="exp-header">
        <h3>Junior Software Developer</h3>
        <span class="exp-company">eTech SC</span>
        <span class="exp-period">Mar 2026 &ndash; Present</span>
      </div>
      <div class="exp-desc">Developing and maintaining software features across the full stack.</div>
      <ul class="exp-points">
        <li>Build and improve frontend components using Angular</li>
        <li>Develop backend APIs and services using Java and Vert.x</li>
        <li>Work with PostgreSQL databases and write complex SQL queries</li>
        <li>Debug, test, and resolve software defects</li>
        <li>Collaborate with developers using Git and GitLab; participate in code reviews</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title"><span class="bar"></span>Education</div>
    <div class="edu-item">
      <div class="edu-header">
        <h3>BSc in Computer Science</h3>
        <span class="edu-school">St. Mary's University &mdash; Addis Ababa</span>
        <span class="edu-period">2020 &ndash; 2023</span>
      </div>
      <div class="edu-desc">Focused on software development, algorithms, database systems, and data structures.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title"><span class="bar"></span>Technical Skills</div>
    <div class="skills-grid">
      <div class="skill-group">
        <h4>Languages</h4>
        <p>Java, JavaScript, TypeScript, SQL, Go</p>
      </div>
      <div class="skill-group">
        <h4>Backend</h4>
        <p>Vert.x, Node.js, Express.js, REST APIs, JWT</p>
      </div>
      <div class="skill-group">
        <h4>Frontend</h4>
        <p>Angular, React, Next.js, Tailwind CSS, Redux, Material UI</p>
      </div>
      <div class="skill-group">
        <h4>Databases</h4>
        <p>PostgreSQL, MongoDB</p>
      </div>
      <div class="skill-group">
        <h4>Tools &amp; Platforms</h4>
        <p>Git, GitLab, GitHub, Postman, Figma, Vercel, Render</p>
      </div>
    </div>
  </div>
</body>
</html>`;

const htmlPath = path.join(__dirname, '..', 'public', 'cv-temp.html');
const pdfPath = path.join(__dirname, '..', 'public', 'cv.pdf');

fs.writeFileSync(htmlPath, html);

try {
  execSync(
    `google-chrome --headless --disable-gpu --no-sandbox --print-to-pdf="${pdfPath}" "${htmlPath}"`,
    { timeout: 15000, stdio: 'pipe' }
  );
  console.log('PDF generated at public/cv.pdf');
} catch (e) {
  console.error('PDF generation failed:', e.message);
} finally {
  try { fs.unlinkSync(htmlPath); } catch {}
}
