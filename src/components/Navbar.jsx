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

        <div className="flex items-center gap-4">
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
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
