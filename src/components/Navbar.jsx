'use client'
import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [menuCopied, setMenuCopied] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on Escape key or window resize to desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${
        scrolled
          ? 'bg-[var(--bg)]/50 dark:bg-[var(--bg)]/60 border-[var(--border)] shadow-sm'
          : 'bg-[var(--bg)]/30 dark:bg-[var(--bg)]/40 border-[var(--border)]'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <button
          onClick={toggleBgMode}
          className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold glass-card transition-all duration-300 hover:scale-105"
          aria-label={`Current: ${bgMode} background. Click to switch to ${bgMode === 'realistic' ? 'animated' : 'realistic'}`}
          title={`Switch to ${bgMode === 'realistic' ? 'animated' : 'realistic'} background video`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline font-mono tracking-wide text-xs" style={{ color: 'var(--text-h)' }}>
            BG: {bgMode === 'realistic' ? 'Realistic' : 'Animated'}
          </span>
          <span className="sm:hidden font-mono font-bold text-xs" style={{ color: 'var(--text-h)' }}>
            {bgMode === 'realistic' ? 'REAL' : 'ANIM'}
          </span>
          <span className="text-[10px] opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text)' }}>⇄</span>
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

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="relative w-10 h-10 p-0 rounded-xl transition-all duration-200 border glass-card hover:scale-105 active:scale-95"
            style={{
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

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 border glass-card hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              borderColor: 'var(--border)',
            }}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
              style={{ background: 'var(--text-h)' }}
            />
            <span
              className={`block w-5 h-0.5 rounded-full transition-all duration-200 ${
                menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
              }`}
              style={{ background: 'var(--text-h)' }}
            />
            <span
              className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
              style={{ background: 'var(--text-h)' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Glass Modal */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Floating Glass Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-18 left-3 right-3 sm:left-6 sm:right-6 z-50 md:hidden rounded-2xl glass-card overflow-hidden shadow-2xl border border-[var(--border)]"
              style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              <div className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between px-3 py-1.5 mb-1 border-b border-[var(--border)]">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-60" style={{ color: 'var(--text)' }}>
                    Navigation
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--accent-bg)]" style={{ color: 'var(--accent-text)' }}>
                    {bgMode === 'realistic' ? 'Realistic BG' : 'Animated BG'}
                  </span>
                </div>

                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10 active:scale-[0.99]"
                  >
                    <span className="text-sm font-semibold tracking-wide transition-colors group-hover:translate-x-1 duration-200" style={{ color: 'var(--text-h)' }}>
                      {link.title}
                    </span>

                    {link.title === 'CV' ? (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--accent-bg)] text-[var(--accent-text)]">
                        Resume
                      </span>
                    ) : (
                      <span className="text-xs opacity-0 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all" style={{ color: 'var(--accent-text)' }}>
                        →
                      </span>
                    )}
                  </Link>
                ))}

                {/* Mobile Quick Action Footer */}
                <div className="mt-2 pt-3 border-t border-[var(--border)] flex items-center justify-between px-2 gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href="https://github.com/Solohater"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      style={{ color: 'var(--text)' }}
                      aria-label="GitHub"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/yoseph-ayalew-65247b291"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      style={{ color: 'var(--text)' }}
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a
                      href="https://t.me/YOSEP015"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      style={{ color: 'var(--text)' }}
                      aria-label="Telegram"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('yosefayalew56@gmail.com')
                      setMenuCopied(true)
                      setTimeout(() => setMenuCopied(false), 2000)
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      menuCopied
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20'
                    }`}
                    style={{ color: menuCopied ? '#ffffff' : 'var(--text-h)' }}
                    title="Copy email to clipboard"
                  >
                    {menuCopied ? (
                      <>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
