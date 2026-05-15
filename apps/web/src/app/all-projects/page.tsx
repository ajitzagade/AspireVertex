import Link from 'next/link'
import { SIDDHI_PROJECT, OPTIMA_PROJECT } from '@/data/seed'
import Navbar from '@/components/ui/NavBar'
import Footer from '@/components/ui/Footer'

const PROJECTS = [SIDDHI_PROJECT, OPTIMA_PROJECT]

export default function AllProjectsPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 4rem 4rem', background: 'var(--bg)', minHeight: '100vh' }}>
        <div className="sec-eye"><span>Portfolio</span></div>
        <h1 className="sec-h" style={{ marginBottom: '3rem' }}>
          All <em>Projects</em>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '3px' }}>
          {PROJECTS.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="proj-card" style={{ display: 'block', minHeight: '360px', position: 'relative' }}>
              <img src={p.cardImage || p.heroImage} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '360px' }} />
              <div className="proj-overlay" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem' }}>
                <span style={{ display: 'inline-block', padding: '.25rem .75rem', border: '1px solid var(--gold)', fontSize: '.57rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.6rem' }}>{p.tag}</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, color: 'var(--warm)' }}>{p.name}</h2>
                <p style={{ fontSize: '.75rem', color: 'var(--txt2)', marginTop: '.35rem' }}>{p.location} · from {p.startingPrice}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
