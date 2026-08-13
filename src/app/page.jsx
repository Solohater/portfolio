'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

const floatingTags = [
  "Java", "Vert.x", "Angular", "React", "Next.js",
  "PostgreSQL", "TypeScript", "JavaScript", "Tailwind CSS", "Go"
];

/* ───── Hero ───── */
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 z-10">
        {/* Text */}
        <div className="flex-1 flex flex-col gap-5 text-center lg:text-left">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-display text-xs uppercase tracking-widest text-black dark:text-white"
          >Hello, I&apos;m</motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black dark:text-white"
          >
            Yoseph<br />Ayalew
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-display text-lg sm:text-xl text-black dark:text-white font-medium"
          >Software Engineer</motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-display text-sm sm:text-base text-black dark:text-white max-w-lg"
          >
            I specialize in developing full-stack web applications using Java, Vert.x,
            Angular, React, and PostgreSQL. Currently working at eTech SC, I build and
            maintain software features across the stack — from responsive frontends to
            robust backend APIs.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a href="#projects" className="px-6 py-3 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg font-medium transition text-sm sm:text-base">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg font-medium transition text-sm sm:text-base">
              Get In Touch
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex gap-4 justify-center lg:justify-start pt-2"
          >
            <Link href="https://github.com/Solohater" target="_blank" className="text-black hover:text-gray-600 dark:text-gray-400 dark:hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </Link>
            <Link href="https://www.linkedin.com/in/yoseph-ayalew-65247b291" target="_blank" className="text-black hover:text-gray-600 dark:text-gray-400 dark:hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </Link>
            <Link href="mailto:yosefayalew56@gmail.com" className="text-black hover:text-gray-600 dark:text-gray-400 dark:hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </Link>
            <Link href="https://gitlab.com/yosephh" target="_blank" className="text-black hover:text-gray-600 dark:text-gray-400 dark:hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 14.07a1.42 1.42 0 0 1-.41.73l-4.42 4.42a2.82 2.82 0 0 1-2 .82 2.79 2.79 0 0 1-2-.82l-4.42-4.42a1.41 1.41 0 0 1 0-2l4.42-4.42a2.82 2.82 0 0 1 2-.82c.75 0 1.5.27 2 .82l4.42 4.42c.19.19.4.44.41.72z"/><path d="M3.29 14.07c0 .2.07.5.41.73l4.42 4.42a2.82 2.82 0 0 0 2 .82V5.97c-.75 0-1.5.27-2 .82L3.7 11.21a1.41 1.41 0 0 0-.41.72v2.14z"/></svg>
            </Link>
            <Link href="https://t.me/YOSEP015" target="_blank" className="text-black hover:text-gray-600 dark:text-gray-400 dark:hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </Link>
          </motion.div>
        </div>

        {/* Photo */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden ring-4 ring-[var(--bg)] shadow-2xl"
            >
              <Image src="/photojo.png" alt="Yoseph Ayalew" fill className="object-cover object-top -rotate-6 scale-110" priority />
            </motion.div>

            {floatingTags.map((tag, i) => {
              const angle = (i / floatingTags.length) * 360;
              const radius = 170;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              return (
                <motion.div key={tag}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <motion.div
                    className="absolute px-3 py-1.5 rounded-full text-xs font-medium bg-black/10 border border-black/20 text-black dark:bg-white/10 dark:border-white/20 dark:text-white whitespace-nowrap"
                    animate={{ x: [x, x + 10, x], y: [y, y - 10, y] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                  >
                    {tag}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── About ───── */
function AboutSection() {
  return (
    <section id="about" className="px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title">About Me</h2>

        <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
          <Image src="/photojo.png" alt="" width={100} height={100} className="w-24 h-24 rounded-full object-cover object-top flex-shrink-0 ring-2" style={{ ringColor: 'var(--bg)' }} />
          <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>
            Motivated Computer Science graduate and Junior Software Developer with professional experience
            building web applications using <strong>Java, Vert.x, Angular, PostgreSQL,</strong> and <strong>SQL</strong>.
            Skilled in frontend and backend development, debugging, testing, Git, and GitLab.
            Currently expanding backend expertise with <strong>Go</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { label: 'Education', value: 'BSc Computer Science — St. Mary\'s University (07/2023)' },
            { label: 'Location', value: 'Addis Ababa, Ethiopia' },
            { label: 'Languages', value: 'Amharic (Native) — English (Fluent)' },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--accent-text)' }}>{item.label}</p>
              <p className="text-sm" style={{ color: 'var(--text-h)' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Experience ───── */
const experiences = [
  {
    period: 'Mar 2026 – Present',
    title: 'Junior Software Developer',
    company: 'eTech SC',
    points: [
      'Develop and maintain software features using Java and Vert.x',
      'Build and improve frontend components using Angular',
      'Work with PostgreSQL databases and SQL queries',
      'Debug, test, and resolve software defects',
      'Collaborate with developers and stakeholders using Git and GitLab',
      'Participate in feature implementation, maintenance, and code reviews',
    ],
  },
];

function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-20 md:py-28 overflow-hidden" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Experience</h2>

        {/* Git Branch Timeline */}
        <div className="relative">
          {/* Main branch line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[3px]" style={{ background: 'var(--accent-text)' }} />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.25, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-80px' }}
                className="relative pl-16"
              >
                {/* Branch connector line (horizontal + angle) */}
                <svg className="absolute left-[23px] top-5 w-12 h-8 overflow-visible" style={{ color: 'var(--accent-text)' }}>
                  <path d="M0 0 L24 0 L48 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />
                </svg>

                {/* Commit dot on main branch */}
                <motion.div
                  className="absolute left-[13px] top-[18px] w-[23px] h-[23px] rounded-full border-[3px] flex items-center justify-center z-10"
                  style={{ background: 'var(--bg-alt)', borderColor: 'var(--accent-text)' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.25 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent-text)' }} />
                </motion.div>

                {/* Experience card */}
                <motion.div
                  className="p-5 rounded-xl relative"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.25 + 0.15 }}
                  viewport={{ once: true, margin: '-80px' }}
                >
                  {/* Git commit style header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
                      {exp.company}
                    </span>
                    <span className="text-xs font-mono" style={{ color: 'var(--text)' }}>
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-h)' }}>{exp.title}</h3>

                  <ul className="space-y-2">
                    {exp.points.map((pt, j) => (
                      <motion.li
                        key={j}
                        className="text-sm flex gap-2"
                        style={{ color: 'var(--text)' }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.25 + j * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-text)' }}>▸</span>
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline slider hint */}
        <motion.p
          className="text-center text-xs mt-8 font-mono"
          style={{ color: 'var(--text)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span style={{ color: 'var(--accent-text)' }}>●</span> main — scroll to view full timeline
        </motion.p>
      </div>
    </section>
  );
}

/* ───── Skills ───── */
const skillGroups = [
  { category: 'Languages', skills: ['Java', 'JavaScript', 'TypeScript', 'SQL', 'Go'] },
  { category: 'Frontend', skills: ['Angular', 'React', 'Next.js', 'Tailwind CSS', 'Redux', 'Material UI'] },
  { category: 'Backend', skills: ['Vert.x', 'Node.js', 'Express.js', 'REST APIs', 'JWT'] },
  { category: 'Databases', skills: ['PostgreSQL', 'MongoDB'] },
  { category: 'Tools', skills: ['Git', 'GitLab', 'GitHub', 'Postman', 'Figma', 'Vercel', 'Render'] },
];

function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Tech Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group) => (
            <div key={group.category} className="p-5 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-text)' }}>{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Projects ───── */
const projects = [
  {
    title: 'Document Manager',
    desc: 'A document management platform where users post documents and a reviewer role reviews and approves them.',
    tech: ['React', 'Node.js', 'Prisma', 'PostgreSQL'],
    link: 'https://blog-app-seven-bice-50.vercel.app',
    github: 'https://github.com/Solohater/Document-Management',
    demo: 'admin / admin123',
  },
  {
    title: 'TechShop',
    desc: 'A commercial tech store for phones, tablets and laptops — product catalog, shopping cart, wishlist, order tracking, and customer accounts.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    link: 'https://techshop-peach.vercel.app',
    demo: 'admin@techshop.com / Admin@12345',
  },
  {
    title: 'Ethio Kemem — Food Menu',
    desc: 'A bilingual (Amharic/English) traditional Ethiopian food menu — categorized dishes, order cart, and an admin dashboard.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    link: 'https://fastfood-amber-chi.vercel.app',
    github: 'https://github.com/Solohater/Food-Delivery-Platform',
    demo: 'admin / admin123',
  },
  {
    title: 'JODEV Blog',
    desc: 'A blog platform with categories, post management and newsletter subscription, backed by a REST API.',
    tech: ['Next.js', 'Node.js', 'Express'],
    link: 'https://materialtut-web.vercel.app',
    demo: 'admin@blog.com / admin123 (user: john@blog.com / user123)',
  },
  {
    title: 'Repair Management System',
    desc: 'A full-stack MERN repair shop management system with role-based authentication, repair tracking, dashboards, and REST APIs.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://web-seven-woad-99.vercel.app',
    github: 'https://github.com/Solohater/DaveProjFront',
    demo: 'admin / admin123',
  },
  {
    title: 'Reminder & Notes App',
    desc: 'A reminder and scheduling app for keeping track of tasks, notes, and deadlines.',
    tech: ['React'],
    link: 'https://reminder-schedule-eight.vercel.app',
  },
];

function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-20 md:py-28" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="p-6 rounded-xl transition-transform hover:-translate-y-1" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-h)' }}>{p.title}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text)' }}>{p.desc}</p>
              {p.demo && (
              <p className="text-xs mb-4" style={{ color: 'var(--text)' }}>
                <span style={{ color: 'var(--accent-text)', fontWeight: 600 }}>Demo login:</span> {p.demo}
              </p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded text-xs font-medium" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {p.github && (
                <a href={p.github} target="_blank" className="text-xs font-medium px-3 py-1.5 rounded transition" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}
                  onMouseEnter={(e) => { e.target.style.background = 'var(--accent-text)'; e.target.style.color = 'var(--bg)'; }}
                  onMouseLeave={(e) => { e.target.style.background = 'var(--accent-bg)'; e.target.style.color = 'var(--accent-text)'; }}
                >
                  Source Code
                </a>
                )}
                <a href={p.link} target="_blank" className="text-xs font-medium px-3 py-1.5 rounded transition" style={{ border: '1px solid var(--border)', color: 'var(--text-h)' }}
                  onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent-text)'; e.target.style.color = 'var(--accent-text)'; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-h)'; }}
                >
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Contact ───── */
function ContactSection() {
  return (
    <section id="contact" className="px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-5">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
              Feel free to reach out for opportunities, collaboration, or just a chat.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:yosefayalew56@gmail.com" className="text-sm font-medium transition" style={{ color: 'var(--accent-text)' }}>
                yosefayalew56@gmail.com
              </a>
              <span className="text-sm" style={{ color: 'var(--text)' }}>Addis Ababa, Ethiopia</span>
            </div>
            <div className="flex gap-4 pt-2">
              <a href="https://github.com/Solohater" target="_blank" className="text-sm font-medium" style={{ color: 'var(--accent-text)' }}>GitHub</a>
              <a href="https://gitlab.com/yosephh" target="_blank" className="text-sm font-medium" style={{ color: 'var(--accent-text)' }}>GitLab</a>
              <a href="https://www.linkedin.com/in/yoseph-ayalew-65247b291" target="_blank" className="text-sm font-medium" style={{ color: 'var(--accent-text)' }}>LinkedIn</a>
              <a href="https://t.me/YOSEP015" target="_blank" className="text-sm font-medium" style={{ color: 'var(--accent-text)' }}>Telegram</a>
            </div>
          </div>

          <form className="flex flex-col gap-4" action="https://formspree.io/f/xqeoarld" method="POST">
            <input type="text" name="name" placeholder="Your Name" required
              className="px-4 py-3 rounded-lg text-sm outline-none transition" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-h)' }} />
            <input type="email" name="email" placeholder="Your Email" required
              className="px-4 py-3 rounded-lg text-sm outline-none transition" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-h)' }} />
            <textarea name="message" placeholder="Your Message" rows={4} required
              className="px-4 py-3 rounded-lg text-sm outline-none transition resize-none" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-h)' }} />
            <button type="submit"
              className="self-start px-5 py-2.5 rounded-lg text-sm font-medium transition border-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 border-black dark:border-white"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ───── Page ───── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
