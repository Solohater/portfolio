'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const floatingTags = [
  "Java", "Vert.x", "Angular", "React", "Next.js",
  "PostgreSQL", "TypeScript", "JavaScript", "Tailwind CSS", "Go"
];

/* ───── Hero ───── */
function HeroSection() {
  const { mode, bgMode } = useContext(ThemeContext);
  const profileAreaRef = useRef(null);
  const [radius, setRadius] = useState(160);

  useEffect(() => {
    const compute = () => {
      const area = profileAreaRef.current;
      if (!area) return;
      const areaWidth = area.offsetWidth;
      const computedRadius = Math.min(
        (areaWidth / 2) - 38,
        Math.max(105, areaWidth * 0.37)
      );
      setRadius(computedRadius);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (profileAreaRef.current) ro.observe(profileAreaRef.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      {/* Primary Hero Container Box */}
      <div className="max-w-5xl xl:max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 xl:gap-12 z-10 glass-card rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl" style={{ background: 'var(--page-tint)' }}>
        {/* Intro / Text Content */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5 text-center lg:text-left lg:max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium self-center lg:self-start glass-card mb-1 text-black dark:text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for full-stack opportunities
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-display text-xs uppercase tracking-widest text-black dark:text-white font-semibold"
          >Hello, I&apos;m</motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight text-black dark:text-white"
          >
            Yoseph<br />Ayalew
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-display text-lg sm:text-xl text-black dark:text-white font-medium"
          >Software Engineer</motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-display text-sm sm:text-base text-black/80 dark:text-white/80 max-w-lg leading-relaxed"
          >
            I specialize in developing full-stack web applications using Java, Vert.x,
            Angular, React, and PostgreSQL. Currently working at eTech SC, I build and
            maintain software features across the stack — from responsive frontends to
            robust backend APIs.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start pt-1"
          >
            <a href="#projects" className="px-6 py-3 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg font-medium transition text-sm sm:text-base shadow-sm">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg font-medium transition text-sm sm:text-base shadow-sm">
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

        {/* Profile Area + Floating Skills (Positioning Context) */}
        <div className="flex-shrink-0 flex items-center justify-center relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[430px] lg:h-[430px]" ref={profileAreaRef}>
          {/* Profile Image Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64 rounded-full overflow-hidden ring-4 ring-[var(--bg)] shadow-2xl z-10"
          >
            <Image
              src={bgMode === "animated" ? (mode === "dark" ? "/aDarkP.png" : "/aLightP.png") : (mode === "dark" ? "/darkimg.png" : "/lightimg.png")}
              alt="Yoseph Ayalew"
              fill
              className="object-cover object-[50%_0%] -rotate-10 translate-y-6 scale-100"
              priority
            />
          </motion.div>

          {/* Floating Skill Tags Orbit */}
          {floatingTags.map((tag, i) => {
            const angle = (i / floatingTags.length) * 360 - 90;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <motion.div
                key={tag}
                className="absolute top-1/2 left-1/2 pointer-events-none z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.08 }}
              >
                <motion.div
                  className="absolute w-0 h-0"
                  animate={{
                    x: [x, x + (i % 2 === 0 ? 3 : -3), x],
                    y: [y, y + (i % 2 === 0 ? -4 : 4), y]
                  }}
                  transition={{
                    duration: 3.5 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <span
                    className="absolute left-0 top-0 px-2.5 py-1 rounded-full text-xs font-medium bg-black/10 border border-black/20 text-black dark:bg-white/10 dark:border-white/20 dark:text-white backdrop-blur-md shadow-sm whitespace-nowrap transition-all duration-300 pointer-events-auto hover:scale-110"
                    style={{ transform: `translate(-50%, -50%)` }}
                  >
                    {tag}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───── About ───── */
function AboutSection() {
  const { mode, bgMode } = useContext(ThemeContext);
  return (
    <section id="about" className="px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title">About Me</h2>

        <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
          <Image src={bgMode === "animated" ? (mode === "dark" ? "/aDarkP.png" : "/aLightP.png") : (mode === "dark" ? "/darkimg.png" : "/lightimg.png")} alt="" width={100} height={100} className="w-24 h-24 rounded-full object-cover object-top flex-shrink-0 ring-2" style={{ ringColor: 'var(--bg)' }} />
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
            <div key={item.label} className="p-4 rounded-xl glass-card">
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--accent-text)' }}>{item.label}</p>
              <p className="text-sm font-medium" style={{ color: 'var(--text-h)' }}>{item.value}</p>
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
      'Develop and maintain high-performance full-stack features using Java and Vert.x',
      'Build responsive, accessible frontend components and user workflows using Angular',
      'Design relational schemas, optimize complex SQL queries, and manage PostgreSQL databases',
      'Debug, test, and resolve critical production defects across microservices',
      'Collaborate in an Agile environment using Git and GitLab with rigorous code reviews',
      'Actively expand backend knowledge with Go and distributed system principles',
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
                  className="p-5 rounded-xl relative glass-card"
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
            <div key={group.category} className="p-5 rounded-xl glass-card">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-text)' }}>{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium transition-transform hover:scale-105 cursor-default" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
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
    desc: 'Full-stack document workflow platform with role-based approvals (Admin/Reviewer/Author), PostgreSQL schema with Prisma ORM, and secure JWT authentication.',
    tech: ['React', 'Node.js', 'Prisma', 'PostgreSQL'],
    link: 'https://blog-app-seven-bice-50.vercel.app',
    github: 'https://github.com/Solohater/Document-Management',
    demo: 'admin / admin123',
    featured: true,
  },
  {
    title: 'TechShop',
    desc: 'Commercial tech store featuring responsive product catalog, cart, wishlist, real-time order tracking, and customer account dashboard.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    link: 'https://techshop-peach.vercel.app',
    demo: 'admin@techshop.com / Admin@12345',
    note: 'Enterprise Client Repo',
  },
  {
    title: 'Ethio Kemem — Food Menu',
    desc: 'Bilingual (Amharic/English) traditional culinary platform with categorized interactive menus, order cart, and administrative dashboard.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    link: 'https://fastfood-amber-chi.vercel.app',
    github: 'https://github.com/Solohater/Food-Delivery-Platform',
    demo: 'admin / admin123',
  },
  {
    title: 'JODEV Blog',
    desc: 'Technical publishing platform with category indexing, post management, and newsletter subscriptions backed by a REST API.',
    tech: ['Next.js', 'Node.js', 'Express'],
    link: 'https://materialtut-web.vercel.app',
    demo: 'admin@blog.com / admin123',
  },
  {
    title: 'Repair Management System',
    desc: 'Full-stack MERN repair service portal with technician assignment, status tracking, role-based auth, and operational analytics dashboards.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://web-seven-woad-99.vercel.app',
    github: 'https://github.com/Solohater/DaveProjFront',
    demo: 'admin / admin123',
  },
  {
    title: 'Reminder & Notes App',
    desc: 'Task scheduling and notes productivity app featuring calendar reminders, deadlines, and local state persistence.',
    tech: ['React', 'JavaScript', 'CSS3'],
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
            <div
              key={i}
              className={`p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl glass-card flex flex-col justify-between ${
                p.featured ? 'ring-1 ring-emerald-500/30 dark:ring-emerald-400/40' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-h)' }}>{p.title}</h3>
                  {p.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      ★ Featured
                    </span>
                  )}
                  {p.note && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/5 dark:bg-white/10 text-[var(--text)] border border-[var(--border)]">
                      {p.note}
                    </span>
                  )}
                </div>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text)' }}>{p.desc}</p>
                {p.demo && (
                  <p className="text-xs mb-4 p-2 rounded-lg bg-black/5 dark:bg-white/5 font-mono" style={{ color: 'var(--text)' }}>
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
              </div>

              <div className="flex items-center gap-3 pt-2">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    className="text-xs font-medium px-3 py-1.5 rounded transition"
                    style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-text)'; e.currentTarget.style.color = 'var(--bg)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent-bg)'; e.currentTarget.style.color = 'var(--accent-text)'; }}
                  >
                    Source Code
                  </a>
                )}
                <a
                  href={p.link}
                  target="_blank"
                  className="text-xs font-medium px-3 py-1.5 rounded transition border border-[var(--border)] hover:border-[var(--border-focus)] hover:scale-105"
                  style={{ color: 'var(--text-h)' }}
                >
                  Live Demo ↗
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
  const [formStatus, setFormStatus] = useState('idle');
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('yosefayalew56@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xqeoarld', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });
      if (res.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col gap-5">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
              Feel free to reach out for software engineering roles, project collaboration, or tech inquiries. I typically respond within 24 hours.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <a href="mailto:yosefayalew56@gmail.com" className="text-sm font-medium transition hover:underline" style={{ color: 'var(--accent-text)' }}>
                  yosefayalew56@gmail.com
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-2 py-0.5 text-[11px] rounded glass-card hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer"
                  title="Copy email address"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <span className="text-sm" style={{ color: 'var(--text)' }}>Addis Ababa, Ethiopia</span>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 border-t border-[var(--border)]">
              <a href="https://github.com/Solohater" target="_blank" className="text-xs font-semibold px-3 py-1.5 rounded-lg glass-card hover:scale-105 transition" style={{ color: 'var(--accent-text)' }}>GitHub</a>
              <a href="https://gitlab.com/yosephh" target="_blank" className="text-xs font-semibold px-3 py-1.5 rounded-lg glass-card hover:scale-105 transition" style={{ color: 'var(--accent-text)' }}>GitLab</a>
              <a href="https://www.linkedin.com/in/yoseph-ayalew-65247b291" target="_blank" className="text-xs font-semibold px-3 py-1.5 rounded-lg glass-card hover:scale-105 transition" style={{ color: 'var(--accent-text)' }}>LinkedIn</a>
              <a href="https://t.me/YOSEP015" target="_blank" className="text-xs font-semibold px-3 py-1.5 rounded-lg glass-card hover:scale-105 transition" style={{ color: 'var(--accent-text)' }}>Telegram</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              disabled={formStatus === 'submitting'}
              className="glass-input px-4 py-3 rounded-lg text-sm outline-none transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              disabled={formStatus === 'submitting'}
              className="glass-input px-4 py-3 rounded-lg text-sm outline-none transition"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              required
              disabled={formStatus === 'submitting'}
              className="glass-input px-4 py-3 rounded-lg text-sm outline-none transition resize-none"
            />
            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="self-start px-6 py-2.5 rounded-lg text-sm font-medium transition bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 border-2 border-black dark:border-white disabled:opacity-50 cursor-pointer"
            >
              {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg text-xs font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
              >
                Thank you! Your message has been sent successfully. I will get back to you soon.
              </motion.div>
            )}

            {formStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg text-xs font-medium bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300"
              >
                Something went wrong. Please try again or email me directly at yosefayalew56@gmail.com
              </motion.div>
            )}
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
