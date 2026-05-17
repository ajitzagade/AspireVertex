import { getTestimonials, seedTestimonials } from '../actions'
import DeleteTestimonialButton from './DeleteButton'
import TestimonialForm from './TestimonialForm'

export const dynamic = 'force-dynamic'

export default async function TestimonialsPage() {
  let testimonials = await getTestimonials()
  let seeded = false

  if (testimonials.length === 0) {
    const result = await seedTestimonials()
    if (!result.error) {
      seeded = true
      testimonials = await getTestimonials()
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '.25rem' }}>Content Management</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 400, color: '#e0d6c8', margin: 0 }}>Testimonials</h1>
        </div>
      </div>

      {seeded && (
        <div style={{ marginBottom: '1.5rem', padding: '.75rem 1.25rem', background: 'rgba(20,83,45,.3)', border: '1px solid #166534', color: '#86efac', fontSize: '.82rem' }}>
          Default testimonials seeded. You can now edit or add more.
        </div>
      )}

      {/* Add new */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>Add New Testimonial</div>
        <TestimonialForm />
      </div>

      {/* Existing list */}
      {testimonials.length > 0 && (
        <>
          <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#666', marginBottom: '1rem' }}>Existing ({testimonials.length})</div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Project</th>
                  <th>Rating</th>
                  <th>Order</th>
                  <th>Active</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t: {
                  _id: string; name: string; projectName?: string; rating: number; order: number; isActive: boolean; initials: string;
                }) => (
                  <tr key={t._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                        <div style={{ width: '32px', height: '32px', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', color: '#c9a96e', background: 'rgba(201,169,110,.08)', flexShrink: 0 }}>{t.initials}</div>
                        <div style={{ color: '#e0d6c8', fontSize: '.82rem' }}>{t.name}</div>
                      </div>
                    </td>
                    <td style={{ color: '#888', fontSize: '.75rem' }}>{t.projectName || '—'}</td>
                    <td style={{ color: '#c9a96e', fontSize: '.78rem' }}>{'★'.repeat(t.rating)}</td>
                    <td style={{ color: '#555', fontSize: '.78rem' }}>{t.order ?? 0}</td>
                    <td>
                      <span style={{ fontSize: '.62rem', color: t.isActive ? '#86efac' : '#555', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                        {t.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
                        <DeleteTestimonialButton id={t._id} name={t.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
