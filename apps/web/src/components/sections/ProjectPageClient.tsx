'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types'
import Navbar from '@/components/ui/NavBar'
import Footer from '@/components/ui/Footer'
import ContactForm from '@/components/ui/ContactForm'
import VideoModal from '@/components/ui/VideoModal'

const PHOTO_FILTERS = ['all', 'exterior', 'interior', 'amenity', 'construction', 'location'] as const

export default function ProjectPageClient({ project }: { project: Project }) {
  const [photoFilter, setPhotoFilter] = useState<(typeof PHOTO_FILTERS)[number]>('all')
  const [activePlan, setActivePlan] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [videoId, setVideoId] = useState<string | null>(null)

  const photos = (project.photos || []).filter(
    (p) => photoFilter === 'all' || p.category === photoFilter,
  )
  const plans = project.floorPlans || []
  const featuredVideo = project.videos?.find((v) => v.isFeatured) || project.videos?.[0]

  return (
    <>
      <Navbar />
      {videoId && (
        <VideoModal
          youtubeId={videoId}
          title={project.videos?.find((v) => v.youtubeId === videoId)?.title || 'Video'}
          onClose={() => setVideoId(null)}
        />
      )}

      <section style={{ position: 'relative', height: '72vh', minHeight: '520px' }}>
        <Image src={project.heroImage} alt={project.name} fill style={{ objectFit: 'cover' }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,8,.95) 0%,rgba(8,8,8,.4) 50%,rgba(8,8,8,.25) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 4rem 4rem', zIndex: 2 }}>
          <span style={{ display: 'inline-block', padding: '.3rem .85rem', border: '1px solid var(--gold)', fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            {project.tag}
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.05, marginBottom: '.5rem' }}>
            {project.name}
          </h1>
          <p style={{ fontSize: '.9rem', color: 'var(--txt2)', marginBottom: '1.5rem' }}>{project.tagline}</p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[['Starting', project.startingPrice], ['Units', project.unitTypes], ['Possession', project.possession]].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.2rem' }}>{l}</div>
                <div style={{ fontSize: '.95rem', color: 'var(--warm)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {project.specs && project.specs.length > 0 && (
        <div className="stats-strip" style={{ gridTemplateColumns: `repeat(${Math.min(project.specs.length, 4)}, 1fr)` }}>
          {project.specs.slice(0, 4).map((s) => (
            <div key={s.key} className="stat-cell">
              <div style={{ fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.35rem' }}>{s.key}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--warm)' }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      <section style={{ padding: '6rem 4rem', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '900px' }}>
          <div className="sec-eye"><span>Overview</span></div>
          <h2 className="sec-h">{project.name}</h2>
          <div className="gold-line" />
          <p style={{ fontSize: '.92rem', color: 'var(--txt2)', lineHeight: 1.95 }}>{project.description}</p>
          {project.rera && (
            <p style={{ marginTop: '1.5rem', fontSize: '.78rem', color: 'var(--gold)', letterSpacing: '.08em' }}>
              MahaRERA: {project.rera}{project.reraValid ? ` · Valid till ${project.reraValid}` : ''}
            </p>
          )}
        </div>
      </section>

      {plans.length > 0 && (
        <section style={{ padding: '6rem 4rem', background: 'var(--ch)', borderTop: '1px solid var(--bdr)' }}>
          <div className="sec-eye"><span>Floor Plans</span></div>
          <h2 className="sec-h">Choose Your <em>Configuration</em></h2>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', margin: '2rem 0' }}>
            {plans.map((plan, i) => (
              <button key={plan.type} type="button" onClick={() => setActivePlan(i)}
                style={{ padding: '.5rem 1.25rem', border: '1px solid', borderColor: activePlan === i ? 'var(--gold)' : 'var(--bdr)', color: activePlan === i ? 'var(--gold)' : 'var(--txt2)', fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', background: activePlan === i ? 'rgba(201,169,110,.06)' : 'transparent' }}>
                {plan.type}
              </button>
            ))}
          </div>
          {plans[activePlan] && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[['Price', plans[activePlan].price], ['Carpet', plans[activePlan].carpetArea], ['Built-up', plans[activePlan].builtUpArea], ['Bathrooms', plans[activePlan].bathrooms], ['Balconies', plans[activePlan].balconies], ['Parking', plans[activePlan].parking], ['Available', plans[activePlan].unitsAvailable]].map(([k, v]) => (
                  <div key={k} style={{ padding: '1rem', border: '1px solid var(--bdr)', background: 'var(--sl)' }}>
                    <div style={{ fontSize: '.58rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.25rem' }}>{k}</div>
                    <div style={{ fontSize: '.88rem', color: 'var(--warm)' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div>
                <a href={`https://wa.me/919890273861?text=${encodeURIComponent(plans[activePlan].waMsg || project.name)}`} target="_blank" rel="noreferrer" className="btn-gold" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
                  Enquire for {plans[activePlan].type} →
                </a>
                <Link href="#contact" className="btn-outline" style={{ display: 'inline-flex', marginLeft: '1rem' }}>Schedule Visit</Link>
              </div>
            </div>
          )}
        </section>
      )}

      {project.amenities && project.amenities.length > 0 && (
        <section style={{ padding: '6rem 4rem', background: 'var(--bg)' }}>
          <div className="sec-eye"><span>Amenities</span></div>
          <h2 className="sec-h">World-Class <em>Living</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '3px', marginTop: '2.5rem' }}>
            {project.amenities.map((a) => (
              <div key={a.name} className="amen-card">
                <div style={{ fontSize: '1.75rem', marginBottom: '.5rem' }}>{a.icon}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--txt2)', letterSpacing: '.06em' }}>{a.name}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {featuredVideo && (
        <section style={{ padding: '6rem 4rem', background: 'var(--ch)', borderTop: '1px solid var(--bdr)' }}>
          <div className="sec-eye"><span>Video Walkthrough</span></div>
          <h2 className="sec-h">See It <em>Come Alive</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
            <div className="vw-main" onClick={() => setVideoId(featuredVideo.youtubeId)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setVideoId(featuredVideo.youtubeId)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featuredVideo.thumbnail} alt={featuredVideo.title} />
              <div className="vw-play">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--gold)"><polygon points="5,3 19,12 5,21" /></svg>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(transparent,rgba(8,8,8,.9))' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--warm)' }}>{featuredVideo.title}</div>
                <p style={{ fontSize: '.78rem', color: 'var(--txt2)' }}>{featuredVideo.subtitle}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              {(project.videos || []).slice(0, 4).map((v) => (
                <div key={v.youtubeId} className="vw-thumb" onClick={() => setVideoId(v.youtubeId)} role="button" tabIndex={0}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.thumbnail} alt="" style={{ width: '80px', height: '54px', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '.82rem', color: 'var(--warm)' }}>{v.title}</div>
                    <div style={{ fontSize: '.68rem', color: 'var(--txt3)' }}>{v.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {photos.length > 0 && (
        <section style={{ padding: '6rem 4rem', background: 'var(--bg)' }}>
          <div className="sec-eye"><span>Gallery</span></div>
          <h2 className="sec-h">Project <em>Gallery</em></h2>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', margin: '1.5rem 0 2rem' }}>
            {PHOTO_FILTERS.map((f) => (
              <button key={f} type="button" onClick={() => setPhotoFilter(f)}
                style={{ padding: '.4rem 1rem', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', border: '1px solid', borderColor: photoFilter === f ? 'var(--gold)' : 'var(--bdr)', color: photoFilter === f ? 'var(--gold)' : 'var(--txt2)', cursor: 'pointer', background: 'transparent' }}>
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          <div className="gallery-masonry">
            {photos.map((photo) => (
              <div key={photo.url} className="gallery-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt={photo.caption} style={{ width: '100%', display: 'block' }} />
                <div style={{ padding: '.5rem .75rem', fontSize: '.68rem', color: 'var(--txt2)', background: 'var(--ch)' }}>{photo.caption}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.progress && project.progress.length > 0 && (
        <section style={{ padding: '6rem 4rem', background: 'var(--ch)', borderTop: '1px solid var(--bdr)' }}>
          <div className="sec-eye"><span>Construction</span></div>
          <h2 className="sec-h">Live <em>Progress</em></h2>
          <div style={{ maxWidth: '700px', marginTop: '2rem' }}>
            {project.progress.map((item) => (
              <div key={item.label} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem', fontSize: '.82rem' }}>
                  <span style={{ color: 'var(--txt)' }}>{item.label}</span>
                  <span style={{ color: 'var(--gold)' }}>{item.percentage}%</span>
                </div>
                <div style={{ height: '3px', background: 'var(--bdr)' }}>
                  <div style={{ height: '100%', width: `${item.percentage}%`, background: 'var(--gold)' }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.faqs && project.faqs.length > 0 && (
        <section style={{ padding: '6rem 4rem', background: 'var(--bg)' }}>
          <div className="sec-eye"><span>FAQs</span></div>
          <h2 className="sec-h">Common <em>Questions</em></h2>
          <div style={{ maxWidth: '800px', marginTop: '2rem' }}>
            {project.faqs.map((faq, i) => (
              <div key={faq.question} className="accord-item">
                <button type="button" className="accord-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ color: openFaq === i ? 'var(--gold)' : 'var(--warm)' }}>
                  {faq.question}
                  <span>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="accord-a">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="contact" style={{ padding: '6rem 4rem', background: 'var(--ch)', borderTop: '1px solid var(--bdr)' }}>
        <div className="sec-eye"><span>Enquire</span></div>
        <h2 className="sec-h">Interested in <em>{project.name}?</em></h2>
        <div style={{ maxWidth: '560px', marginTop: '2.5rem' }}>
          <ContactForm projectName={project.name} />
        </div>
      </section>

      <Footer />
    </>
  )
}
