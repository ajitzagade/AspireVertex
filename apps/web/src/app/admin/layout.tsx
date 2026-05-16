import Link from 'next/link'
import { logoutAction } from './actions'

export const metadata = { title: 'Admin — Aspire InfraTech' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body { margin: 0; font-family: system-ui, sans-serif; background: #0a0a0a; color: #e0d6c8; }
        .admin-nav-link { display: block; padding: .65rem 1.25rem; font-size: .82rem; color: #aaa; text-decoration: none; transition: color .2s; }
        .admin-nav-link:hover { color: #c9a96e; }
        .admin-btn { padding: .5rem 1.1rem; border: 1px solid #333; background: #1a1a1a; color: #e0d6c8; font-size: .78rem; cursor: pointer; transition: all .2s; text-decoration: none; display: inline-block; }
        .admin-btn:hover { border-color: #c9a96e; color: #c9a96e; }
        .admin-btn-gold { padding: .5rem 1.25rem; background: #c9a96e; color: #080808; font-size: .78rem; font-weight: 600; border: none; cursor: pointer; text-decoration: none; display: inline-block; }
        .admin-btn-gold:hover { background: #b8965a; }
        .admin-btn-danger { padding: .4rem .85rem; border: 1px solid #7f1d1d; background: transparent; color: #f87171; font-size: .75rem; cursor: pointer; }
        .admin-btn-danger:hover { background: #7f1d1d; color: #fff; }
        .admin-input { width: 100%; padding: .55rem .75rem; background: #111; border: 1px solid #2a2a2a; color: #e0d6c8; font-size: .82rem; box-sizing: border-box; font-family: inherit; }
        .admin-input:focus { outline: none; border-color: #c9a96e; }
        .admin-select { appearance: auto; }
        .admin-label { display: block; font-size: .65rem; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .35rem; }
        .admin-section { margin-bottom: 1.5rem; padding: 1.5rem; background: #111; border: 1px solid #1e1e1e; }
        .admin-section-title { font-size: .65rem; letter-spacing: .18em; text-transform: uppercase; color: #c9a96e; margin: 0; }
        .admin-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .admin-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th { text-align: left; font-size: .62rem; letter-spacing: .14em; text-transform: uppercase; color: #666; padding: .6rem .85rem; border-bottom: 1px solid #1e1e1e; }
        .admin-table td { padding: .75rem .85rem; border-bottom: 1px solid #161616; font-size: .82rem; vertical-align: middle; }
        .admin-table tr:hover td { background: #131313; }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside style={{ width: '210px', background: '#111', borderRight: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 10 }}>
          <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid #1e1e1e' }}>
            <div style={{ fontSize: '.55rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '.25rem' }}>Aspire InfraTech</div>
            <div style={{ fontSize: '.78rem', color: '#555' }}>Admin Panel</div>
          </div>
          <nav style={{ padding: '1rem 0', flex: 1 }}>
            <Link href="/admin/projects" className="admin-nav-link">Projects</Link>
            <Link href="/admin/enquiries" className="admin-nav-link">Enquiries</Link>
            <Link href="/admin/testimonials" className="admin-nav-link">Testimonials</Link>
            <Link href="/admin/settings" className="admin-nav-link">Site Settings</Link>
          </nav>
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #1e1e1e' }}>
            <form action={logoutAction}>
              <button type="submit" style={{ fontSize: '.75rem', color: '#555', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Sign out
              </button>
            </form>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, marginLeft: '210px', minHeight: '100vh', background: '#0a0a0a' }}>
          {children}
        </main>
      </div>
    </>
  )
}
