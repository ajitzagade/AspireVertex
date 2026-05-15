'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface NavLink { label: string; href: string; cta?: boolean }

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Process', href: '/#process' },
  { label: 'Testimonials', href: '/#testimonials' },
]

export default function Navbar({ links, ctaText = 'Enquire Now', ctaHref = '/#contact', logoText = 'ASPIRE GROUP' }: {
  links?: NavLink[]; ctaText?: string; ctaHref?: string; logoText?: string
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobOpen, setMobOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const navLinks = links || DEFAULT_LINKS

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleClick = (href: string) => {
    setMobOpen(false)
    document.body.style.overflow = ''
    if (href.includes('#')) {
      const [path, hash] = href.split('#')
      if (path === '' || path === pathname) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push(href)
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 400)
      }
    } else {
      router.push(href)
    }
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', fontWeight: 300, color: 'var(--warm)', letterSpacing: '.15em', textTransform: 'uppercase' }}>
            {logoText}
          </span>
        </Link>
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2.2rem', listStyle: 'none' }} className="nav-desktop">
          {navLinks.map(l => (
            <li key={l.label}>
              <button onClick={() => handleClick(l.href)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontSize: '.72rem', letterSpacing: '.13em', textTransform: 'uppercase', color: 'rgba(232,226,216,.7)', transition: 'color .3s' }}
                className={l.cta ? 'nav-cta' : 'nav-link'}>
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => handleClick(ctaHref)} className="nav-cta" style={{ padding: '.55rem 1.5rem', border: '1px solid var(--gold)', color: 'var(--gold)', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontSize: '.72rem', letterSpacing: '.13em', textTransform: 'uppercase', background: 'none', transition: 'all .3s' }}>
              {ctaText}
            </button>
          </li>
        </ul>
        <button onClick={() => { setMobOpen(true); document.body.style.overflow = 'hidden' }}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', cursor: 'pointer', padding: '4px', background: 'none', border: 'none' }} className="hamburger">
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--warm)' }} />
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--warm)' }} />
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--warm)' }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,8,.99)', zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem' }}>
          <button onClick={() => { setMobOpen(false); document.body.style.overflow = '' }}
            style={{ position: 'absolute', top: '1.5rem', right: '2rem', fontSize: '1.8rem', color: 'var(--txt2)', cursor: 'pointer', background: 'none', border: 'none', transition: 'color .3s' }}>✕</button>
          {navLinks.map(l => (
            <button key={l.label} onClick={() => handleClick(l.href)}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.6rem', fontWeight: 300, color: 'var(--txt2)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color .3s' }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => handleClick(ctaHref)}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.6rem', fontWeight: 300, color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}>
            {ctaText}
          </button>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex !important; }
        .hamburger { display: none !important; }
        @media(max-width:768px){
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
        .nav-link:hover { color: var(--warm) !important; }
        .nav-cta:hover { background: var(--gold) !important; color: var(--bg) !important; }
      `}</style>
    </>
  )
}