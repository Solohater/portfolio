'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 py-24 md:py-28"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 pb-8" style={{ borderBottom: '2px solid var(--border)' }}>
          <Image src="/photojo.jpg" alt="Yoseph Ayalew" width={100} height={100} className="w-24 h-24 rounded-full object-cover ring-2" style={{ ringColor: 'var(--accent)' }} />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-h)' }}>Yoseph Ayalew</h1>
            <p className="text-lg font-medium mb-2" style={{ color: 'var(--accent)' }}>Junior Software Engineer</p>
            <p className="text-sm max-w-lg" style={{ color: 'var(--text)' }}>
              Computer Science graduate with professional experience building full-stack web applications.
              Skilled in Java, Vert.x, Angular, React, PostgreSQL, and modern web technologies.
            </p>
            <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start text-xs">
              <span style={{ color: 'var(--text)' }}>yosefayalew56@gmail.com</span>
              <span style={{ color: 'var(--text)' }}>Addis Ababa, Ethiopia</span>
              <a href="https://github.com/Solohater" target="_blank" style={{ color: 'var(--accent)' }}>GitHub</a>
              <a href="https://gitlab.com/yosephh" target="_blank" style={{ color: 'var(--accent)' }}>GitLab</a>
              <a href="https://www.linkedin.com/in/yoseph-ayalew-65247b291" target="_blank" style={{ color: 'var(--accent)' }}>LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1.5 h-5 rounded-sm inline-block" style={{ background: 'var(--accent)' }} />
            Experience
          </h2>
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-5 rounded-xl mb-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                <h3 className="font-bold" style={{ color: 'var(--text-h)' }}>{exp.title}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>{exp.company}</span>
              </div>
              <p className="text-xs mb-2 font-mono" style={{ color: 'var(--text)' }}>{exp.period}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{exp.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1.5 h-5 rounded-sm inline-block" style={{ background: 'var(--accent)' }} />
            Education
          </h2>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-5 rounded-xl mb-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
            >
              <h3 className="font-bold" style={{ color: 'var(--text-h)' }}>{edu.degree}</h3>
              <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{edu.school}</p>
              <p className="text-xs mb-2 font-mono" style={{ color: 'var(--text)' }}>{edu.period}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{edu.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1.5 h-5 rounded-sm inline-block" style={{ background: 'var(--accent)' }} />
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((group) => (
              <div key={group.category} className="p-4 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>{group.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
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
          <span className="inline-block mr-1">🖨️</span>
          Use <kbd className="px-1 py-0.5 rounded text-[10px] font-mono" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>Ctrl+P</kbd> to print or save as PDF
        </p>
      </div>
    </motion.div>
  );
}
