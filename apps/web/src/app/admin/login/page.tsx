'use client'

import { useActionState } from 'react'
import { loginAction } from '../actions'

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
      <div style={{ width: '340px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '.6rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '.5rem' }}>Aspire Buildcon</div>
          <div style={{ fontSize: '1.4rem', fontFamily: 'Georgia, serif', color: '#e0d6c8', fontWeight: 300 }}>Admin Login</div>
        </div>

        <form action={action} style={{ background: '#111', border: '1px solid #1e1e1e', padding: '2rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="admin-label" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="admin-input" placeholder="Enter admin password" required autoFocus />
          </div>

          {state?.error && (
            <div style={{ marginBottom: '1rem', padding: '.6rem .85rem', background: 'rgba(127,29,29,.4)', border: '1px solid #7f1d1d', color: '#f87171', fontSize: '.78rem' }}>
              {state.error}
            </div>
          )}

          <button type="submit" className="admin-btn-gold" style={{ width: '100%', padding: '.75rem' }} disabled={pending}>
            {pending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '.7rem', color: '#444' }}>
          Set <code style={{ color: '#666' }}>ADMIN_PASSWORD</code> in your environment variables.
        </p>
      </div>

      <style>{`
        .admin-label { display: block; font-size: .65rem; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .35rem; }
        .admin-input { width: 100%; padding: .55rem .75rem; background: #0a0a0a; border: 1px solid #2a2a2a; color: #e0d6c8; font-size: .82rem; box-sizing: border-box; }
        .admin-input:focus { outline: none; border-color: #c9a96e; }
        .admin-btn-gold { background: #c9a96e; color: #080808; font-size: .82rem; font-weight: 600; border: none; cursor: pointer; }
        .admin-btn-gold:hover { background: #b8965a; }
      `}</style>
    </div>
  )
}
