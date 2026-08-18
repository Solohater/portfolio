'use client'
import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
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
          href="/#hero"
          className="text-xl font-bold"
          style={{ color: 'var(--accent-text)' }}
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
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-text)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text)'}
            >
              {link.title}
            </a>
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
              src={mode === 'dark' ? '/moon.png' : '/sun.jpg'}
              alt=""
              width={28}
              height={28}
              className="w-7 h-7 object-cover rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2 transition-colors"
                style={{ color: 'var(--text)' }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-text)'}
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
