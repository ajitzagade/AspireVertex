'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const TEAM = [
  {
    name: 'Mahesh S. Zagade',
    designation: 'Founder & Principal Architect',
    experience: '15+ Years',
    intro: "Visionary architect and co-founder driving Aspire Buildcon's design philosophy — blending modern aesthetics with vastu principles and sustainable construction practices across Pune.",
    initials: 'MZ',
    image: '',
  },
  {
    name: 'Abhijit S. Shilimkar',
    designation: 'Co-Founder & Chief Engineer',
    experience: '15+ Years',
    intro: "Structural engineering expert ensuring every Aspire project is built to the highest quality standards — on time, on budget, and built to endure for generations.",
    initials: 'AS',
    image: '',
  },
  {
    name: 'Yogesh Shilimkar',
    designation: 'Director',
    experience: '10+ Years',
    intro: "Key leader at Aspire Buildcon contributing to project planning, business development and ensuring seamless delivery across all ongoing developments in Pune.",
    initials: 'YS',
    image: '',
  },
  {
    name: 'Harishchandra Anarse',
    designation: 'Director',
    experience: '10+ Years',
    intro: "Driving operational excellence and client relationships at Aspire Buildcon — committed to upholding the highest standards of quality and customer satisfaction.",
    initials: 'HA',
    image: '',
  },
]

interface CardInfo { x: number; y: number; idx: number }

export default function TeamOrbit() {
  const angleRef = useRef(0)
  const rafRef = useRef<number>(0)
  const speedRef = useRef(0.1)
  const [angleDeg, setAngleDeg] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [radius, setRadius] = useState(200)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setIsMobile(w < 640)
      setRadius(w < 480 ? 108 : w < 640 ? 134 : w < 900 ? 165 : 205)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const animate = () => {
      const target = hoveredIdx !== null ? 0 : 0.1
      speedRef.current += (target - speedRef.current) * 0.035
      angleRef.current = (angleRef.current + speedRef.current) % 360
      setAngleDeg(angleRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hoveredIdx, isMobile])

  const getPos = (idx: number) => {
    const deg = angleDeg + (360 / TEAM.length) * idx
    const rad = (deg * Math.PI) / 180
    return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
  }

  const handleEnter = (idx: number, e: React.MouseEvent) => {
    setHoveredIdx(idx)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setCardInfo({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, idx })
  }
  const handleLeave = () => { setHoveredIdx(null); setCardInfo(null) }

  const containerSize = (radius + 90) * 2

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section style={{ padding: '4rem 1.5rem 3rem', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '.58rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.75rem' }}>The People Behind Aspire</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.4rem', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.1 }}>Leadership & Vision</h2>
        </div>
        <div style={{ maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {TEAM.map((m, i) => (
            <div key={i} style={{ padding: '1.5rem', border: '1px solid rgba(201,169,110,.15)', background: 'rgba(201,169,110,.03)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '1px solid rgba(201,169,110,.4)', background: 'rgba(201,169,110,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--gold)', flexShrink: 0 }}>
                {m.image ? <Image src={m.image} alt={m.name} width={54} height={54} style={{ borderRadius: '50%', objectFit: 'cover' }} /> : m.initials}
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', color: 'var(--warm)', fontWeight: 400 }}>{m.name}</div>
                <div style={{ fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '.2rem', marginBottom: '.65rem' }}>{m.designation}</div>
                <p style={{ fontSize: '.72rem', color: 'var(--txt2)', lineHeight: 1.75, margin: 0 }}>{m.intro}</p>
                <div style={{ marginTop: '.65rem', display: 'inline-flex', padding: '.18rem .65rem', border: '1px solid rgba(201,169,110,.2)' }}>
                  <span style={{ fontSize: '.56rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txt2)' }}>{m.experience} Experience</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // ── Desktop orbital layout ─────────────────────────────────────────────────
  return (
    <section style={{ padding: '5rem 0 3rem', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(201,169,110,.045) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
        <div style={{ fontSize: '.6rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.75rem' }}>The People Behind Aspire</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.2rem,3.5vw,3.2rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.1, marginBottom: '.85rem' }}>
          Leadership &amp; Vision
        </h2>
        <p style={{ fontSize: '.78rem', color: 'var(--txt2)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.85 }}>
          Guided by visionary founders with over a decade of excellence in Pune&apos;s real estate landscape.
        </p>
      </div>

      {/* Orbit canvas */}
      <div style={{ position: 'relative', width: `${containerSize}px`, height: `${containerSize}px`, margin: '0 auto' }}>
        {/* Decorative rings */}
        <div style={{ position: 'absolute', inset: '24px', borderRadius: '50%', border: '1px solid rgba(201,169,110,.06)' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(201,169,110,.11)' }} />

        {/* Orbit dots */}
        {[0, 60, 120, 180, 240, 300].map(deg => (
          <div key={deg} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '3px', height: '3px', borderRadius: '50%',
            background: 'rgba(201,169,110,.22)',
            transform: `translate(-50%,-50%) rotate(${deg}deg) translateX(${radius}px)`,
          }} />
        ))}

        {/* Center logo */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 5 }}>
          <div style={{ padding: '1.2rem', borderRadius: '50%', border: '1px solid rgba(201,169,110,.22)', background: 'rgba(8,8,8,.95)', backdropFilter: 'blur(12px)', boxShadow: '0 0 60px rgba(201,169,110,.08)' }}>
            <Image src="/logo.png" alt="Aspire Buildcon" width={58} height={60} style={{ display: 'block' }} />
          </div>
        </div>

        {/* Team members */}
        {TEAM.map((member, idx) => {
          const { x, y } = getPos(idx)
          const isHovered = hoveredIdx === idx
          return (
            <div
              key={idx}
              onMouseEnter={(e) => handleEnter(idx, e)}
              onMouseLeave={handleLeave}
              style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                zIndex: isHovered ? 10 : 4,
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
            >
              <div style={{
                width: isHovered ? '104px' : '90px',
                height: isHovered ? '104px' : '90px',
                borderRadius: '50%',
                border: `2px solid ${isHovered ? '#c9a96e' : 'rgba(201,169,110,.32)'}`,
                background: isHovered ? 'rgba(201,169,110,.12)' : 'rgba(10,10,10,.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: isHovered ? '1.6rem' : '1.4rem',
                color: 'var(--gold)',
                transition: 'all .38s cubic-bezier(.4,0,.2,1)',
                boxShadow: isHovered
                  ? '0 0 0 8px rgba(201,169,110,.08), 0 0 40px rgba(201,169,110,.2)'
                  : '0 0 0 6px rgba(201,169,110,.04)',
                backdropFilter: 'blur(8px)',
                overflow: 'hidden',
              }}>
                {member.image
                  ? <Image src={member.image} alt={member.name} width={104} height={104} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  : <span>{member.initials}</span>}
              </div>
              {/* name tag */}
              <div style={{ marginTop: '.6rem', textAlign: 'center', opacity: isHovered ? 1 : 0.55, transition: 'opacity .3s' }}>
                <div style={{ fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: isHovered ? 'var(--gold)' : 'var(--txt2)', fontFamily: "'Jost',sans-serif", whiteSpace: 'nowrap' }}>
                  {member.name.split(' ').slice(0, 2).join(' ')}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Floating hover card */}
      {cardInfo !== null && (() => {
        const m = TEAM[cardInfo.idx]
        const W = 300, H = 230
        let left = cardInfo.x + 54
        let top = cardInfo.y - H / 2
        if (typeof window !== 'undefined') {
          if (left + W > window.innerWidth - 16) left = cardInfo.x - W - 54
          if (top < 16) top = 16
          if (top + H > window.innerHeight - 16) top = window.innerHeight - H - 16
        }
        return (
          <div style={{ position: 'fixed', top, left, width: `${W}px`, zIndex: 9999, pointerEvents: 'none', animation: 'teamCardIn .22s cubic-bezier(.4,0,.2,1) forwards' }}>
            <div style={{ background: 'rgba(8,8,8,.97)', border: '1px solid rgba(201,169,110,.25)', backdropFilter: 'blur(28px)', padding: '1.75rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '1.75rem', right: '1.75rem', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,169,110,.5),transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(201,169,110,.4)', background: 'rgba(201,169,110,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", color: 'var(--gold)', fontSize: '1rem', flexShrink: 0 }}>
                  {m.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'var(--warm)', fontWeight: 400, lineHeight: 1.2 }}>{m.name}</div>
                  <div style={{ fontSize: '.57rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '.25rem' }}>{m.designation}</div>
                </div>
              </div>
              <div style={{ display: 'inline-flex', padding: '.2rem .7rem', border: '1px solid rgba(201,169,110,.2)', marginBottom: '.85rem' }}>
                <span style={{ fontSize: '.57rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txt2)' }}>{m.experience} Experience</span>
              </div>
              <p style={{ fontSize: '.73rem', color: 'var(--txt2)', lineHeight: 1.8, margin: 0 }}>{m.intro}</p>
            </div>
          </div>
        )
      })()}

      <style>{`
        @keyframes teamCardIn {
          from { opacity: 0; transform: translateY(10px) scale(.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);   }
        }
      `}</style>
    </section>
  )
}
