'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Logo from '@/components/ui/Logo'

const CULTURE = [
  { icon: '⬛', title: 'Integrity Above All', desc: 'We build relationships on honesty and transparency — with our clients, our partners, and each other.' },
  { icon: '◈', title: 'Growth Mindset', desc: 'Every team member is encouraged to learn, evolve and take ownership of their professional journey.' },
  { icon: '◇', title: 'Team Excellence', desc: 'Great projects are built by great teams. We celebrate collective wins and support each other through challenges.' },
  { icon: '★', title: 'Customer Obsession', desc: 'Everything we do starts and ends with delivering the best experience for the families we serve.' },
]

const BENEFITS = [
  { icon: '💰', title: 'Competitive Salary', desc: 'Market-leading compensation with performance-linked incentives and annual appraisals.' },
  { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive health coverage for you and your immediate family from day one.' },
  { icon: '⏱', title: 'Flexible Hours', desc: 'We trust our team. Flexible schedules that respect your personal time and responsibilities.' },
  { icon: '📈', title: 'Career Growth', desc: 'Structured learning paths, mentorship programmes and internal promotion opportunities.' },
  { icon: '🎯', title: 'Performance Bonuses', desc: 'Your results are rewarded. Quarterly and annual bonuses tied to individual and team achievements.' },
  { icon: '🤝', title: 'Team Culture', desc: 'Annual retreats, team celebrations and a workplace that genuinely feels like family.' },
]

const OPENINGS = [
  {
    title: 'Civil Site Engineer',
    department: 'Engineering',
    type: 'Full Time',
    location: 'Pune, Maharashtra',
    experience: '2–5 Years',
    desc: 'Oversee on-site construction activities, coordinate with contractors, ensure quality benchmarks and maintain project timelines across our ongoing residential developments.',
    skills: ['B.E./B.Tech Civil Engineering', 'AutoCAD / Revit', 'Site Management', 'MahaRERA Compliance'],
  },
  {
    title: 'Sales Executive — Residential Projects',
    department: 'Sales',
    type: 'Full Time',
    location: 'Pune, Maharashtra',
    experience: '1–4 Years',
    desc: 'Drive sales for Aspire\'s premium residential projects — from initial site visits to booking and post-sale follow-ups. Relationship-first, not target-first.',
    skills: ['Real Estate Sales', 'Client Relationship', 'Negotiation', 'CRM Tools'],
  },
  {
    title: 'Architect / Draftsman',
    department: 'Design',
    type: 'Full Time',
    location: 'Pune, Maharashtra',
    experience: '1–3 Years',
    desc: 'Collaborate with the principal architect on residential project designs, prepare detailed drawings and ensure vastu-compliant, functional floor plan layouts.',
    skills: ['AutoCAD', 'SketchUp / Revit', 'Vastu Principles', 'Detailing'],
  },
  {
    title: 'Customer Relationship Manager',
    department: 'CRM',
    type: 'Full Time',
    location: 'Pune, Maharashtra',
    experience: '2–4 Years',
    desc: 'Be the trusted point of contact for homebuyers from booking through possession — managing documentation, coordinating with banks and ensuring a seamless journey.',
    skills: ['Customer Communication', 'Documentation', 'Bank Coordination', 'Problem Solving'],
  },
]

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format', alt: 'Team collaboration', span: 2 },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format', alt: 'Modern office', span: 1 },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format', alt: 'Team meeting', span: 1 },
  { src: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=800&q=80&auto=format', alt: 'Construction site visit', span: 1 },
  { src: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80&auto=format', alt: 'Office environment', span: 1 },
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}

export default function CareersClient() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const WA = '919090274545'

  const applyLink = (title: string) =>
    `https://wa.me/${WA}?text=${encodeURIComponent(`Hi, I'd like to apply for the "${title}" position at Aspire Buildcon.`)}`

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--warm)', fontFamily: "'Jost',sans-serif", minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1.25rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(8,8,8,.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,169,110,.1)' }}>
        <Logo href="/" height={36} />
        <a href="/" style={{ fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(232,226,216,.6)', textDecoration: 'none', transition: 'color .3s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,226,216,.6)')}>
          ← Back to Main Site
        </a>
      </nav>

      {/* ── HERO ── */}
      <section style={{ height: '100vh', minHeight: '620px', position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=85&auto=format"
          alt="Aspire Buildcon Office"
          fill style={{ objectFit: 'cover' }} priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,.97) 0%, rgba(8,8,8,.55) 50%, rgba(8,8,8,.2) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 3rem 6rem', maxWidth: '780px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .2 }}>
            <div style={{ fontSize: '.6rem', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem' }}>Careers at Aspire Buildcon</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Build Pune&apos;s Future.<br />Build Your Career.
            </h1>
            <p style={{ fontSize: '.92rem', color: 'rgba(232,226,216,.75)', maxWidth: '480px', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              Join a team that believes great homes begin with great people. At Aspire Buildcon, your work shapes skylines and transforms lives.
            </p>
            <a href="#openings" style={{ display: 'inline-flex', alignItems: 'center', gap: '.75rem', padding: '.9rem 2.5rem', background: 'var(--gold)', color: '#080808', fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', transition: 'opacity .3s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              View Open Positions ↓
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CULTURE ── */}
      <section style={{ padding: '7rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.75rem' }}>Our DNA</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.1 }}>Culture &amp; Values</h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {CULTURE.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ padding: '2rem', border: '1px solid rgba(201,169,110,.12)', background: 'rgba(201,169,110,.03)', position: 'relative', transition: 'border-color .3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,.12)')}>
                <div style={{ position: 'absolute', top: 0, left: '2rem', right: '2rem', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,169,110,.25),transparent)' }} />
                <div style={{ fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '1rem' }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.25rem', fontWeight: 400, color: 'var(--warm)', marginBottom: '.65rem' }}>{c.title}</h3>
                <p style={{ fontSize: '.74rem', color: 'var(--txt2)', lineHeight: 1.8 }}>{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── LIFE AT ASPIRE (PHOTOS) ── */}
      <section style={{ padding: '3rem 3rem 7rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.75rem' }}>Work Environment</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.1 }}>Life at Aspire</h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: '3px' }}>
            {PHOTOS.map((p, i) => (
              <div key={i} style={{ gridColumn: i === 0 ? 'span 2' : 'span 1', height: i === 0 ? '380px' : '220px', position: 'relative', overflow: 'hidden', background: '#111' }}>
                <Image src={p.src} alt={p.alt} fill style={{ objectFit: 'cover', transition: 'transform .7s ease' }}
                  onMouseEnter={e => { const img = e.currentTarget as HTMLImageElement; img.style.transform = 'scale(1.05)' }}
                  onMouseLeave={e => { const img = e.currentTarget as HTMLImageElement; img.style.transform = 'scale(1)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,.25)' }} />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── WORK LIFE BALANCE ── */}
      <section style={{ padding: '5rem 3rem', background: 'rgba(201,169,110,.03)', borderTop: '1px solid rgba(201,169,110,.08)', borderBottom: '1px solid rgba(201,169,110,.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <Reveal>
            <div>
              <div style={{ fontSize: '.58rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.75rem' }}>Balance &amp; Wellbeing</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
                We Build Great Homes.<br />We Live Great Lives.
              </h2>
              <p style={{ fontSize: '.78rem', color: 'var(--txt2)', lineHeight: 1.9, marginBottom: '1.25rem' }}>
                At Aspire, we understand that the quality of your work is directly tied to the quality of your life outside work. We champion a culture where ambition and balance coexist.
              </p>
              <p style={{ fontSize: '.78rem', color: 'var(--txt2)', lineHeight: 1.9 }}>
                Flexible timings, respectful leadership, and a team that genuinely cares — because the best work comes from people who feel valued.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { value: '5-Day', label: 'Work Week' },
                { value: 'Flexible', label: 'Timings' },
                { value: 'Annual', label: 'Team Retreat' },
                { value: 'Open Door', label: 'Leadership' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '1.5rem', border: '1px solid rgba(201,169,110,.15)', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 300, color: 'var(--gold)', marginBottom: '.35rem' }}>{s.value}</div>
                  <div style={{ fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--txt2)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: '7rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.75rem' }}>Why Join Us</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.1 }}>Benefits &amp; Perks</h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {BENEFITS.map((b, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ padding: '1.75rem 2rem', border: '1px solid rgba(201,169,110,.1)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', transition: 'background .3s, border-color .3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,.04)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,.25)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,169,110,.1)' }}>
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{b.icon}</span>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', fontWeight: 400, color: 'var(--warm)', marginBottom: '.4rem' }}>{b.title}</h3>
                  <p style={{ fontSize: '.72rem', color: 'var(--txt2)', lineHeight: 1.8 }}>{b.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── OPENINGS ── */}
      <section id="openings" style={{ padding: '4rem 3rem 7rem', background: 'rgba(201,169,110,.025)', borderTop: '1px solid rgba(201,169,110,.08)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '.58rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.75rem' }}>We&apos;re Hiring</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.1 }}>Current Openings</h2>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {OPENINGS.map((job, i) => {
              const isOpen = openIdx === i
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div style={{ background: 'rgba(8,8,8,.95)', border: '1px solid rgba(201,169,110,.12)', transition: 'border-color .3s' }}
                    onMouseEnter={e => !isOpen && (e.currentTarget.style.borderColor = 'rgba(201,169,110,.28)')}
                    onMouseLeave={e => !isOpen && (e.currentTarget.style.borderColor = 'rgba(201,169,110,.12)')}>
                    {/* Header row */}
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      style={{ width: '100%', padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.25rem', fontWeight: 400, color: 'var(--warm)', marginBottom: '.4rem' }}>{job.title}</div>
                        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
                          {[job.department, job.type, job.location, job.experience].map((tag, t) => (
                            <span key={t} style={{ fontSize: '.56rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txt2)', padding: '.18rem .6rem', border: '1px solid rgba(201,169,110,.15)' }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <span style={{ color: 'var(--gold)', fontSize: '1.2rem', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .3s' }}>+</span>
                    </button>

                    {/* Expanded */}
                    {isOpen && (
                      <div style={{ padding: '0 2rem 2rem', borderTop: '1px solid rgba(201,169,110,.1)' }}>
                        <p style={{ fontSize: '.78rem', color: 'var(--txt2)', lineHeight: 1.85, margin: '1.5rem 0 1.25rem' }}>{job.desc}</p>
                        <div style={{ marginBottom: '1.75rem' }}>
                          <div style={{ fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.75rem' }}>Key Skills</div>
                          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                            {job.skills.map((s, si) => (
                              <span key={si} style={{ padding: '.25rem .8rem', border: '1px solid rgba(201,169,110,.2)', fontSize: '.62rem', letterSpacing: '.08em', color: 'var(--txt2)' }}>{s}</span>
                            ))}
                          </div>
                        </div>
                        <a
                          href={applyLink(job.title)}
                          target="_blank" rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '.65rem', padding: '.8rem 2rem', background: 'var(--gold)', color: '#080808', fontSize: '.68rem', letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', transition: 'opacity .3s' }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = '.85')}
                          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                          Apply via WhatsApp →
                        </a>
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '7rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 70% at 50% 50%, rgba(201,169,110,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Reveal>
          <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.85rem' }}>Don&apos;t See the Right Fit?</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Send Us Your Profile
            </h2>
            <p style={{ fontSize: '.78rem', color: 'var(--txt2)', lineHeight: 1.9, marginBottom: '2.5rem' }}>
              We&apos;re always looking for exceptional talent. Share your CV and we&apos;ll reach out when the right opportunity arises.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi, I'd like to explore career opportunities at Aspire Buildcon. Please find my profile attached.")}`}
                target="_blank" rel="noreferrer"
                style={{ padding: '.9rem 2.5rem', background: 'var(--gold)', color: '#080808', fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', transition: 'opacity .3s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Apply via WhatsApp
              </a>
              <a
                href="mailto:careers@aspirebuildcons.in"
                style={{ padding: '.9rem 2.5rem', border: '1px solid rgba(201,169,110,.35)', color: 'var(--gold)', fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,.08)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,169,110,.35)' }}>
                Send Email
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <div style={{ padding: '2rem 3rem', borderTop: '1px solid rgba(201,169,110,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txt3)' }}>© 2025 Aspire Buildcon. All rights reserved.</div>
        <a href="/" style={{ fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txt3)', textDecoration: 'none', transition: 'color .3s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--txt3)')}>
          aspirebuildcons.in
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          nav { padding: 1rem 1.5rem !important; }
        }
        @media (max-width: 640px) {
          section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          div[style*="gridTemplateColumns: repeat(3"] { grid-template-columns: 1fr !important; }
          div[style*="gridColumn: span 2"] { grid-column: span 1 !important; height: 240px !important; }
        }
      `}</style>
    </div>
  )
}
