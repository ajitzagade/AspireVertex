'use client'
import { useEffect } from 'react'
const MODAL_DATA: Record<string, { tag: string; name: string; loc: string; img: string; desc: string; specs: { label: string; value: string; green?: boolean }[]; prelaunch?: boolean }> = {
  mahadev: {
    tag: 'Completed · Residential', name: 'Mahadev Prangan', loc: 'Kondhwa–Katraj Road, Pune — 411 048',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85&auto=format',
    desc: 'Mahadev Prangan is a fully delivered residential development in Kondhwa — 1 & 2 BHK premium apartments, 180 units, 100% homeowner satisfaction.',
    specs: [{ label: 'Status', value: '✓ Delivered', green: true }, { label: 'Units', value: '180' }, { label: 'Types', value: '1 & 2 BHK' }],
  },
  icon: {
    tag: 'Upcoming · Commercial · Pre-Launch', name: 'Aspire Icon', loc: 'Katraj Bypass, Pune — 411 046',
    img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=85&auto=format',
    desc: 'Aspire Icon — Grade-A commercial landmark on the Katraj Bypass. Premium office spaces, 18th-floor sky lounge, multi-level parking.',
    specs: [{ label: 'Launch', value: 'Q3 2026' }, { label: 'Area', value: '2,20,000 Sq.Ft.' }], prelaunch: true,
  },
}

export default function ProjectModal({ projectKey, onClose, phone = '919090274545' }: { projectKey: string; onClose: () => void; phone?: string }) {
  const d = MODAL_DATA[projectKey]
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])
  if (!d) return null
  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box">
        <button onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--txt2)', fontSize: '1.5rem', cursor: 'pointer', zIndex: 1 }}>✕</button>
        <div style={{ padding: '2.5rem 2.5rem 0' }}>
          <div style={{ fontSize: '.6rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.4rem' }}>{d.tag}</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: 'var(--warm)', marginBottom: '.25rem' }}>{d.name}</h2>
          <p style={{ fontSize: '.77rem', color: 'var(--txt2)' }}>{d.loc}</p>
          <div style={{ height: '1px', background: 'var(--bdr)', margin: '1rem 0' }} />
        </div>
        <div style={{ padding: '2rem 2.5rem 2.5rem' }}>
          <img src={d.img} alt={d.name} style={{ width: '100%', height: '260px', objectFit: 'cover', marginBottom: '1.75rem', display: 'block' }} />
          {d.prelaunch && (
            <div style={{ padding: '1rem', border: '1px solid rgba(201,169,110,.3)', background: 'rgba(201,169,110,.06)', marginBottom: '1rem' }}>
              <div style={{ fontSize: '.75rem', color: 'var(--gold)', fontWeight: 500, marginBottom: '.3rem' }}>🔔 Register Now for Pre-Launch Pricing</div>
              <div style={{ fontSize: '.8rem', color: 'var(--txt2)' }}>Priority unit selection for early registrations.</div>
            </div>
          )}
          <p style={{ fontSize: '.88rem', color: 'var(--txt2)', lineHeight: 1.9, marginBottom: '1.5rem' }}>{d.desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${d.specs.length},1fr)`, gap: '1rem', marginBottom: '1.5rem' }}>
            {d.specs.map(s => (
              <div key={s.label} style={{ padding: '1rem', border: '1px solid var(--bdr)', background: 'var(--sl)', textAlign: 'center' }}>
                <div style={{ fontSize: '.6rem', color: 'var(--gold)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: '.3rem' }}>{s.label}</div>
                <div style={{ fontSize: '.9rem', color: s.green ? '#4ade80' : 'var(--warm)' }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/#contact" className="btn-gold" onClick={onClose}>Enquire Now →</a>
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" className="btn-wa">WhatsApp Us</a>
          </div>
        </div>
      </div>
    </div>
  )
}