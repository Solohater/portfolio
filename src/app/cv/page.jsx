'use client';

const experience = [
  {
    period: 'Mar 2026 – Present',
    title: 'Junior Software Developer',
    company: 'eTech SC',
    desc: 'Developing full-stack features using Java, Vert.x, Angular, and PostgreSQL. Debugging, testing, and collaborating via Git/GitLab.',
  },
];

const education = [
  {
    period: '2020 – 2023',
    degree: 'BSc in Computer Science',
    school: "St. Mary's University",
  },
];

const skillGroups = [
  { category: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'SQL', 'Go'] },
  { category: 'Frontend', items: ['Angular', 'React', 'Next.js', 'Tailwind CSS', 'Redux', 'Material UI'] },
  { category: 'Backend', items: ['Vert.x', 'Node.js', 'Express.js', 'REST APIs', 'JWT'] },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB'] },
  { category: 'Tools', items: ['Git', 'GitLab', 'GitHub', 'Postman', 'Figma', 'Vercel', 'Render'] },
];

export default function CVPage() {
  return (
    <div className="min-h-screen px-4 pt-20 pb-6 print:p-0">
      <div className="max-w-[210mm] mx-auto" style={{ background: 'var(--bg)' }}>
        {/* Header */}
        <div className="flex items-start gap-4 pb-3 mb-4" style={{ borderBottom: '2px solid var(--accent)' }}>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>Yoseph Ayalew</h1>
            <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>Junior Software Engineer</p>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-[11px]" style={{ color: 'var(--text)' }}>
              <span>yosefayalew56@gmail.com</span>
              <span>Addis Ababa, Ethiopia</span>
              <a href="https://github.com/Solohater" target="_blank" style={{ color: 'var(--accent)' }}>GitHub</a>
              <a href="https://gitlab.com/yosephh" target="_blank" style={{ color: 'var(--accent)' }}>GitLab</a>
              <a href="https://linkedin.com/in/yoseph-ayalew-65247b291" target="_blank" style={{ color: 'var(--accent)' }}>LinkedIn</a>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2" style={{ boxShadow: '0 0 0 2px var(--accent)' }}>
            <img src="/photojo.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Summary */}
        <p className="text-[12px] leading-snug mb-4" style={{ color: 'var(--text)' }}>
          Computer Science graduate with professional experience building full-stack web applications using Java, Vert.x, Angular, React, and PostgreSQL. Quick learner with a focus on clean, maintainable code.
        </p>

        {/* Experience */}
        <section className="mb-3">
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1 h-4 rounded-sm inline-block" style={{ background: 'var(--accent)' }} />
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <div className="flex items-baseline gap-2">
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-h)' }}>{exp.title}</h3>
                <span className="text-[11px] font-mono" style={{ color: 'var(--accent)' }}>{exp.company}</span>
                <span className="text-[10px] ml-auto shrink-0 font-mono" style={{ color: 'var(--text)' }}>{exp.period}</span>
              </div>
              <p className="text-[12px] leading-snug mt-0.5" style={{ color: 'var(--text)' }}>{exp.desc}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-3">
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1 h-4 rounded-sm inline-block" style={{ background: 'var(--accent)' }} />
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex items-baseline gap-2">
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-h)' }}>{edu.degree}</h3>
                <span className="text-[11px]" style={{ color: 'var(--accent)' }}>{edu.school}</span>
                <span className="text-[10px] ml-auto shrink-0 font-mono" style={{ color: 'var(--text)' }}>{edu.period}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1 h-4 rounded-sm inline-block" style={{ background: 'var(--accent)' }} />
            Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
            {skillGroups.map((g) => (
              <div key={g.category}>
                <h3 className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--accent)' }}>{g.category}</h3>
                <p className="text-[11px]" style={{ color: 'var(--text)' }}>{g.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Print styles */}
        <style jsx global>{`
          @media print {
            @page { margin: 0.5in; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            nav, footer { display: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
