'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/types'
import Navbar from '@/components/ui/NavBar'
import Footer from '@/components/ui/Footer'

type FilterType = 'all' | 'ongoing' | 'completed' | 'commercial' | 'upcoming' | 'featured'

interface Props {
  projects: Project[]
  waNumber?: string
}

const FILTER_TABS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'featured', label: 'Featured' },
]

const COUNTS: Record<FilterType, (projects: Project[]) => number> = {
  all: (ps) => ps.length,
  ongoing: (ps) => ps.filter((p) => p.status === 'ongoing').length,
  completed: (ps) => ps.filter((p) => p.status === 'completed').length,
  commercial: (ps) => ps.filter((p) => p.type === 'commercial').length,
  upcoming: (ps) => ps.filter((p) => p.status === 'upcoming').length,
  featured: (ps) => ps.filter((p) => p.isFeatured).length,
}

// Section is visible if active filter is 'all' or is in the section's category list
function inCats(cats: FilterType[], filter: FilterType): boolean {
  return filter === 'all' || cats.includes(filter)
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      margin: '3rem 0 1.5rem',
    }}>
      <span style={{ width: '28px', height: '1px', background: 'var(--gold)', flexShrink: 0, display: 'block' }} />
      <span style={{ fontSize: '.62rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>{children}</span>
      <span style={{ flex: 1, height: '1px', background: 'var(--bdr)', display: 'block' }} />
    </div>
  )
}

function FeaturedCard({ project: p }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={`/projects/${p.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        height: '500px', marginBottom: '3px',
        background: 'var(--sl)', display: 'block',
      }}
    >
      <Image
        src={p.heroImage}
        alt={p.name}
        fill
        style={{ objectFit: 'cover', transition: 'transform .7s cubic-bezier(.25,.46,.45,.94)', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
      />
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,rgba(8,8,8,.97) 0%,rgba(8,8,8,.75) 40%,rgba(8,8,8,.2) 100%)' }} />

      {/* Top-right badge */}
      <div style={{
        position: 'absolute', top: '2rem', right: '2rem', zIndex: 2,
        padding: '.6rem 1.4rem', border: '1px solid rgba(201,169,110,.4)',
        background: hovered ? 'var(--gold)' : 'rgba(8,8,8,.8)', backdropFilter: 'blur(10px)',
        fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase',
        color: hovered ? 'var(--bg)' : 'var(--gold)',
        display: 'flex', alignItems: 'center', gap: '.5rem',
        transition: 'all .35s',
      }}>
        View Project Details ↗
      </div>

      {/* Left body */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: '55%',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '3.5rem',
      }}>
        <div style={{ fontSize: '.6rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.6rem', display: 'flex', alignItems: 'center', gap: '.6rem' }}>
          <span>★</span> Featured Flagship · Most Popular
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.2rem', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.05, marginBottom: '.4rem' }}>
          {p.name}
        </h2>
        <p style={{ fontSize: '.8rem', color: 'var(--txt2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
          <span style={{ fontSize: '.35rem', color: 'var(--gold)' }}>●</span>
          {p.fullAddress}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {p.rera && <span style={{ padding: '.25rem .8rem', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase' }}>MahaRERA Registered</span>}
          {p.possession && <span style={{ padding: '.25rem .8rem', border: '1px solid var(--bdr)', color: 'var(--txt2)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase' }}>Possession {p.possession}</span>}
          {p.towers && <span style={{ padding: '.25rem .8rem', border: '1px solid var(--bdr)', color: 'var(--txt2)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase' }}>{p.towers}</span>}
          {p.totalUnits && <span style={{ padding: '.25rem .8rem', border: '1px solid var(--bdr)', color: 'var(--txt2)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase' }}>{p.totalUnits}</span>}
          {p.landArea && <span style={{ padding: '.25rem .8rem', border: '1px solid var(--bdr)', color: 'var(--txt2)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase' }}>{p.landArea}</span>}
        </div>

        {/* Specs */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--warm)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{p.unitTypes}</strong>
            <span style={{ fontSize: '.68rem', color: 'var(--txt2)', letterSpacing: '.06em' }}>Unit Types</span>
          </div>
          {p.priceRange && (
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--warm)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{p.priceRange}</strong>
              <span style={{ fontSize: '.68rem', color: 'var(--txt2)', letterSpacing: '.06em' }}>Price Range</span>
            </div>
          )}
          {p.clubhouse && (
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--warm)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{p.clubhouse}</strong>
              <span style={{ fontSize: '.68rem', color: 'var(--txt2)', letterSpacing: '.06em' }}>Clubhouse</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '.65rem',
            padding: '.85rem 2rem', background: 'var(--gold)', color: 'var(--bg)',
            fontSize: '.74rem', letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500,
          }}>
            Explore {p.name} →
          </span>
          <a
            href={`https://wa.me/${wa}?text=I%20am%20interested%20in%20${encodeURIComponent(p.name)}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.6rem',
              padding: '.8rem 1.6rem', border: '1px solid rgba(37,211,102,.35)',
              background: 'rgba(37,211,102,.07)', color: '#25d366',
              fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase',
            }}
          >
            WhatsApp Enquiry
          </a>
        </div>
      </div>
    </Link>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const isCompleted = p.status === 'completed'
  const isUpcoming = p.status === 'upcoming'
  const hasSlug = p.status !== 'upcoming' || p.slug === 'siddhi-aspire' || p.slug === 'optima-aspire'

  const statusColor = isCompleted ? '#4ade80' : isUpcoming ? 'var(--txt2)' : 'var(--gold)'
  const statusBorder = isCompleted ? '#4ade80' : isUpcoming ? 'rgba(201,169,110,.5)' : 'var(--gold)'

  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', background: 'var(--sl)' }}
    >
      <Image
        src={p.cardImage || p.heroImage}
        alt={p.name}
        width={800}
        height={260}
        style={{
          width: '100%', height: '260px', objectFit: 'cover', display: 'block',
          transition: 'transform .6s cubic-bezier(.25,.46,.45,.94)',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top,rgba(8,8,8,1) 0%,rgba(8,8,8,.6) 60%,rgba(8,8,8,.1) 100%)'
          : 'linear-gradient(to top,rgba(8,8,8,.97) 0%,rgba(8,8,8,.3) 55%,transparent 100%)',
        transition: 'background .4s',
      }} />

      {/* Open icon */}
      {hasSlug && (
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem',
          width: '36px', height: '36px',
          border: '1px solid rgba(201,169,110,.3)', background: 'rgba(8,8,8,.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)',
          opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(.8)',
          transition: 'all .35s', zIndex: 2,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
        <span style={{
          display: 'inline-block', padding: '.22rem .7rem',
          fontSize: '.56rem', letterSpacing: '.2em', textTransform: 'uppercase',
          border: `1px solid ${statusBorder}`, color: statusColor, marginBottom: '.5rem',
        }}>
          {p.tag}
        </span>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.2, marginBottom: '.25rem' }}>
          {p.name}
        </h3>
        <p style={{ fontSize: '.68rem', color: 'var(--txt2)', marginBottom: '.5rem', display: 'flex', alignItems: 'center', gap: '.35rem' }}>
          <span style={{ fontSize: '.32rem', color: 'var(--gold)' }}>●</span>
          {p.location}
        </p>
        <div style={{
          display: 'flex', gap: '1.25rem', marginTop: '.5rem',
          opacity: hovered ? 1 : 0, transform: hovered ? 'none' : 'translateY(6px)',
          transition: 'all .4s',
        }}>
          <div>
            <strong style={{ display: 'block', fontSize: '.8rem', color: 'var(--warm)', fontWeight: 400 }}>{p.unitTypes}</strong>
            <span style={{ fontSize: '.63rem', color: 'var(--txt2)' }}>{isUpcoming ? 'Planned' : 'Unit Types'}</span>
          </div>
          <div>
            <strong style={{ display: 'block', fontSize: '.8rem', color: 'var(--warm)', fontWeight: 400 }}>{p.priceRange || p.startingPrice}</strong>
            <span style={{ fontSize: '.63rem', color: 'var(--txt2)' }}>{isUpcoming ? 'Expected' : 'Price Range'}</span>
          </div>
          {p.possession && (
            <div>
              <strong style={{ display: 'block', fontSize: '.8rem', color: 'var(--warm)', fontWeight: 400 }}>{p.possession}</strong>
              <span style={{ fontSize: '.63rem', color: 'var(--txt2)' }}>Possession</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (hasSlug && !isUpcoming) {
    return <Link href={`/projects/${p.slug}`} style={{ display: 'block' }}>{inner}</Link>
  }
  return inner
}

function CompletedCard({ project: p }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? 'rgba(201,169,110,.42)' : 'var(--bdr)'}`,
        background: 'var(--sl)',
        display: 'grid', gridTemplateColumns: '220px 1fr',
        overflow: 'hidden', cursor: 'pointer', transition: 'border-color .35s',
      }}
    >
      <div style={{ overflow: 'hidden', minHeight: '160px' }}>
        <Image
          src={p.cardImage || p.heroImage}
          alt={p.name}
          width={220}
          height={240}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform .5s',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
      </div>
      <div style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#4ade80', marginBottom: '.35rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            <span style={{ fontSize: '.5rem' }}>●</span> Fully Delivered
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: 'var(--warm)', marginBottom: '.25rem' }}>{p.name}</div>
          <div style={{ fontSize: '.72rem', color: 'var(--txt2)', marginBottom: '.75rem' }}>{p.fullAddress || p.location}</div>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.25rem' }}>
            {p.totalUnits && (
              <div style={{ fontSize: '.78rem' }}>
                <strong style={{ display: 'block', color: 'var(--warm)', fontWeight: 400 }}>{p.totalUnits}</strong>
                <span style={{ color: 'var(--txt2)', fontSize: '.68rem' }}>Apartments</span>
              </div>
            )}
            <div style={{ fontSize: '.78rem' }}>
              <strong style={{ display: 'block', color: 'var(--warm)', fontWeight: 400 }}>{p.unitTypes}</strong>
              <span style={{ color: 'var(--txt2)', fontSize: '.68rem' }}>Types</span>
            </div>
            {p.possession && (
              <div style={{ fontSize: '.78rem' }}>
                <strong style={{ display: 'block', color: 'var(--warm)', fontWeight: 400 }}>{p.possession}</strong>
                <span style={{ color: 'var(--txt2)', fontSize: '.68rem' }}>Delivered</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '.8rem', color: 'var(--txt2)' }}>{p.tagline}</span>
          <a
            href={`https://wa.me/${wa}?text=Interested%20in%20${encodeURIComponent(p.name)}%20resale`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.6rem',
              padding: '.5rem 1.1rem', border: '1px solid rgba(37,211,102,.35)',
              background: 'rgba(37,211,102,.07)', color: '#25d366',
              fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase',
            }}
          >
            Resale Enquiry
          </a>
        </div>
      </div>
    </div>
  )
}

function CommercialCard({ project: p }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        background: 'var(--sl)', border: `1px solid ${hovered ? 'rgba(96,165,250,.35)' : 'var(--bdr)'}`,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        transition: 'border-color .35s', minHeight: '320px',
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <Image
          src={p.heroImage}
          alt={p.name}
          width={600}
          height={400}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform .6s',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      </div>
      <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '.58rem', letterSpacing: '.28em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: '.5rem' }}>
            Upcoming · Commercial · Pre-Launch
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.05, marginBottom: '.4rem' }}>
            {p.name}
          </h3>
          <p style={{ fontSize: '.85rem', color: 'var(--txt2)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            {p.description}
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '.6rem',
            padding: '.5rem 1.25rem', border: '1px solid rgba(96,165,250,.4)',
            fontSize: '.68rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#60a5fa',
            marginBottom: '1.25rem',
          }}>
            🔔 Register for Pre-Launch Pricing &amp; Priority Selection
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            {p.totalArea && (
              <div style={{ padding: '.5rem 1rem', border: '1px solid var(--bdr)', textAlign: 'center' }}>
                <strong style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--warm)' }}>{p.totalArea}</strong>
                <span style={{ fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Total Sq.Ft.</span>
              </div>
            )}
            {p.towers && (
              <div style={{ padding: '.5rem 1rem', border: '1px solid var(--bdr)', textAlign: 'center' }}>
                <strong style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--warm)' }}>{p.towers}</strong>
                <span style={{ fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Floors</span>
              </div>
            )}
            {p.possession && (
              <div style={{ padding: '.5rem 1rem', border: '1px solid var(--bdr)', textAlign: 'center' }}>
                <strong style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--warm)' }}>{p.possession}</strong>
                <span style={{ fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Launch</span>
              </div>
            )}
            {p.clubhouse && (
              <div style={{ padding: '.5rem 1rem', border: '1px solid var(--bdr)', textAlign: 'center' }}>
                <strong style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--warm)' }}>{p.clubhouse}</strong>
                <span style={{ fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Highlight</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/${wa}?text=I%20want%20to%20register%20for%20${encodeURIComponent(p.name)}%20pre-launch`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.65rem',
              padding: '.85rem 2rem', background: 'var(--gold)', color: 'var(--bg)',
              fontSize: '.74rem', letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500,
            }}
          >
            Register Interest →
          </a>
          <Link
            href="/#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.65rem',
              padding: '.8rem 1.75rem', border: '1px solid rgba(201,169,110,.42)',
              color: 'var(--warm)', fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase',
            }}
          >
            Send Enquiry
          </Link>
        </div>
      </div>
    </div>
  )
}

function RERABar({ projects }: { projects: Project[] }) {
  const reraProjects = projects.filter((p) => p.rera && p.status === 'ongoing')
  return (
    <div style={{
      background: 'linear-gradient(135deg,rgba(201,169,110,.07),rgba(139,106,53,.04))',
      border: '1px solid var(--bdr)', borderTop: '2px solid var(--gold)',
      padding: '2.5rem 3rem', marginTop: '4rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '2rem',
    }}>
      <div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: 'var(--warm)', marginBottom: '.35rem' }}>
          MahaRERA Registered &amp; Compliant
        </h3>
        <p style={{ fontSize: '.82rem', color: 'var(--txt2)', maxWidth: '500px', lineHeight: 1.85 }}>
          All Aspire InfraTech ongoing projects are registered under MahaRERA. You can verify registration details, approvals and construction updates on the official MahaRERA portal at maharerait.mahaonline.gov.in. We believe in complete transparency — always.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem', alignItems: 'flex-end' }}>
        {reraProjects.map((p) => (
          <span key={p.slug} style={{
            padding: '.3rem .9rem', border: '1px solid rgba(201,169,110,.42)',
            fontSize: '.7rem', letterSpacing: '.1em', color: 'var(--gold)',
          }}>
            {p.name} · RERA: {p.rera}
          </span>
        ))}
        <a
          href="https://maharerait.mahaonline.gov.in"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '.65rem',
            padding: '.45rem 1rem', border: '1px solid rgba(201,169,110,.42)',
            color: 'var(--warm)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase',
            marginTop: '.25rem',
          }}
        >
          Verify on MahaRERA ↗
        </a>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AllProjectsClient({ projects, waNumber = '919090274545' }: Props) {
  const wa = waNumber
  const [filter, setFilter] = useState<FilterType>('all')

  const featuredProjects = projects.filter((p) => p.isFeatured)
  const ongoingProjects = projects.filter((p) => p.status === 'ongoing' && !p.isFeatured)
  const completedProjects = projects.filter((p) => p.status === 'completed')
  const commercialProjects = projects.filter((p) => p.type === 'commercial')
  const upcomingResidential = projects.filter((p) => p.status === 'upcoming' && p.type !== 'commercial')

  const showFeatured = inCats(['all', 'featured', 'ongoing'], filter)
  const showOngoing = inCats(['all', 'ongoing'], filter)
  const showCompleted = inCats(['all', 'completed'], filter)
  const showCommercialSection = inCats(['all', 'commercial', 'upcoming'], filter)
  const showUpcomingResidential = inCats(['all', 'upcoming'], filter)

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <div style={{ height: '52vh', minHeight: '380px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', marginTop: '68px' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&auto=format"
            alt="Aspire InfraTech Portfolio"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,8,.97) 0%,rgba(8,8,8,.6) 45%,rgba(8,8,8,.3) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, padding: '0 4rem 4rem', maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.9rem', marginBottom: '1rem' }}>
            <span style={{ width: '28px', height: '1px', background: 'var(--gold)', flexShrink: 0, display: 'block' }} />
            <span style={{ fontSize: '.62rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>Complete Portfolio</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.8rem,5.5vw,5rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.05, marginBottom: '.75rem' }}>
            All <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Projects</em><br />&amp; Developments
          </h1>
          <p style={{ fontSize: '.88rem', color: 'var(--txt2)', maxWidth: '420px', lineHeight: 1.9 }}>
            8+ projects across Katraj, Ambegaon, Kondhwa and Pune city — from premium residences to Grade-A commercial spaces.
          </p>
        </div>

        {/* Stats */}
        <div style={{ position: 'absolute', right: '4rem', bottom: '4rem', zIndex: 2, display: 'flex', gap: '3rem' }}>
          {[
            { n: '825K+', l: 'Sq.Ft. Delivered' },
            { n: '8+', l: 'Projects' },
            { n: '500+', l: 'Families' },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginTop: '.2rem' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER BAR */}
      <div style={{
        background: 'var(--ch)', borderBottom: '1px solid var(--bdr)',
        padding: '0 4rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem', position: 'sticky', top: '68px', zIndex: 100,
      }}>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              style={{
                padding: '1.1rem 1.6rem', fontSize: '.7rem', letterSpacing: '.13em',
                textTransform: 'uppercase', background: 'none', border: 'none',
                borderBottom: `2px solid ${filter === tab.key ? 'var(--gold)' : 'transparent'}`,
                color: filter === tab.key ? 'var(--gold)' : 'var(--txt2)',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .3s',
                fontFamily: 'inherit',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '.72rem', color: 'var(--txt2)' }}>
          Showing{' '}
          <span style={{ color: 'var(--gold)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
            {COUNTS[filter](projects)}
          </span>{' '}
          projects
        </div>
      </div>

      {/* MAIN */}
      <div style={{ padding: '4rem' }}>

        {/* ① FEATURED */}
        {showFeatured && featuredProjects.length > 0 && (
          <>
            <SectionLabel>Featured · Flagship Project</SectionLabel>
            {featuredProjects.map((p) => <FeaturedCard key={p.slug} project={p} />)}
          </>
        )}

        {/* ② ONGOING */}
        {showOngoing && ongoingProjects.length > 0 && (
          <>
            <SectionLabel>Ongoing Residential Projects</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '3px', marginBottom: '3px' }}>
              {ongoingProjects.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </>
        )}

        {/* ③ COMPLETED */}
        {showCompleted && completedProjects.length > 0 && (
          <>
            <SectionLabel>Completed &amp; Delivered</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {completedProjects.map((p) => <CompletedCard key={p.slug} project={p} />)}
            </div>
          </>
        )}

        {/* ④ COMMERCIAL */}
        {showCommercialSection && commercialProjects.length > 0 && (
          <>
            <SectionLabel>Commercial &amp; Upcoming</SectionLabel>
            {commercialProjects.map((p) => <CommercialCard key={p.slug} project={p} />)}
          </>
        )}

        {/* ⑤ UPCOMING RESIDENTIAL */}
        {showUpcomingResidential && upcomingResidential.length > 0 && (
          <>
            <SectionLabel>Upcoming Residential</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '3px' }}>
              {upcomingResidential.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </>
        )}

        {/* Nothing to show */}
        {!showFeatured && !showOngoing && !showCompleted && !showCommercialSection && !showUpcomingResidential && (
          <p style={{ color: 'var(--txt2)', fontSize: '.9rem', padding: '4rem 0' }}>No projects in this category yet.</p>
        )}

        {/* RERA BAR */}
        <RERABar projects={projects} />
      </div>

      {/* ENQUIRY STRIP */}
      <div style={{
        background: 'var(--ch)', borderTop: '1px solid var(--bdr)',
        padding: '3rem 4rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, color: 'var(--warm)', marginBottom: '.3rem' }}>
            Not Sure Which Project to Choose?
          </h3>
          <p style={{ fontSize: '.82rem', color: 'var(--txt2)' }}>
            Our advisors will understand your needs and help you find the perfect home — no pressure, completely free guidance.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          <Link
            href="/#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.65rem',
              padding: '.85rem 2rem', background: 'var(--gold)', color: 'var(--bg)',
              fontSize: '.74rem', letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500,
            }}
          >
            Talk to an Advisor →
          </Link>
          <a
            href={`https://wa.me/${wa}?text=I%20saw%20all%20Aspire%20projects%20and%20need%20help%20choosing%20the%20right%20one%20for%20my%20family`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.6rem',
              padding: '.8rem 1.6rem', border: '1px solid rgba(37,211,102,.35)',
              background: 'rgba(37,211,102,.07)', color: '#25d366',
              fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase',
            }}
          >
            WhatsApp for Guidance
          </a>
          <a
            href={`tel:+${wa}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.65rem',
              padding: '.8rem 1.75rem', border: '1px solid rgba(201,169,110,.42)',
              color: 'var(--warm)', fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase',
            }}
          >
            Call +{wa}
          </a>
        </div>
      </div>

      <Footer />
    </>
  )
}
