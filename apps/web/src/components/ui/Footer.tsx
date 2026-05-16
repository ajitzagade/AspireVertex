import Link from 'next/link'
import type { SiteSettings } from '@/types'
import Logo from '@/components/ui/Logo'

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  facebook: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  instagram: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  youtube: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.57A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#040404" /></svg>,
  linkedin: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
}

const DEFAULT_PROJECTS = [
  { name: 'Siddhi Aspire', slug: 'siddhi-aspire' },
  { name: 'Optima – Aspire', slug: 'optima-aspire' },
  { name: 'All Projects', slug: '' },
]

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const wa = settings?.whatsappNumber || '919090274545'
  const phone = settings?.phone || '+91 90902 74545'
  const email = settings?.email || 'info@aspiregroup.com'
  const footerProjects = settings?.footerProjects || DEFAULT_PROJECTS
  const copyright = settings?.footerCopyright || '© 2025 Aspire InfraTech. All rights reserved.'
  const rera = settings?.footerRera || 'RERA: P52100047821 | P52100047822'

  return (
    <footer style={{ background: '#040404', borderTop: '1px solid var(--bdr)', padding: '5rem 4rem 2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: '3.5rem', marginBottom: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--bdr)' }}>
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <Logo href="/" height={52} className="footer-logo" />
          </div>
          <p style={{ fontSize: '.82rem', color: 'var(--txt2)', lineHeight: 1.9, marginBottom: '1.5rem', maxWidth: '260px' }}>
            {settings?.footerTagline || 'Building landmark residential and commercial spaces across Pune since 2014.'}
          </p>
          <div style={{ display: 'flex', gap: '.65rem' }}>
            {settings?.socialLinks?.map(s => (
              <a key={s.platform} href={s.url} target="_blank" rel="noreferrer"
                style={{ width: '36px', height: '36px', border: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--txt2)', transition: 'all .3s' }}>
                {SOCIAL_ICONS[s.platform] || s.platform[0].toUpperCase()}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '.6rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.4rem' }}>Quick Links</div>
          <ul style={{ listStyle: 'none' }}>
            {[['Home', '/'], ['About Us', '/#about'], ['Projects', '/#projects'], ['Our Process', '/#process'], ['Contact', '/#contact']].map(([l, h]) => (
              <li key={l} style={{ marginBottom: '.7rem' }}>
                <Link href={h} style={{ fontSize: '.82rem', color: 'var(--txt2)', transition: 'color .3s', display: 'flex', alignItems: 'center', gap: '.5rem' }}>{l}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontSize: '.6rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.4rem' }}>Our Projects</div>
          <ul style={{ listStyle: 'none' }}>
            {footerProjects.map(p => (
              <li key={p.slug || 'all'} style={{ marginBottom: '.7rem' }}>
                <Link
                  href={p.slug ? `/projects/${p.slug}` : '/all-projects'}
                  style={{ fontSize: '.82rem', color: 'var(--txt2)', transition: 'color .3s' }}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontSize: '.6rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.4rem' }}>Contact</div>
          <ul style={{ listStyle: 'none' }}>
            {[
              [phone, `tel:${phone.replace(/\s/g, '')}`],
              [email, `mailto:${email}`],
              ['WhatsApp Us', `https://wa.me/${wa}`],
              ['Send Enquiry', '/#contact'],
            ].map(([l, h]) => (
              <li key={l} style={{ marginBottom: '.7rem' }}>
                <a href={h} style={{ fontSize: '.82rem', color: 'var(--txt2)', transition: 'color .3s' }}>{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '.7rem', color: 'var(--txt3)' }}>{copyright}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '.2rem .7rem', border: '1px solid var(--bdr)', fontSize: '.58rem', letterSpacing: '.1em', color: 'var(--gold)' }}>MahaRERA Registered</span>
          <span style={{ fontSize: '.7rem', color: 'var(--txt3)' }}>{rera}</span>
        </div>
      </div>
    </footer>
  )
}
