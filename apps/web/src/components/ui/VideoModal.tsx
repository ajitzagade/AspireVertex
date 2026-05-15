'use client'
import { useEffect } from 'react'

export default function VideoModal({ youtubeId, title, onClose }: { youtubeId: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,4,4,.97)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(14px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ width: '90vw', maxWidth: '960px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '-2.5rem', right: 0, background: 'none', border: 'none', color: 'rgba(232,226,216,.7)', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.5rem', fontFamily: "'Jost', sans-serif" }}>
          ✕ Close
        </button>
        <iframe src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          width="100%" style={{ aspectRatio: '16/9', display: 'block', border: 'none', background: '#000' }}
          allow="autoplay;fullscreen" allowFullScreen title={title} />
        <div style={{ padding: '.75rem 1rem', background: 'var(--ch)', border: '1px solid var(--bdr)', borderTop: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '.78rem', color: 'var(--txt2)', letterSpacing: '.05em' }}>{title}</span>
          <a href="https://wa.me/919890273861" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.72rem', color: '#25d366', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            Enquire via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}