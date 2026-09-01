'use client'
import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeContext } from '@/context/ThemeContext'

const links = [
  { href: '/#hero', title: 'Home' },
  { href: '/#about', title: 'About' },
  { href: '/#experience', title: 'Experience' },
  { href: '/#projects', title: 'Projects' },
  { href: '/#contact', title: 'Contact' },
  { href: '/cv', title: 'CV' },
]

const Navbar = () => {
  const { toggle, mode, toggleBgMode, bgMode } = useContext(ThemeContext)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md shadow-sm bg-[var(--bg)]/20 dark:bg-[var(--bg)]/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <button
          onClick={toggleBgMode}
          className="relative w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold tracking-wider transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            color: '#c0c0c0',
            boxShadow: '0 0 15px rgba(192,192,192,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
            border: '1px solid rgba(192,192,192,0.3)',
          }}
          aria-label={`Switch to ${bgMode === 'realistic' ? 'animated' : 'realistic'} background`}
          title={bgMode === 'realistic' ? 'Animated backgrounds' : 'Realistic backgrounds'}
        >
          <span
            className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: '0 0 25px rgba(192,192,192,0.7), 0 0 50px rgba(192,192,192,0.3)',
            }}
          />
          <span className="relative z-10" style={{
            textShadow: '0 0 10px rgba(192,192,192,0.8), 0 0 20px rgba(192,192,192,0.4)',
          }}>
            {bgMode === 'realistic' ? 'R' : 'A'}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-text)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text)'}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Solohater"
            target="_blank"
            aria-label="GitHub"
            className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </Link>
          <Link
            href="https://gitlab.com/yosephh"
            target="_blank"
            aria-label="GitLab"
            className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="m22.77 9.72-.71-2.18a.87.87 0 0 0-.05-.15l-2.26-6.95a.84.84 0 0 0-1.6 0l-2.26 6.95H8.16L5.9.44a.84.84 0 0 0-1.6 0L2.05 7.39a.87.87 0 0 0-.05.15l-.71 2.18a1.73 1.73 0 0 0 .54 1.92l9.6 7.36a.53.53 0 0 0 .63 0l9.6-7.36a1.73 1.73 0 0 0 .55-1.92zM11.9 18.31 6.5 11.7 11.9 8.1Zm.18 0 5.4-6.61-5.4-3.6Z"/>
            </svg>
          </Link>
          <Link
            href="https://www.linkedin.com/in/yoseph-ayalew-65247b291"
            target="_blank"
            aria-label="LinkedIn"
            className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </Link>
          <button
            onClick={toggle}
            className="relative w-10 h-10 p-0 rounded-lg transition-all duration-200 border hover:bg-black/5 dark:hover:bg-white/10"
            style={{
              background: 'transparent',
              borderColor: 'var(--border)',
            }}
            aria-label="Toggle theme"
          >
            <Image
              src={mode === 'dark' ? '/sun.jpg' : '/moon.png'}
              alt=""
              width={mode === 'dark' ? 38 : 36}
              height={mode === 'dark' ? 38 : 36}
              className={`object-cover object-center rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                mode === 'dark' ? 'w-full h-full' : 'w-9 h-9'
              }`}
            />
          </button>

          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
          <div className="flex flex-col gap-2 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2 transition-colors"
                style={{ color: 'var(--text)' }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-text)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text)'}
              >
                {link.title}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2 border-t border-[var(--border)] mt-2">
              <Link href="https://github.com/Solohater" target="_blank" aria-label="GitHub" onClick={() => setMenuOpen(false)} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link href="https://gitlab.com/yosephh" target="_blank" aria-label="GitLab" onClick={() => setMenuOpen(false)} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="m22.77 9.72-.71-2.18a.87.87 0 0 0-.05-.15l-2.26-6.95a.84.84 0 0 0-1.6 0l-2.26 6.95H8.16L5.9.44a.84.84 0 0 0-1.6 0L2.05 7.39a.87.87 0 0 0-.05.15l-.71 2.18a1.73 1.73 0 0 0 .54 1.92l9.6 7.36a.53.53 0 0 0 .63 0l9.6-7.36a1.73 1.73 0 0 0 .55-1.92zM11.9 18.31 6.5 11.7 11.9 8.1Zm.18 0 5.4-6.61-5.4-3.6Z"/>
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/in/yoseph-ayalew-65247b291" target="_blank" aria-label="LinkedIn" onClick={() => setMenuOpen(false)} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
