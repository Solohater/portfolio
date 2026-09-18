'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const floatingTags = [
  "Java", "Vert.x", "Angular", "React", "Next.js",
  "PostgreSQL", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js"
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
      <div className="max-w-5xl xl:max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 z-10 glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
        {/* Intro / Text Content */}
        <div className="flex flex-col gap-4 sm:gap-5 text-center lg:text-left justify-center w-full max-w-lg mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium self-center lg:self-start glass-card mb-1"
            style={{ color: 'var(--text-h)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for full-stack opportunities
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-display text-sm sm:text-base uppercase tracking-widest font-bold"
            style={{ color: 'var(--accent-text)' }}
          >Hello, I&apos;m</motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            style={{ color: 'var(--text-h)' }}
          >
            Yoseph<br />Ayalew
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-display text-xl sm:text-2xl font-bold"
            style={{ color: 'var(--accent-text)' }}
          >Software Engineer</motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-display text-base sm:text-lg max-w-xl leading-relaxed"
            style={{ color: 'var(--text)' }}
          >
            I specialize in developing full-stack web applications using Java, Vert.x,
            Angular, React, and PostgreSQL. Currently working at eTech SC, I build and
            maintain software features across the stack — from responsive frontends to
            robust backend APIs.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start pt-1"
          >
            <a href="#projects" className="px-7 py-3.5 rounded-lg font-semibold transition text-base sm:text-lg hover:opacity-90" style={{ background: 'var(--text-h)', color: 'var(--bg)' }}>
              View My Work
            </a>
            <a href="#contact" className="px-7 py-3.5 rounded-lg font-semibold transition text-base sm:text-lg hover:opacity-90 border border-[var(--border)] glass-card" style={{ color: 'var(--text-h)' }}>
              Get In Touch
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex gap-4 justify-center lg:justify-start pt-2"
          >
            <Link href="https://github.com/Solohater" target="_blank" className="transition hover:scale-110" style={{ color: 'var(--text)' }} aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </Link>
            <Link href="https://www.linkedin.com/in/yoseph-ayalew-65247b291" target="_blank" className="transition hover:scale-110" style={{ color: 'var(--text)' }} aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </Link>
            <Link href="mailto:yosefayalew56@gmail.com" className="transition hover:scale-110" style={{ color: 'var(--text)' }} aria-label="Email">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </Link>
            <Link href="https://gitlab.com/yosephh" target="_blank" className="transition hover:scale-110" style={{ color: 'var(--text)' }} aria-label="GitLab">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 14.07a1.42 1.42 0 0 1-.41.73l-4.42 4.42a2.82 2.82 0 0 1-2 .82 2.79 2.79 0 0 1-2-.82l-4.42-4.42a1.41 1.41 0 0 1 0-2l4.42-4.42a2.82 2.82 0 0 1 2-.82c.75 0 1.5.27 2 .82l4.42 4.42c.19.19.4.44.41.72z"/><path d="M3.29 14.07c0 .2.07.5.41.73l4.42 4.42a2.82 2.82 0 0 0 2 .82V5.97c-.75 0-1.5.27-2 .82L3.7 11.21a1.41 1.41 0 0 0-.41.72v2.14z"/></svg>
            </Link>
            <Link href="https://t.me/YOSEP015" target="_blank" className="transition hover:scale-110" style={{ color: 'var(--text)' }} aria-label="Telegram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </Link>
          </motion.div>
        </div>

        {/* Profile Area + Floating Skills (Positioning Context) */}
        <div className="flex items-center justify-center relative w-full h-[340px] sm:h-[400px] lg:h-[430px] max-w-[430px] mx-auto" ref={profileAreaRef}>
          {/* Profile Image Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64 rounded-full overflow-hidden ring-4 ring-[var(--bg)] z-10"
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
                    className="absolute left-0 top-0 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold glass-card whitespace-nowrap transition-all duration-300 pointer-events-auto hover:scale-110"
                    style={{ transform: `translate(-50%, -50%)`, color: 'var(--text-h)' }}
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
  return (
    <section id="about" className="px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title">About Me</h2>

        <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
          <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'var(--text)' }}>
            Full-Stack Software Engineer with professional experience designing and building performant web applications using <strong>Java, Vert.x, Angular, React,</strong> and <strong>PostgreSQL</strong>. Passionate about clean architecture, crafting robust backend APIs, and building responsive, intuitive user interfaces that deliver real-world impact.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '1/2+', label: 'Year Exp.', href: '#experience' },
              { value: '6+',   label: 'Projects Shipped', href: '#projects' },
              { value: '15+',  label: 'Technologies', href: '#skills' },
            ].map((stat) => (
              <a
                key={stat.label}
                href={stat.href}
                className="flex flex-col items-center p-4 rounded-xl glass-card text-center transition-all duration-200 hover:-translate-y-1 hover:border-[var(--border-focus)] cursor-pointer group"
                title={`Jump to ${stat.label}`}
              >
                <span className="text-2xl sm:text-3xl font-bold font-display mb-1 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-text)' }}>{stat.value}</span>
                <span className="text-xs sm:text-sm font-medium flex items-center justify-center gap-1" style={{ color: 'var(--text)' }}>
                  <span>{stat.label}</span>
                  <span className="text-[11px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" style={{ color: 'var(--accent-text)' }}>↓</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { label: 'Education', value: 'BSc Computer Science — St. Mary\'s University (07/2023)' },
            { label: 'Location', value: 'Addis Ababa, Ethiopia' },
            { label: 'Languages', value: 'Amharic (Native) — English (Fluent)' },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl glass-card">
              <p className="text-sm font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--accent-text)' }}>{item.label}</p>
              <p className="text-base font-medium" style={{ color: 'var(--text-h)' }}>{item.value}</p>
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
    <section id="experience" className="px-6 py-20 md:py-28 overflow-hidden">
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
                  style={{ background: 'var(--card-bg)', borderColor: 'var(--accent-text)' }}
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
                    <span className="px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider border border-[var(--accent-border)]"
                      style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
                      {exp.company}
                    </span>
                    <span className="text-sm font-mono" style={{ color: 'var(--text)' }}>
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: 'var(--text-h)' }}>{exp.title}</h3>

                  <ul className="space-y-2.5">
                    {exp.points.map((pt, j) => (
                      <motion.li
                        key={j}
                        className="text-base flex gap-2.5 leading-relaxed"
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

      </div>
    </section>
  );
}

/* ───── Skills ───── */
const skillGroups = [
  {
    category: 'Languages',
    tiers: {
      Core: ['Java', 'JavaScript', 'TypeScript', 'SQL'],
      Familiar: ['Go'],
    },
  },
  {
    category: 'Frontend',
    tiers: {
      Core: ['Angular', 'React', 'Next.js', 'Tailwind CSS'],
      Proficient: ['Redux', 'Material UI'],
    },
  },
  {
    category: 'Backend',
    tiers: {
      Core: ['Vert.x', 'REST APIs'],
      Proficient: ['Node.js', 'Express.js', 'JWT'],
    },
  },
  {
    category: 'Databases',
    tiers: {
      Core: ['PostgreSQL'],
      Proficient: ['MongoDB'],
    },
  },
  {
    category: 'Tools',
    tiers: {
      Core: ['Git', 'GitLab', 'GitHub'],
      Proficient: ['Postman', 'Figma', 'Vercel', 'Render'],
    },
  },
];

const tierStyle = {
  Core:      { opacity: 1,    fontWeight: 700 },
  Proficient:{ opacity: 0.82, fontWeight: 600 },
  Familiar:  { opacity: 0.60, fontWeight: 500 },
};

function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Tech Stack</h2>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs font-semibold">
          {Object.entries(tierStyle).map(([tier, s]) => (
            <span key={tier} className="flex items-center gap-1.5" style={{ color: 'var(--text)', opacity: s.opacity }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--accent-text)', opacity: s.opacity }} />
              {tier}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group) => (
            <div key={group.category} className="p-5 rounded-xl glass-card">
              <h3 className="text-base font-bold uppercase tracking-wider mb-3.5" style={{ color: 'var(--accent-text)' }}>{group.category}</h3>
              <div className="flex flex-col gap-2.5">
                {Object.entries(group.tiers).map(([tier, skills]) => (
                  <div key={tier} className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        title={tier}
                        className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm transition-transform hover:scale-105 cursor-default border border-[var(--accent-border)]"
                        style={{
                          background: 'var(--accent-bg)',
                          color: 'var(--accent-text)',
                          opacity: tierStyle[tier].opacity,
                          fontWeight: tierStyle[tier].fontWeight,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
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
    desc: 'Commercial tech store featuring responsive product catalog, cart, wishlist, real-time order tracking, and customer account dashboard. Private codebase — available for discussion in interview.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    link: 'https://techshop-peach.vercel.app',
    demo: 'admin@techshop.com / Admin@12345',
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
    <section id="projects" className="px-6 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 glass-card flex flex-col"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{p.title}</h3>
                  {p.note && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 text-[var(--text)] border border-[var(--border)] shrink-0">
                      {p.note}
                    </span>
                  )}
                </div>
                <p className="text-base mb-4 leading-relaxed" style={{ color: 'var(--text)' }}>{p.desc}</p>
                {p.demo && (
                  <p className="text-sm mb-4 p-2.5 rounded-lg bg-black/5 dark:bg-white/5 font-mono" style={{ color: 'var(--text)' }}>
                    <span style={{ color: 'var(--accent-text)', fontWeight: 600 }}>Demo login:</span> {p.demo}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold border border-[var(--accent-border)] transition-transform hover:scale-105 cursor-default" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 mt-auto">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    className="text-sm font-semibold px-4 py-2 rounded-lg transition border border-[var(--accent-border)] flex items-center gap-1.5 hover:scale-105"
                    style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-text)'; e.currentTarget.style.color = 'var(--bg)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent-bg)'; e.currentTarget.style.color = 'var(--accent-text)'; }}
                  >
                    <span>Source Code</span>
                    <span className="text-xs">↗</span>
                  </a>
                )}
                <a
                  href={p.link}
                  target="_blank"
                  className="text-sm font-semibold px-4 py-2 rounded-lg transition border border-[var(--border)] hover:border-[var(--border-focus)] hover:scale-105"
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
      const res = await fetch('https://formspree.io/f/xoevqgye', {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col gap-5 min-w-0 w-full">
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text)' }}>
              Feel free to reach out for software engineering roles, project collaboration, or tech inquiries. I typically respond within 24 hours.
            </p>
            <div className="flex flex-col gap-3.5 min-w-0">
              {/* Email Card with direct mailto link and integrated Copy button */}
              <div className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl glass-card border border-[var(--border)] min-w-0">
                <a
                  href="mailto:yosefayalew56@gmail.com"
                  className="flex items-center gap-3 min-w-0 group/email hover:opacity-80 transition"
                  title="Send email to yosefayalew56@gmail.com"
                >
                  <div className={`p-2.5 rounded-lg transition-colors shrink-0 ${
                    copied ? 'bg-emerald-500/20 text-emerald-500' : 'bg-black/5 dark:bg-white/10 text-[var(--accent-text)]'
                  }`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-mono uppercase tracking-wider opacity-70" style={{ color: 'var(--text)' }}>
                      Email Address
                    </span>
                    <span className="text-sm sm:text-base font-mono font-semibold truncate group-hover/email:underline" style={{ color: 'var(--text-h)' }}>
                      yosefayalew56@gmail.com
                    </span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold shrink-0 transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-black/5 dark:bg-white/10 text-[var(--text)] hover:bg-black/10 dark:hover:bg-white/20'
                  }`}
                  aria-label="Copy email address to clipboard"
                  title="Click to copy email address"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-base opacity-80 pt-0.5" style={{ color: 'var(--text)' }}>
                <svg className="w-5 h-5 opacity-60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 border-t border-[var(--border)]">
              <a href="https://github.com/Solohater" target="_blank" className="text-sm font-semibold px-3.5 py-2 rounded-lg glass-card hover:scale-105 transition" style={{ color: 'var(--accent-text)' }}>GitHub</a>
              <a href="https://gitlab.com/yosephh" target="_blank" className="text-sm font-semibold px-3.5 py-2 rounded-lg glass-card hover:scale-105 transition" style={{ color: 'var(--accent-text)' }}>GitLab</a>
              <a href="https://www.linkedin.com/in/yoseph-ayalew-65247b291" target="_blank" className="text-sm font-semibold px-3.5 py-2 rounded-lg glass-card hover:scale-105 transition" style={{ color: 'var(--accent-text)' }}>LinkedIn</a>
              <a href="https://t.me/YOSEP015" target="_blank" className="text-sm font-semibold px-3.5 py-2 rounded-lg glass-card hover:scale-105 transition" style={{ color: 'var(--accent-text)' }}>Telegram</a>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-center min-w-0 w-full relative overflow-hidden">
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center py-6 sm:py-8 px-2 my-auto"
                >
                  {/* Glowing Animated Icon Badge */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.15, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute w-20 h-20 rounded-full"
                      style={{ background: 'var(--accent-bg)' }}
                    />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                      className="relative w-16 h-16 rounded-2xl flex items-center justify-center border shadow-lg"
                      style={{
                        background: 'var(--card-bg-hover)',
                        borderColor: 'var(--accent-border)',
                        color: 'var(--accent-text)',
                      }}
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.45, delay: 0.2 }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <motion.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="text-2xl sm:text-3xl font-bold font-display mb-2"
                    style={{ color: 'var(--text-h)' }}
                  >
                    Message Received!
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.26 }}
                    className="text-base sm:text-lg max-w-md leading-relaxed mb-6"
                    style={{ color: 'var(--text)' }}
                  >
                    Thanks for reaching out! Your note has landed safely in my inbox. I usually review new inquiries and reply within 24 hours.
                  </motion.p>

                  {/* Delivery confirmation badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border border-[var(--accent-border)] mb-7"
                    style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Delivered to yosefayalew56@gmail.com</span>
                  </motion.div>

                  {/* Reset button */}
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38 }}
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition border border-[var(--border)] hover:border-[var(--border-focus)] glass-card hover:scale-105 active:scale-95 cursor-pointer"
                    style={{ color: 'var(--text-h)' }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span>Send Another Message</span>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 min-w-0 w-full"
                >
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-text)' }}>Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      required
                      disabled={formStatus === 'submitting'}
                      className="glass-input px-4 py-3 rounded-lg text-base outline-none transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-text)' }}>Your Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      required
                      disabled={formStatus === 'submitting'}
                      className="glass-input px-4 py-3 rounded-lg text-base outline-none transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-text)' }}>Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="What would you like to discuss?"
                      rows={4}
                      required
                      disabled={formStatus === 'submitting'}
                      className="glass-input px-4 py-3 rounded-lg text-base outline-none transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="self-start px-7 py-3 rounded-lg text-base font-semibold transition border-2 border-[var(--accent-text)] disabled:opacity-50 cursor-pointer hover:opacity-90 active:scale-95 flex items-center gap-2"
                    style={{ background: 'var(--accent-text)', color: 'var(--bg)' }}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Delivering Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span className="text-sm">↗</span>
                      </>
                    )}
                  </button>

                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-lg text-sm font-medium bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300"
                    >
                      Something went wrong. Please try again or email me directly at yosefayalew56@gmail.com
                    </motion.div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Scroll Progress Bar ───── */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        className="h-full transition-none"
        style={{ width: `${progress}%`, background: 'var(--accent-text)' }}
      />
    </div>
  );
}

/* ───── Page ───── */
export default function Home() {
  return (
    <>
      <ScrollProgressBar />
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
