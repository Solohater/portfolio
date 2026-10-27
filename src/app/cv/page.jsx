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
    desc: 'Engineering high-concurrency microservices, healthcare clinical systems, and cooperative financial platforms using Java, Vert.x, PostgreSQL, Angular, and React.',
    highlights: [
      'eHealth Systems (Chilalo Shed, Nubira, Meqrez Hospital): Engineered reactive backend microservices in Java Vert.x handling multi-department patient triage, electronic health records (EHR), and prescription dispensing.',
      'Financial SACCOs (Ethio-Trit, Netsebirak, Oromia Bank SACCO): Developed core accounting modules ensuring strict double-entry transactional guarantees, automated loan amortization schedules, and dividend calculations.',
      'Database Engineering: Designed normalized relational schemas in PostgreSQL; optimized complex queries and composite indexes, significantly reducing query response times.',
      'Frontend Architecture: Constructed accessible Angular UI components with dynamic client-side validation for high-accuracy financial data entry.',
    ],
  },
];

const projects = [
  {
    title: 'Document Management System',
    tech: 'React • Node.js • Prisma ORM • PostgreSQL • JWT',
    desc: 'Role-based approval workflow platform (Admin/Reviewer/Author) with secure JWT authorization, PostgreSQL relational schema, and live search indexing.',
    link: 'https://blog-app-seven-bice-50.vercel.app',
  },
  {
    title: 'TechShop Commercial E-Commerce',
    tech: 'TypeScript • Next.js • Tailwind CSS • Responsive UI',
    desc: 'Full-featured electronics store with product search, cart state persistence, customer account management, and real-time order tracking.',
    link: 'https://techshop-peach.vercel.app',
  },
  {
    title: 'Ethio Kemem — Food Menu Platform',
    tech: 'TypeScript • Next.js • Tailwind CSS • Localization',
    desc: 'Traditional culinary platform featuring full Amharic and English localization, categorized interactive ordering menus, and administrative dashboard.',
    link: 'https://fastfood-amber-chi.vercel.app',
  },
  {
    title: 'Repair Management Portal',
    tech: 'React • Node.js • Express • MongoDB • MERN',
    desc: 'Field service portal featuring technician assignment, status tracking, role-based ticket management, and operational analytics dashboards.',
    link: 'https://web-seven-woad-99.vercel.app',
  },
];

const education = [
  {
    period: '2020 – 2023',
    degree: 'BSc in Computer Science',
    school: "St. Mary's University",
    desc: 'Focused on algorithms, distributed systems, relational database management, and object-oriented software design.',
  },
];

const skills = [
  { category: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'SQL', 'Go'] },
  { category: 'Frontend', items: ['Angular', 'React', 'Next.js', 'Tailwind CSS', 'Redux', 'Material UI'] },
  { category: 'Backend', items: ['Vert.x', 'Node.js', 'Express.js', 'REST APIs', 'JWT'] },
  { category: 'Databases', items: ['PostgreSQL', 'Prisma ORM', 'MongoDB'] },
  { category: 'Tools', items: ['Git', 'GitLab', 'GitHub', 'Docker', 'Postman', 'Figma', 'Vercel', 'Render'] },
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
              <p className="text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--accent-text)' }}>Full-Stack Software Engineer</p>
              <p className="text-base sm:text-lg max-w-lg leading-relaxed" style={{ color: 'var(--text)' }}>
                Computer Science graduate with professional experience engineering high-concurrency microservices, healthcare clinical systems, and cooperative financial platforms using Java, Vert.x, Angular, React, and PostgreSQL.
              </p>
              <div className="flex flex-wrap gap-3.5 mt-3.5 justify-center sm:justify-start text-xs sm:text-sm font-medium">
                <a href="tel:+251933967295" className="hover:underline" style={{ color: 'var(--text)' }}>+251 933 967 295</a>
                <a href="mailto:yosefayalew56@gmail.com" className="hover:underline" style={{ color: 'var(--text)' }}>yosefayalew56@gmail.com</a>
                <span style={{ color: 'var(--text)' }}>Addis Ababa, Ethiopia</span>
                <a href="https://t.me/YOSEP015" target="_blank" className="font-semibold hover:underline" style={{ color: 'var(--accent-text)' }}>Telegram (@YOSEP015)</a>
                <a href="https://portfolio2-hazel-gamma.vercel.app" target="_blank" className="font-semibold hover:underline" style={{ color: 'var(--accent-text)' }}>Portfolio 2 (New) ↗</a>
                <a href="https://github.com/Solohater" target="_blank" className="font-semibold hover:underline" style={{ color: 'var(--accent-text)' }}>GitHub</a>
                <a href="https://gitlab.com/yosephh" target="_blank" className="font-semibold hover:underline" style={{ color: 'var(--accent-text)' }}>GitLab</a>
                <a href="https://www.linkedin.com/in/yoseph-ayalew-65247b291" target="_blank" className="font-semibold hover:underline" style={{ color: 'var(--accent-text)' }}>LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Summary */}
          <p className="text-base sm:text-lg leading-relaxed pt-5" style={{ color: 'var(--text)' }}>
            Full-Stack Software Engineer with professional experience engineering high-concurrency microservices, healthcare clinical systems (<strong>Chilalo Shed, Nubira, Meqrez Hospital</strong>), and cooperative financial platforms (<strong>Ethio-Trit, Netsebirak, Oromia Bank SACCO</strong>) using <strong>Java, Vert.x, PostgreSQL, Angular</strong>, and <strong>React</strong>.
          </p>
        </div>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1.5 h-6 rounded-sm inline-block" style={{ background: 'var(--accent-text)' }} />
            Professional Experience
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
              <p className="text-xs sm:text-sm mb-3 font-mono" style={{ color: 'var(--text)' }}>{exp.period}</p>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text)' }}>{exp.desc}</p>
              <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                {exp.highlights.map((h, j) => (
                  <p key={j} className="text-sm leading-relaxed flex items-start gap-2" style={{ color: 'var(--text)' }}>
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>{h}</span>
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Selected Projects */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-h)' }}>
            <span className="w-1.5 h-6 rounded-sm inline-block" style={{ background: 'var(--accent-text)' }} />
            Selected Full-Stack Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div key={proj.title} className="p-5 rounded-xl glass-card flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-1" style={{ color: 'var(--text-h)' }}>{proj.title}</h3>
                  <p className="text-xs font-mono font-semibold mb-2" style={{ color: 'var(--accent-text)' }}>{proj.tech}</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text)' }}>{proj.desc}</p>
                </div>
                <a href={proj.link} target="_blank" className="text-xs font-semibold hover:underline self-start" style={{ color: 'var(--accent-text)' }}>
                  View Project Demo ↗
                </a>
              </div>
            ))}
          </div>
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
            Technical Skills
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

        {/* Download PDF button with Cache Busting */}
        <p className="text-center text-xs mt-8" style={{ color: 'var(--text)' }}>
          <a
            href="/cv.pdf?v=20261027_v2"
            target="_blank"
            download="Yoseph_Ayalew_CV.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition hover:opacity-90 shadow-lg hover:scale-105"
            style={{ background: 'var(--accent)', color: '#ffffff' }}
          >
            <span>Download Updated CV (PDF)</span>
            <span>↓</span>
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
