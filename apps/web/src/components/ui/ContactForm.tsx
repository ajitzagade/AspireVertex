'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  firstName: string; lastName?: string; phone: string; email?: string
  project?: string; budget?: string; message?: string
}

export default function ContactForm({ projectName }: { projectName?: string; subject?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, project: projectName || data.project, source: 'website' }),
      })
      const json = await res.json()
      setStatus(json.success ? 'done' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div className="form-group">
          <label>First Name *</label>
          <input {...register('firstName', { required: true })} className="form-input" placeholder="Rahul" />
          {errors.firstName && <span style={{ fontSize: '.65rem', color: '#ef4444' }}>Required</span>}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input {...register('lastName')} className="form-input" placeholder="Sharma" />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div className="form-group">
          <label>Phone *</label>
          <input {...register('phone', { required: true })} className="form-input" placeholder="+91 98765 43210" />
          {errors.phone && <span style={{ fontSize: '.65rem', color: '#ef4444' }}>Required</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input {...register('email')} className="form-input" placeholder="rahul@email.com" />
        </div>
      </div>
      {!projectName && (
        <div className="form-group">
          <label>Interested Project</label>
          <select {...register('project')} className="form-input">
            <option value="">Select a Project</option>
            <option>Siddhi Aspire — Katraj (1/2/3/4 BHK)</option>
            <option>Optima – Aspire — Ambegaon (2/3 BHK)</option>
            <option>Optima – Aspire Plus — Ambegaon (2.5/3 BHK)</option>
            <option>Aspire Icon — Katraj (Commercial)</option>
            <option>General Enquiry</option>
          </select>
        </div>
      )}
      <div className="form-group">
        <label>Budget Range</label>
        <select {...register('budget')} className="form-input">
          <option value="">Select Budget</option>
          <option>₹40L – ₹70L</option>
          <option>₹70L – ₹1Cr</option>
          <option>₹1Cr – ₹1.5Cr</option>
          <option>₹1.5Cr+</option>
        </select>
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea {...register('message')} className="form-input" placeholder="Tell us what you're looking for..." style={{ resize: 'none', height: '105px' }} />
      </div>
      <button type="submit" disabled={status === 'sending' || status === 'done'}
        style={{ width: '100%', padding: '1.1rem', background: status === 'done' ? '#2d5a2d' : 'var(--gold)', color: 'var(--bg)', fontSize: '.77rem', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 500, border: 'none', cursor: status === 'done' ? 'default' : 'pointer', fontFamily: "'Jost', sans-serif", transition: 'all .35s' }}>
        {status === 'idle' && "Send Enquiry — We'll Call You Within 2 Hours"}
        {status === 'sending' && 'Sending…'}
        {status === 'done' && "✓ Sent — We'll Call You Within 2 Hours"}
        {status === 'error' && 'Error — Please Call +91 90902 74545'}
      </button>
      <p style={{ fontSize: '.68rem', color: 'var(--txt3)', marginTop: '.7rem', textAlign: 'center' }}>Your data is never shared or sold. 100% private.</p>
    </form>
  )
}