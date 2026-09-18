'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const experience = [
  {
    period: 'Mar 2026 – Present',
    title: 'Junior Software Developer',
    company: 'eTech SC',
    desc: 'Developing and maintaining full-stack software features using Java, Vert.x, Angular, and PostgreSQL. Collaborating via Git/GitLab, debugging, testing, and participating in code reviews.',
  },
];

const education = [
  {
    period: '2020 – 2023',
    degree: 'BSc in Computer Science',
    school: "St. Mary's University",
    desc: 'Focused on software development, algorithms, and database systems.',
  },
];

const skills = [
  { category: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'SQL', 'Go'] },
  { category: 'Frontend', items: ['Angular', 'React', 'Next.js', 'Tailwind CSS', 'Redux', 'Material UI'] },
  { category: 'Backend', items: ['Vert.x', 'Node.js', 'Express.js', 'REST APIs', 'JWT'] },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB'] },
  { category: 'Tools', items: ['Git', 'GitLab', 'GitHub', 'Postman', 'Figma', 'Vercel', 'Render'] },
];

export default function CVPage() {
  const { mode } = useContext(ThemeContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 pt-8 pb-16"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[var(--border)]">
            <Image src={mode === "dark" ? "/darkimg.png" : "/lightimg.png"} alt="Yoseph Ayalew" width={100} height={100} className="w-24 h-24 rounded-full object-cover object-top shrink-0 ring-2 ring-[var(--border)]" />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: 'var(--text-h)' }}>Yoseph Ayalew</h1>
              <p className="text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--accent-text)' }}>Software Engineer</p>
              <p className="text-base sm:text-lg max-w-lg leading-relaxed" style={{ color: 'var(--text)' }}>
                Computer Science graduate with professional experience building full-stack web applications.
                Skilled in Java, Vert.x, Angular, React, PostgreSQL, and modern web technologies.
              </p>
              <div className="flex flex-wrap gap-3.5 mt-3.5 justify-center sm:justify-start text-xs sm:text-sm font-medium">
                <span style={{ color: 'var(--text)' }}>yosefayalew56@gmail.com</span>
                <span style={{ color: 'var(--text)' }}>Addis Ababa, Ethiopia</span>
                <a href="https://github.com/Solohater" target="_blank" className="font-semibold hover:underline" style={{ color: 'var(--accent-text)' }}>GitHub</a>
                <a href="https://gitlab.com/yosephh" target="_blank" className="font-semibold hover:underline" style={{ color: 'var(--accent-text)' }}>GitLab</a>
                <a href="https://www.linkedin.com/in/yoseph-ayalew-65247b291" target="_blank" className="font-semibold hover:underline" style={{ color: 'var(--accent-text)' }}>LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Summary */}
          <p className="text-base sm:text-lg leading-relaxed pt-5" style={{ color: 'var(--text)' }}>
            Full-Stack Software Engineer with professional experience designing and building performant web applications using <strong>Java, Vert.x, Angular, React,</strong> and <strong>PostgreSQL</strong>. Passionate about clean architecture, crafting robust backend APIs, and building responsive, intuitive user interfaces that deliver real-world impact.
          </p>
        </div>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1.5 h-6 rounded-sm inline-block" style={{ background: 'var(--accent-text)' }} />
            Experience
          </h2>
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-5 sm:p-6 rounded-xl mb-4 glass-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h3 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-h)' }}>{exp.title}</h3>
                <span className="text-xs sm:text-sm font-mono font-semibold px-3 py-1 rounded-full border border-[var(--accent-border)] self-start sm:self-center" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>{exp.company}</span>
              </div>
              <p className="text-xs sm:text-sm mb-2.5 font-mono" style={{ color: 'var(--text)' }}>{exp.period}</p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>{exp.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1.5 h-6 rounded-sm inline-block" style={{ background: 'var(--accent-text)' }} />
            Education
          </h2>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-5 sm:p-6 rounded-xl mb-4 glass-card"
            >
              <h3 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-h)' }}>{edu.degree}</h3>
              <p className="text-base font-semibold" style={{ color: 'var(--accent-text)' }}>{edu.school}</p>
              <p className="text-xs sm:text-sm mb-2.5 font-mono" style={{ color: 'var(--text)' }}>{edu.period}</p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>{edu.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1.5 h-6 rounded-sm inline-block" style={{ background: 'var(--accent-text)' }} />
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((group) => (
              <div key={group.category} className="p-5 rounded-xl glass-card">
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-text)' }}>{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold border border-[var(--accent-border)] transition-transform hover:scale-105 cursor-default" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Download hint */}
        <p className="text-center text-xs mt-8" style={{ color: 'var(--text)' }}>
          <a href="/cv.pdf" download className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition hover:opacity-90" style={{ background: 'var(--text-h)', color: 'var(--bg)' }}>
            Download PDF
          </a>
        </p>

        {/* Print styles */}
        <style jsx global>{`
          @media print {
            @page { margin: 0.5in; size: A4; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            nav, footer { display: none !important; }
            .min-h-screen { min-height: auto !important; }
          }
        `}</style>
      </div>
    </motion.div>
  );
}
