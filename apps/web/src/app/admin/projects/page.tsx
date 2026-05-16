import Link from 'next/link'
import { getProjects, seedProjects } from '../actions'
import { ALL_PROJECTS } from '@/data/seed'
import DeleteButton from './DeleteButton'

export const dynamic = 'force-dynamic'

const STATUS_COLOR: Record<string, string> = {
  ongoing: '#86efac',
  completed: '#93c5fd',
  upcoming: '#fcd34d',
}

export default async function AdminProjectsPage() {
  let projects = await getProjects()
  let dbConnected = true
  let seeded = false

  if (projects.length === 0) {
    // Try to seed from defaults
    const result = await seedProjects()
    if (result?.error) {
      // MongoDB not reachable — show seed data as read-only preview
      dbConnected = false
      projects = ALL_PROJECTS as typeof projects
    } else {
      seeded = true
      projects = await getProjects()
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '.25rem' }}>Content Management</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 400, color: '#e0d6c8', margin: 0 }}>Projects</h1>
        </div>
        {dbConnected && (
          <Link href="/admin/projects/new" className="admin-btn-gold" style={{ padding: '.6rem 1.4rem' }}>
            + New Project
          </Link>
        )}
      </div>

      {!dbConnected && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(127,29,29,.2)', border: '1px solid #7f1d1d', color: '#fca5a5', fontSize: '.82rem', lineHeight: 1.6 }}>
          <strong style={{ color: '#f87171' }}>MongoDB not connected.</strong> Add your real <code>MONGODB_URI</code> to <code>.env.local</code> and restart the dev server to enable editing.
          Showing seed data preview below (read-only).
        </div>
      )}

      {seeded && (
        <div style={{ marginBottom: '1.5rem', padding: '.75rem 1.25rem', background: 'rgba(20,83,45,.3)', border: '1px solid #166534', color: '#86efac', fontSize: '.82rem' }}>
          {ALL_PROJECTS.length} projects seeded from defaults. You can now edit them.
        </div>
      )}

      <div style={{ background: '#111', border: '1px solid #1e1e1e' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Type</th>
              <th>Starting Price</th>
              <th>Order</th>
              {dbConnected && <th style={{ textAlign: 'right' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {projects.map((p: {
              _id?: string; name: string; slug: string; status: string;
              type: string; startingPrice: string; order: number; isFeatured?: boolean
            }) => (
              <tr key={p.slug}>
                <td>
                  <div style={{ color: '#e0d6c8', fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: '.68rem', color: '#555', fontFamily: 'monospace', marginTop: '.1rem' }}>{p.slug}</div>
                  {p.isFeatured && <span style={{ fontSize: '.58rem', letterSpacing: '.1em', color: '#c9a96e', textTransform: 'uppercase' }}>Featured</span>}
                </td>
                <td>
                  <span style={{ fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: STATUS_COLOR[p.status] || '#aaa' }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ color: '#888', fontSize: '.78rem' }}>{p.type}</td>
                <td style={{ color: '#c9a96e', fontSize: '.82rem' }}>{p.startingPrice}</td>
                <td style={{ color: '#555', fontSize: '.78rem' }}>{p.order ?? 0}</td>
                {dbConnected && (
                  <td>
                    <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Link href={`/projects/${p.slug}`} target="_blank" className="admin-btn" style={{ fontSize: '.72rem', padding: '.35rem .75rem' }}>
                        View ↗
                      </Link>
                      <Link href={`/admin/projects/${p.slug}`} className="admin-btn" style={{ fontSize: '.72rem', padding: '.35rem .75rem' }}>
                        Edit
                      </Link>
                      {p._id && <DeleteButton id={p._id} name={p.name} />}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
