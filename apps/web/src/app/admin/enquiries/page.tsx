import { connectDB } from '@/lib/mongodb'
import { EnquiryModel } from '@/lib/models'

export const dynamic = 'force-dynamic'

const STATUS_COLOR: Record<string, string> = {
  new: '#fcd34d',
  contacted: '#86efac',
  site_visit: '#93c5fd',
  closed: '#555',
}

async function getEnquiries() {
  try {
    await connectDB()
    const docs = await EnquiryModel.find({}).sort({ createdAt: -1 }).limit(100).lean()
    return JSON.parse(JSON.stringify(docs))
  } catch {
    return []
  }
}

export default async function EnquiriesPage() {
  const enquiries = await getEnquiries()

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '.25rem' }}>CRM</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 400, color: '#e0d6c8', margin: 0 }}>Enquiries</h1>
      </div>

      {enquiries.length === 0 ? (
        <div style={{ padding: '4rem', textAlign: 'center', border: '1px dashed #222', color: '#555' }}>
          No enquiries yet. They will appear here when visitors submit the contact form.
        </div>
      ) : (
        <div style={{ background: '#111', border: '1px solid #1e1e1e' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Project</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Date</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e: {
                _id: string; firstName: string; lastName?: string; phone: string;
                email?: string; project?: string; budget?: string; status: string;
                message?: string; createdAt: string;
              }) => (
                <tr key={e._id}>
                  <td style={{ color: '#e0d6c8' }}>{e.firstName} {e.lastName || ''}</td>
                  <td><a href={`tel:${e.phone}`} style={{ color: '#c9a96e', textDecoration: 'none' }}>{e.phone}</a></td>
                  <td style={{ color: '#888', fontSize: '.75rem' }}>{e.email || '—'}</td>
                  <td style={{ color: '#aaa', fontSize: '.75rem' }}>{e.project || '—'}</td>
                  <td style={{ color: '#aaa', fontSize: '.75rem' }}>{e.budget || '—'}</td>
                  <td>
                    <span style={{ fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase', color: STATUS_COLOR[e.status] || '#aaa' }}>
                      {e.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ color: '#555', fontSize: '.72rem' }}>
                    {new Date(e.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                  <td style={{ color: '#777', fontSize: '.75rem', maxWidth: '200px' }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.message || '—'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
