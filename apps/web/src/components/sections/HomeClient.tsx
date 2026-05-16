'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Project, Testimonial, SiteSettings } from '@/types'
import Navbar from '@/components/ui/NavBar'
import Footer from '@/components/ui/Footer'
import ContactForm from '@/components/ui/ContactForm'
import ProjectModal from '@/components/ui/ProjectModal'

interface Props {
  projects: Project[]
  testimonials: Testimonial[]
  settings: SiteSettings
}

// ── Animated counter hook ──
function useCounter(target: number, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let current = 0
    const step = target / (1800 / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setVal(target); clearInterval(timer); return }
      setVal(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target])
  return val
}

function StatCell({ prefix = '', suffix = '', target, label }: { prefix?: string; suffix: string; target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const val = useCounter(target, inView)
  return (
    <div className="stat-cell" ref={ref}>
      <span className="stat-num" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.6rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, display: 'block' }}>
        {prefix}{val}{suffix}
      </span>
      <span className="stat-lbl" style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--txt2)', marginTop: '0.5rem', display: 'block' }}>{label}</span>
    </div>
  )
}

// ── Scroll reveal wrapper ──
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function HomeClient({ projects, testimonials, settings }: Props) {
  const [slideIdx, setSlideIdx] = useState(0)
  const [projFilter, setProjFilter] = useState('')
  const [modalKey, setModalKey] = useState<string | null>(null)

  const slides = settings.heroSlides || []
  const marqueeItems = settings.marqueeItems || []
  const stats = settings.stats || []
  const journey = settings.journeySteps || []
  const wa = settings.whatsappNumber || '919090274545'

  // Content blocks with seed fallbacks
  const hero = settings.hero || {}
  const about = settings.about || {}
  const trustBar = settings.trustBar || [
    { value: '100%', label: 'On-Time Delivery Record' },
    { value: '₹0', label: 'Hidden Charges. Ever.' },
    { value: '500+', label: 'Families Who Trust Us' },
    { value: '4.9★', label: 'Average Customer Rating' },
  ]
  const cta = settings.cta || {}
  const testimonialsSec = settings.testimonialsSection || {}

  const heroTagline = hero.tagline || "Pune's Premier Real Estate Developers"
  const heroHeadline = hero.headline || "Where Vision Becomes Architecture"
  const heroCopy = hero.copy || "Aspire InfraTech crafts landmark residences across Katraj, Ambegaon & Kondhwa — built on trust, designed for generations."
  const heroCtaPrimary = hero.ctaPrimary || 'Explore Projects →'
  const heroCtaSecondary = hero.ctaSecondary || 'Schedule Site Visit'
  const heroRightStats = hero.rightStats || [
    { value: '825K', suffix: '+', label: 'Sq.Ft. Delivered' },
    { value: '₹375', suffix: 'Cr', label: 'Turnover' },
    { value: '10', suffix: '+', label: 'Years of Trust' },
  ]

  const aboutHeading = about.heading || "Building Pune's Future Skyline"
  const aboutCopy = about.copy || "Founded by Architect Mahesh S. Zagade and Engineer Abhijit S. Shilimkar, Aspire InfraTech is Pune's most trusted real estate consortium — delivering landmark residential and commercial developments with unwavering integrity since 2014."
  const aboutOverlayStat = about.overlayStat || '₹375'
  const aboutOverlayLabel = about.overlayLabel || 'Crore Turnover'
  const aboutPillars = about.pillars || [
    { icon: '⬛', title: 'Architectural Excellence', desc: 'Premium materials, modern design and meticulous planning at every scale.' },
    { icon: '⏱', title: 'On-Time Delivery', desc: 'Every project delivered on schedule — no delays, no compromises.' },
    { icon: '✓', title: 'RERA Registered', desc: 'Fully MahaRERA compliant — transparent, ethical and trusted.' },
    { icon: '★', title: 'Customer First', desc: 'Dedicated relationship managers and lifetime post-possession support.' },
  ]

  const ctaHeadline = cta.headline || "Ready to Find Your Dream Home?"
  const ctaCopy = cta.copy || "Speak with our expert advisors — no pressure, just genuine guidance for your family."
  const ctaFeaturedSlug = cta.featuredSlug || 'siddhi-aspire'

  const testimonialRating = testimonialsSec.rating || '4.9'
  const testimonialReviewCount = testimonialsSec.reviewCount || '200+ Reviews'
  const testimonialProjectList = testimonialsSec.projectList || ['Siddhi Aspire, Katraj', 'Optima – The Pavilion', 'Mansi Residency', 'Rajveer Heights', 'Aradhya Residency']

  const contactMapEmbed = settings.contactMapEmbed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.0!2d73.8553!3d18.4528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295617a30fce5%3A0x3f2f63c60caaef8a!2sKatraj%2C%20Pune!5e0!3m2!1sen!2sin!4v1700000000000'

  // Hero auto-slide
  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => setSlideIdx(i => (i + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [slides.length])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      {modalKey && <ProjectModal projectKey={modalKey} onClose={() => setModalKey(null)} phone={wa} />}

      {/* ①  HERO */}
      <section className="hero" id="home" style={{ height: '100vh', minHeight: '680px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {slides.map((s, i) => (
            <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === slideIdx ? 1 : 0, transition: 'opacity 1.8s var(--ease)' }}>
              <Image src={s.image} alt={s.alt} fill style={{ objectFit: 'cover' }} priority={i === 0} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,8,.97) 0%,rgba(8,8,8,.5) 45%,rgba(8,8,8,.2) 100%)' }} />
            </div>
          ))}
        </div>

        <div className="hero-body" style={{ position: 'relative', zIndex: 2, padding: '0 4rem 5.5rem', maxWidth: '820px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ width: '36px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '.64rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>{heroTagline}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3.2rem,7vw,6.2rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.05, marginBottom: '1.1rem' }}>
            {heroHeadline}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            style={{ fontSize: '.9rem', color: 'var(--txt2)', maxWidth: '440px', lineHeight: 1.9, marginBottom: '2.5rem' }}>
            {heroCopy}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={() => scrollTo('projects')}>{heroCtaPrimary}</button>
            <button className="btn-outline" onClick={() => scrollTo('contact')}>{heroCtaSecondary}</button>
          </motion.div>
        </div>

        {/* Right stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
          style={{ position: 'absolute', right: '4rem', bottom: '5.5rem', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'right' }}>
          {heroRightStats.map(({ value, suffix, label }) => (
            <div key={label}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{value}<small style={{ fontSize: '1rem' }}>{suffix}</small></div>
              <div style={{ fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(80,76,72,.9)', marginTop: '.2rem' }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', gap: '.75rem' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlideIdx(i)}
              style={{ width: i === slideIdx ? '48px' : '24px', height: '2px', background: i === slideIdx ? 'var(--gold)' : 'rgba(201,169,110,.3)', border: 'none', cursor: 'pointer', transition: 'all .4s' }} />
          ))}
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '4rem', zIndex: 2, display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold), transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '.6rem', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--txt3)' }}>Scroll to Explore</span>
        </div>
      </section>

      {/* ② MARQUEE */}
      <div style={{ background: 'var(--gold)', padding: '.65rem 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">{item}<span style={{ width: '3px', height: '3px', background: 'rgba(0,0,0,.3)', borderRadius: '50%', display: 'inline-block' }} /></span>
          ))}
        </div>
      </div>

      {/* ③ ABOUT */}
      <section id="about" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', padding: '8rem 4rem', background: 'var(--bg)' }}>
        <Reveal>
          <div style={{ position: 'relative' }}>
            <Image src={settings.aboutImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format'}
              alt="Aspire InfraTech Development" width={600} height={520} style={{ width: '100%', height: '520px', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '2.5rem', right: '-1.5rem', width: '130px', height: '130px', border: '1px solid var(--bdr2)', background: 'rgba(8,8,8,.92)', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '.3rem', zIndex: 2 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.6rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{aboutOverlayStat}</div>
              <div style={{ fontSize: '.54rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--txt2)', padding: '0 .5rem' }}>{aboutOverlayLabel}</div>
            </div>
            <div style={{ position: 'absolute', top: '2.5rem', right: '-1.5rem', width: '56px', height: '56px', borderTop: '1px solid var(--bdr2)', borderRight: '1px solid var(--bdr2)' }} />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="sec-eye"><span>About Aspire InfraTech</span></div>
          <h2 className="sec-h">{aboutHeading}</h2>
          <div className="gold-line" />
          <p style={{ fontSize: '.9rem', color: 'var(--txt2)', lineHeight: 1.9, marginBottom: '2rem' }}>
            {aboutCopy}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
            {aboutPillars.map(({ icon, title, desc }) => (
              <div key={title} className="pillar">
                <div style={{ fontSize: '1.25rem', marginBottom: '.5rem' }}>{icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', color: 'var(--warm)', marginBottom: '.25rem' }}>{title}</div>
                <p style={{ fontSize: '.77rem', color: 'var(--txt2)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
          <button className="btn-gold" onClick={() => scrollTo('contact')}>Schedule a Meeting →</button>
        </Reveal>
      </section>

      {/* ④ STATS */}
      <div className="stats-strip">
        {stats.map((s) => <StatCell key={s.label} prefix={s.prefix} target={s.target} suffix={s.suffix} label={s.label} />)}
      </div>

      {/* ⑤ PROJECTS */}
      <section id="projects" style={{ padding: '8rem 4rem', background: 'var(--bg)' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div className="sec-eye"><span>Our Portfolio</span></div>
              <h2 className="sec-h">Landmark <em>Developments</em></h2>
            </div>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {['', 'ongoing', 'completed', 'upcoming', 'commercial'].map(f => (
                <button key={f} onClick={() => setProjFilter(f)}
                  style={{ padding: '.45rem 1.25rem', fontSize: '.68rem', letterSpacing: '.12em', textTransform: 'uppercase', border: '1px solid', borderColor: projFilter === f ? 'var(--gold)' : 'var(--bdr)', color: projFilter === f ? 'var(--gold)' : 'var(--txt2)', cursor: 'pointer', transition: 'all .3s', background: projFilter === f ? 'rgba(201,169,110,.05)' : 'transparent' }}>
                  {f === '' ? 'All' : f === 'commercial' ? 'Commercial' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Featured project — full width hero card */}
        {(() => {
          const featured = projects.find(p => p.isFeatured && (!projFilter || p.status === projFilter || (projFilter === 'commercial' && p.type === 'commercial')))
          const grid = projects.filter(p => {
            const matchFilter = !projFilter || p.status === projFilter || (projFilter === 'commercial' && p.type === 'commercial')
            return matchFilter && !p.isFeatured
          })
          const allVisible = projects.filter(p => !projFilter || p.status === projFilter || (projFilter === 'commercial' && p.type === 'commercial'))

          return (
            <>
              {featured && (
                <Reveal delay={0.05}>
                  <div className="proj-card" style={{ position: 'relative', height: '480px', marginBottom: '3px', cursor: 'pointer' }}
                    onClick={() => window.open(`/projects/${featured.slug}`, '_blank')}>
                    <Image src={featured.cardImage || featured.heroImage} alt={featured.name} fill style={{ objectFit: 'cover' }} />
                    <div className="proj-overlay" />
                    <a href={`/projects/${featured.slug}`} className="proj-ext" onClick={e => e.stopPropagation()}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                    </a>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem 3rem', zIndex: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
                        <span style={{ padding: '.28rem .75rem', border: '1px solid var(--gold)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>{featured.tag}</span>
                        <span style={{ padding: '.28rem .75rem', background: 'var(--gold)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#080808', fontWeight: 600 }}>Featured</span>
                      </div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.1, marginBottom: '.5rem' }}>{featured.name}</h3>
                      <p style={{ fontSize: '.78rem', color: 'var(--txt2)', marginBottom: '1.25rem', maxWidth: '540px' }}>{featured.tagline}</p>
                      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                        <div><span style={{ fontSize: '.6rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.15rem' }}>Starting</span><span style={{ fontSize: '.92rem', color: 'var(--warm)' }}>{featured.startingPrice}</span></div>
                        <div><span style={{ fontSize: '.6rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.15rem' }}>Units</span><span style={{ fontSize: '.92rem', color: 'var(--warm)' }}>{featured.unitTypes}</span></div>
                        <div><span style={{ fontSize: '.6rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.15rem' }}>Possession</span><span style={{ fontSize: '.92rem', color: 'var(--warm)' }}>{featured.possession}</span></div>
                        <div><span style={{ fontSize: '.6rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.15rem' }}>Location</span><span style={{ fontSize: '.92rem', color: 'var(--warm)' }}>{featured.location}</span></div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* 3-column grid for all other projects */}
              {grid.length > 0 && (
                <Reveal delay={0.1}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '3px', marginTop: featured ? '3px' : 0 }}>
                    {grid.map(p => (
                      <div key={p.slug} className="proj-card" style={{ position: 'relative', height: '320px', cursor: 'pointer' }}
                        onClick={() => window.open(`/projects/${p.slug}`, '_blank')}>
                        <Image src={p.cardImage || p.heroImage} alt={p.name} fill style={{ objectFit: 'cover' }} />
                        <div className="proj-overlay" />
                        <a href={`/projects/${p.slug}`} className="proj-ext" onClick={e => e.stopPropagation()}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                        </a>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                          <span style={{ display: 'inline-block', padding: '.22rem .65rem', border: '1px solid var(--gold)', fontSize: '.54rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.5rem' }}>{p.tag}</span>
                          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.15, marginBottom: '.3rem' }}>{p.name}</h3>
                          <p style={{ fontSize: '.68rem', color: 'var(--txt2)' }}>{p.location} · from {p.startingPrice}</p>
                          <div style={{ marginTop: '.6rem', display: 'flex', gap: '1.25rem' }}>
                            <div><strong style={{ display: 'block', fontSize: '.78rem', color: 'var(--warm)', fontWeight: 400 }}>{p.unitTypes}</strong><span style={{ fontSize: '.62rem', color: 'var(--txt2)' }}>Units</span></div>
                            <div><strong style={{ display: 'block', fontSize: '.78rem', color: 'var(--warm)', fontWeight: 400 }}>{p.possession}</strong><span style={{ fontSize: '.62rem', color: 'var(--txt2)' }}>Possession</span></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* No results */}
              {allVisible.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--txt2)', fontSize: '.88rem' }}>
                  No projects in this category yet.
                </div>
              )}
            </>
          )
        })()}

        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: '3.5rem', paddingTop: '3rem', borderTop: '1px solid var(--bdr)' }}>
            <p style={{ fontSize: '.82rem', color: 'var(--txt2)', marginBottom: '1.25rem' }}>Explore our complete portfolio — ongoing, completed, upcoming &amp; commercial developments across Pune.</p>
            <Link href="/all-projects" className="btn-gold" style={{ display: 'inline-flex' }}>View All Projects &amp; Developments →</Link>
          </div>
        </Reveal>
      </section>

      {/* ⑥ JOURNEY / PROCESS */}
      <section id="process" style={{ padding: '8rem 4rem', background: 'var(--ch)', borderTop: '1px solid var(--bdr)' }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 5rem' }}>
            <div className="sec-eye" style={{ justifyContent: 'center' }}><span>Your Home Buying Journey</span></div>
            <h2 className="sec-h">We Walk Every Step<br /><em>With You</em></h2>
            <div className="gold-line" style={{ margin: '1.4rem auto' }} />
            <p style={{ fontSize: '.9rem', color: 'var(--txt2)', lineHeight: 1.9 }}>Buying a home is not just a financial decision — it is a dream your entire family has cherished. We honour that emotion at every stage of your journey with us.</p>
          </div>
        </Reveal>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {journey.map((step, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ display: 'grid', gridTemplateColumns: step.isLast ? '64px 1fr' : '64px 48px 1fr', gap: '0 1.5rem', position: 'relative' }}>
                <div style={{ width: '52px', height: '52px', border: `1px solid ${step.isLast ? 'transparent' : 'var(--gold)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: step.isLast ? 'var(--bg)' : 'var(--gold)', background: step.isLast ? 'var(--gold)' : 'var(--ch)', marginTop: '.25rem', zIndex: 2 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                {!step.isLast && (
                  <div style={{ width: '1px', background: 'linear-gradient(to bottom,var(--gold-dk),rgba(201,169,110,.15))', margin: '52px auto 0' }} />
                )}
                <div className={step.isLast ? 'journey-card-last' : 'journey-card'}>
                  <div style={{ fontSize: '2rem', marginBottom: '.75rem', lineHeight: 1 }}>{step.icon}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.45rem', fontWeight: 400, color: 'var(--warm)', marginBottom: '.75rem', lineHeight: 1.25 }}>{step.head}</div>
                  <p style={{ fontSize: '.85rem', color: 'var(--txt2)', lineHeight: 1.9, marginBottom: '1.25rem' }}>{step.body}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                    {step.badges.map(b => (
                      <span key={b} style={{ padding: '.25rem .75rem', border: '1px solid var(--bdr)', fontSize: '.62rem', letterSpacing: '.1em', color: 'var(--gold)', background: 'rgba(201,169,110,.05)' }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust bar */}
        <Reveal delay={0.2}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4rem', border: '1px solid var(--bdr)', background: 'var(--sl)', flexWrap: 'wrap' }}>
            {trustBar.map(({ value, label }, i, arr) => (
              <React.Fragment key={label}>
                <div style={{ padding: '2rem 3rem', textAlign: 'center', flex: 1, minWidth: '150px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '.4rem' }}>{value}</div>
                  <div style={{ fontSize: '.65rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--txt2)' }}>{label}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width: '1px', height: '64px', background: 'var(--bdr)', flexShrink: 0 }} />}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ⑦ TESTIMONIALS */}
      <section id="testimonials" style={{ padding: '8rem 4rem', background: 'var(--bg)' }}>
        <Reveal>
          <div className="sec-eye"><span>Client Stories</span></div>
          <h2 className="sec-h">What Our Homeowners<br /><em>Say About Us</em></h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', marginTop: '4rem', alignItems: 'start' }}>
          <Reveal delay={0.1}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '5.5rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{testimonialRating}</div>
            <div style={{ color: 'var(--gold)', fontSize: '1.1rem', letterSpacing: '4px', margin: '.4rem 0' }}>★★★★★</div>
            <div style={{ fontSize: '.72rem', color: 'var(--txt2)' }}>Average Rating · {testimonialReviewCount}</div>
            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
              {testimonialProjectList.map(name => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '.9rem', padding: '.85rem 1rem', border: '1px solid var(--bdr)', transition: 'border-color .3s' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: '.78rem', color: 'var(--txt2)' }}>{name}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <Reveal key={t._id || i} delay={i * 0.1}>
                <div className="tcard">
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: 'var(--gold)', opacity: .3, lineHeight: .5, marginBottom: '.8rem' }}>"</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--txt)', lineHeight: 1.85, marginBottom: '1.4rem' }}>{t.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '42px', height: '42px', border: '1px solid var(--bdr2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '.95rem', color: 'var(--gold)', background: 'rgba(201,169,110,.08)' }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: '.88rem', color: 'var(--warm)' }}>{t.name}</div>
                      <div style={{ fontSize: '.66rem', color: 'var(--gold)', letterSpacing: '.08em' }}>{t.projectName}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑧ CTA BAND */}
      <section style={{ padding: '8rem 4rem', textAlign: 'center', background: 'var(--ch)', borderTop: '1px solid var(--bdr)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,169,110,.055) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <Reveal>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4.4rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.1, marginBottom: '1.2rem', position: 'relative' }}>
            {ctaHeadline}
          </h2>
          <p style={{ fontSize: '.88rem', color: 'var(--txt2)', maxWidth: '440px', margin: '0 auto 2.75rem', position: 'relative', lineHeight: 1.9 }}>{ctaCopy}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', position: 'relative' }}>
            <button className="btn-gold" onClick={() => scrollTo('contact')}>Schedule a Site Visit →</button>
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="btn-wa">WhatsApp Us Now</a>
            <Link href={`/projects/${ctaFeaturedSlug}`} className="btn-outline">View {projects.find(p => p.slug === ctaFeaturedSlug)?.name || 'Our Project'} ↗</Link>
          </div>
        </Reveal>
      </section>

      {/* ⑨ CONTACT */}
      <section id="contact" style={{ padding: '8rem 4rem', background: 'var(--bg)' }}>
        <Reveal>
          <div className="sec-eye"><span>Get In Touch</span></div>
          <h2 className="sec-h">Let's Start Your<br /><em>Property Journey</em></h2>
          <div className="gold-line" />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '6rem', marginTop: '4rem' }}>
          <Reveal delay={0.1}>
            {[['📍', 'Office Address', settings.address || ''], ['📞', 'Phone', settings.phone || ''], ['✉', 'Email', settings.email || ''], ['⏰', 'Office Hours', settings.officeHours || '']].map(([ic, lbl, val]) => (
              <div key={lbl} style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid var(--bdr)' }}>
                <div style={{ width: '46px', height: '46px', border: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontSize: '1.1rem', flexShrink: 0 }}>{ic}</div>
                <div>
                  <div style={{ fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.25rem' }}>{lbl}</div>
                  <div style={{ fontSize: '.9rem', color: 'var(--txt)' }}>{val}</div>
                </div>
              </div>
            ))}
            <div style={{ border: '1px solid var(--bdr)', overflow: 'hidden' }}>
              <iframe src={contactMapEmbed}
                width="100%" height="220" style={{ border: 0, filter: 'grayscale(1) contrast(.85)', opacity: .7, display: 'block' }} allowFullScreen loading="lazy" title="Map" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <Footer settings={settings} />
    </>
  )
}
