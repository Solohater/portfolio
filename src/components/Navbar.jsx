'use client'
import { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

const links = [
  { href: '#hero', title: 'Home' },
  { href: '#about', title: 'About' },
  { href: '#experience', title: 'Experience' },
  { href: '#projects', title: 'Projects' },
  { href: '#contact', title: 'Contact' },
]

const Navbar = () => {
  const { toggle, mode } = useContext(ThemeContext)
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
          ? 'bg-white/90 dark:bg-[#0f0f15]/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <a
          href="#hero"
          className="text-xl font-bold"
          style={{ color: 'var(--accent)' }}
        >
          YA
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--text)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text)'}
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border"
            style={{
              background: 'var(--accent-bg)',
              color: 'var(--accent)',
              borderColor: 'var(--border)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--accent)'
              e.target.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--accent-bg)'
              e.target.style.color = 'var(--accent)'
            }}
            aria-label="Toggle theme"
          >
            {mode === 'dark' ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
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
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2 transition-colors"
                style={{ color: 'var(--text)' }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text)'}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
