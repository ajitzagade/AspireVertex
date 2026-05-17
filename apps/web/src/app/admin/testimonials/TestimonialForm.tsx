'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { saveTestimonial } from '../actions'
import type { Testimonial } from '@/types'

const EMPTY: Partial<Testimonial> = {
  name: '', initials: '', projectName: '', text: '', rating: 5, order: 0, isActive: true,
}

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial | null }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState<Partial<Testimonial>>(testimonial || EMPTY)

  function set(key: keyof Testimonial, value: unknown) {
    setData(d => ({ ...d, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const fd = new FormData()
    fd.set('__json', JSON.stringify(data))
    startTransition(async () => {
      const result = await saveTestimonial(null, fd)
      if (result?.error) setError(result.error)
      else { setSuccess(true); setTimeout(() => router.push('/admin/testimonials'), 700) }
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '620px' }}>
      <div className="admin-section">
        <div className="admin-grid-2" style={{ marginBottom: '1rem' }}>
          <div>
            <label className="admin-label">Name *</label>
            <input className="admin-input" value={data.name || ''} onChange={e => set('name', e.target.value)} required placeholder="Mr. Rohan Kulkarni" />
          </div>
          <div>
            <label className="admin-label">Initials</label>
            <input className="admin-input" value={data.initials || ''} onChange={e => set('initials', e.target.value)} placeholder="RK" maxLength={3} />
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label className="admin-label">Project Name</label>
          <input className="admin-input" value={data.projectName || ''} onChange={e => set('projectName', e.target.value)} placeholder="Siddhi Aspire, Katraj · 3 BHK Owner" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label className="admin-label">Testimonial Text *</label>
          <textarea className="admin-input" rows={4} value={data.text || ''} onChange={e => set('text', e.target.value)} required placeholder="Aspire Buildcon has completely redefined…" style={{ resize: 'vertical' }} />
        </div>
        <div className="admin-grid-3">
          <div>
            <label className="admin-label">Rating (1-5)</label>
            <input className="admin-input" type="number" min={1} max={5} value={data.rating ?? 5} onChange={e => set('rating', Number(e.target.value))} />
          </div>
          <div>
            <label className="admin-label">Display Order</label>
            <input className="admin-input" type="number" value={data.order ?? 0} onChange={e => set('order', Number(e.target.value))} />
          </div>
          <div>
            <label className="admin-label">Active</label>
            <select className="admin-select admin-input" value={data.isActive ? 'yes' : 'no'} onChange={e => set('isActive', e.target.value === 'yes')}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem 0' }}>
        <button type="submit" className="admin-btn-gold" disabled={isPending} style={{ padding: '.7rem 1.75rem' }}>
          {isPending ? 'Saving…' : testimonial?._id ? 'Save Changes' : 'Add Testimonial'}
        </button>
        <button type="button" className="admin-btn" onClick={() => router.push('/admin/testimonials')}>Cancel</button>
        {error && <span style={{ color: '#f87171', fontSize: '.8rem' }}>{error}</span>}
        {success && <span style={{ color: '#86efac', fontSize: '.8rem' }}>Saved!</span>}
      </div>
    </form>
  )
}
