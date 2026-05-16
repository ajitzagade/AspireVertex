'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { saveProject } from '../../actions'
import type { Project, FloorPlan } from '@/types'
import FileUpload from '@/components/admin/FileUpload'

type FormProject = Partial<Project>

const EMPTY_FLOOR_PLAN: FloorPlan = {
  type: '', variant: '', price: '', carpetArea: '', builtUpArea: '',
  bathrooms: '', balconies: '', parking: '', unitsAvailable: '0', totalUnits: '',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      {children}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="admin-section">
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: '.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%', textAlign: 'left' }}>
        <span className="admin-section-title" style={{ margin: 0 }}>{title}</span>
        <span style={{ color: '#555', fontSize: '.8rem', marginLeft: 'auto' }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div style={{ marginTop: '1.25rem' }}>{children}</div>}
    </div>
  )
}

export default function ProjectForm({ project }: { project: FormProject | null }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [data, setData] = useState<FormProject>(() => project || {
    slug: '', name: '', tagline: '', location: '', fullAddress: '', description: '',
    status: 'ongoing', type: 'residential', tag: 'New Launch', heroImage: '', cardImage: '',
    unitTypes: '', startingPrice: '', priceRange: '', possession: '', rera: '', reraValid: '',
    landArea: '', totalUnits: '', totalArea: '', towers: '', openSpace: '',
    isFeatured: false, order: 0,
    specs: [], floorPlans: [], amenities: [], photos: [], videos: [], faqs: [],
    progress: [], timeline: [], nearbyCategories: [],
  })

  function set(key: keyof FormProject, value: unknown) {
    setData(d => ({ ...d, [key]: value }))
  }

  // ── Floor Plans ──
  function addFloorPlan() { set('floorPlans', [...(data.floorPlans || []), { ...EMPTY_FLOOR_PLAN }]) }
  function updateFloorPlan(i: number, k: keyof FloorPlan, v: string | boolean) {
    const plans = [...(data.floorPlans || [])]
    plans[i] = { ...plans[i], [k]: v }
    set('floorPlans', plans)
  }
  function removeFloorPlan(i: number) {
    set('floorPlans', (data.floorPlans || []).filter((_, idx) => idx !== i))
  }

  // ── Amenities ──
  function addAmenity() { set('amenities', [...(data.amenities || []), { icon: '', name: '' }]) }
  function updateAmenity(i: number, k: 'icon' | 'name', v: string) {
    const list = [...(data.amenities || [])]
    list[i] = { ...list[i], [k]: v }
    set('amenities', list)
  }
  function removeAmenity(i: number) { set('amenities', (data.amenities || []).filter((_, idx) => idx !== i)) }

  // ── Specs ──
  function addSpec() { set('specs', [...(data.specs || []), { key: '', value: '' }]) }
  function updateSpec(i: number, k: 'key' | 'value', v: string) {
    const list = [...(data.specs || [])]
    list[i] = { ...list[i], [k]: v }
    set('specs', list)
  }
  function removeSpec(i: number) { set('specs', (data.specs || []).filter((_, idx) => idx !== i)) }

  // ── FAQs ──
  function addFaq() { set('faqs', [...(data.faqs || []), { question: '', answer: '' }]) }
  function updateFaq(i: number, k: 'question' | 'answer', v: string) {
    const list = [...(data.faqs || [])]
    list[i] = { ...list[i], [k]: v }
    set('faqs', list)
  }
  function removeFaq(i: number) { set('faqs', (data.faqs || []).filter((_, idx) => idx !== i)) }

  // ── Photos ──
  function addPhoto() { set('photos', [...(data.photos || []), { url: '', caption: '', category: 'exterior' as const }]) }
  function updatePhoto(i: number, k: string, v: string) {
    const list = [...(data.photos || [])]
    list[i] = { ...list[i], [k]: v }
    set('photos', list)
  }
  function removePhoto(i: number) { set('photos', (data.photos || []).filter((_, idx) => idx !== i)) }

  // ── Submit ──
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const formData = new FormData()
    formData.set('__json', JSON.stringify(data))

    startTransition(async () => {
      const result = await saveProject(null, formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/admin/projects'), 800)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ── Basic Info ── */}
      <Section title="Basic Information">
        <div className="admin-grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
          <Field label="Project Name *">
            <input className="admin-input" value={data.name || ''} onChange={e => set('name', e.target.value)} required placeholder="e.g. Siddhi Aspire" />
          </Field>
          <Field label="Slug (URL key) *">
            <input className="admin-input" value={data.slug || ''} onChange={e => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} required placeholder="e.g. siddhi-aspire" disabled={!!project?._id} />
          </Field>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Field label="Tagline">
            <input className="admin-input" value={data.tagline || ''} onChange={e => set('tagline', e.target.value)} placeholder="Short one-liner shown on hero" />
          </Field>
        </div>
        <div className="admin-grid-3" style={{ marginBottom: '1rem' }}>
          <Field label="Status">
            <select className="admin-select admin-input" value={data.status || 'ongoing'} onChange={e => set('status', e.target.value)}>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </Field>
          <Field label="Type">
            <select className="admin-select admin-input" value={data.type || 'residential'} onChange={e => set('type', e.target.value)}>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </Field>
          <Field label="Tag Badge">
            <input className="admin-input" value={data.tag || ''} onChange={e => set('tag', e.target.value)} placeholder="e.g. New Launch" />
          </Field>
        </div>
        <div className="admin-grid-2" style={{ marginBottom: '1rem' }}>
          <Field label="Location">
            <input className="admin-input" value={data.location || ''} onChange={e => set('location', e.target.value)} placeholder="e.g. Katraj, Pune" />
          </Field>
          <Field label="Full Address">
            <input className="admin-input" value={data.fullAddress || ''} onChange={e => set('fullAddress', e.target.value)} placeholder="Full address" />
          </Field>
        </div>
        <div className="admin-grid-3">
          <Field label="Display Order">
            <input className="admin-input" type="number" value={data.order ?? 0} onChange={e => set('order', Number(e.target.value))} />
          </Field>
          <Field label="Featured on Homepage">
            <select className="admin-select admin-input" value={data.isFeatured ? 'yes' : 'no'} onChange={e => set('isFeatured', e.target.value === 'yes')}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </Field>
          <Field label="Map Embed URL">
            <input className="admin-input" value={data.mapEmbedUrl || ''} onChange={e => set('mapEmbedUrl', e.target.value)} placeholder="Google Maps embed URL" />
          </Field>
          <FileUpload
            label="Brochure PDF (downloadable from project page)"
            value={data.brochureUrl || ''}
            onChange={v => set('brochureUrl', v)}
            accept="application/pdf,image/*"
            hint="Upload PDF brochure — max 20MB"
            preview={false}
          />
        </div>
      </Section>

      {/* ── Images ── */}
      <Section title="Images">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <FileUpload
            label="Hero Image (full-width banner shown at top of project page)"
            value={data.heroImage || ''}
            onChange={v => set('heroImage', v)}
            hint="Recommended: 1920×1080px JPG/WebP, max 10MB"
          />
          <FileUpload
            label="Card Image (thumbnail shown on listings / homepage)"
            value={data.cardImage || ''}
            onChange={v => set('cardImage', v)}
            hint="Recommended: 800×600px JPG/WebP, max 10MB"
          />
        </div>
      </Section>

      {/* ── Pricing & Specs ── */}
      <Section title="Pricing & Key Specs">
        <div className="admin-grid-3" style={{ marginBottom: '1rem' }}>
          <Field label="Starting Price">
            <input className="admin-input" value={data.startingPrice || ''} onChange={e => set('startingPrice', e.target.value)} placeholder="e.g. ₹68 Lakhs" />
          </Field>
          <Field label="Price Range">
            <input className="admin-input" value={data.priceRange || ''} onChange={e => set('priceRange', e.target.value)} placeholder="e.g. ₹68L – ₹1.2Cr" />
          </Field>
          <Field label="Unit Types">
            <input className="admin-input" value={data.unitTypes || ''} onChange={e => set('unitTypes', e.target.value)} placeholder="e.g. 1, 2 & 3 BHK" />
          </Field>
        </div>
        <div className="admin-grid-3" style={{ marginBottom: '1rem' }}>
          <Field label="Possession">
            <input className="admin-input" value={data.possession || ''} onChange={e => set('possession', e.target.value)} placeholder="e.g. Dec 2026" />
          </Field>
          <Field label="RERA No.">
            <input className="admin-input" value={data.rera || ''} onChange={e => set('rera', e.target.value)} placeholder="P52100XXXXXX" />
          </Field>
          <Field label="RERA Valid Till">
            <input className="admin-input" value={data.reraValid || ''} onChange={e => set('reraValid', e.target.value)} placeholder="e.g. Dec 2026" />
          </Field>
        </div>
        <div className="admin-grid-3">
          <Field label="Total Units">
            <input className="admin-input" value={data.totalUnits || ''} onChange={e => set('totalUnits', e.target.value)} placeholder="e.g. 120" />
          </Field>
          <Field label="Land Area">
            <input className="admin-input" value={data.landArea || ''} onChange={e => set('landArea', e.target.value)} placeholder="e.g. 1.2 Acres" />
          </Field>
          <Field label="Total Area">
            <input className="admin-input" value={data.totalArea || ''} onChange={e => set('totalArea', e.target.value)} placeholder="e.g. 2.4 Lakh sq.ft." />
          </Field>
        </div>
      </Section>

      {/* ── Description ── */}
      <Section title="Description">
        <Field label="Project Description">
          <textarea className="admin-input" rows={5} value={data.description || ''} onChange={e => set('description', e.target.value)} placeholder="Detailed project description shown in the Overview section…" style={{ resize: 'vertical' }} />
        </Field>
      </Section>

      {/* ── Highlight Specs ── */}
      <Section title="Highlight Specs (shown in stats strip)">
        <div style={{ marginBottom: '.75rem', display: 'flex', gap: '.5rem' }}>
          <button type="button" className="admin-btn" onClick={addSpec}>+ Add Spec</button>
        </div>
        {(data.specs || []).map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '.75rem', marginBottom: '.5rem', alignItems: 'end' }}>
            <Field label={i === 0 ? 'Label' : ''}>
              <input className="admin-input" value={s.key} onChange={e => updateSpec(i, 'key', e.target.value)} placeholder="e.g. Land Area" />
            </Field>
            <Field label={i === 0 ? 'Value' : ''}>
              <input className="admin-input" value={s.value} onChange={e => updateSpec(i, 'value', e.target.value)} placeholder="e.g. 1.2 Acres" />
            </Field>
            <button type="button" className="admin-btn-danger" onClick={() => removeSpec(i)} style={{ marginBottom: '0' }}>✕</button>
          </div>
        ))}
      </Section>

      {/* ── Floor Plans ── */}
      <Section title="Floor Plans">
        <div style={{ marginBottom: '.75rem' }}>
          <button type="button" className="admin-btn" onClick={addFloorPlan}>+ Add Floor Plan</button>
        </div>
        {(data.floorPlans || []).map((fp, i) => (
          <div key={i} style={{ border: '1px solid #1e1e1e', padding: '1rem', marginBottom: '1rem', background: '#0d0d0d' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
              <span style={{ fontSize: '.72rem', color: '#c9a96e' }}>Floor Plan #{i + 1}</span>
              <button type="button" className="admin-btn-danger" onClick={() => removeFloorPlan(i)}>Remove</button>
            </div>
            <div className="admin-grid-3" style={{ marginBottom: '.75rem' }}>
              <Field label="BHK Type">
                <input className="admin-input" value={fp.type} onChange={e => updateFloorPlan(i, 'type', e.target.value)} placeholder="e.g. 2 BHK" />
              </Field>
              <Field label="Variant Name">
                <input className="admin-input" value={fp.variant || ''} onChange={e => updateFloorPlan(i, 'variant', e.target.value)} placeholder="e.g. Corner Unit" />
              </Field>
              <Field label="Price">
                <input className="admin-input" value={fp.price} onChange={e => updateFloorPlan(i, 'price', e.target.value)} placeholder="e.g. ₹85 Lakhs" />
              </Field>
            </div>
            <div className="admin-grid-3" style={{ marginBottom: '.75rem' }}>
              <Field label="Carpet Area">
                <input className="admin-input" value={fp.carpetArea} onChange={e => updateFloorPlan(i, 'carpetArea', e.target.value)} placeholder="e.g. 650 sq.ft." />
              </Field>
              <Field label="Built-up Area">
                <input className="admin-input" value={fp.builtUpArea} onChange={e => updateFloorPlan(i, 'builtUpArea', e.target.value)} placeholder="e.g. 780 sq.ft." />
              </Field>
              <Field label="Bathrooms">
                <input className="admin-input" value={fp.bathrooms} onChange={e => updateFloorPlan(i, 'bathrooms', e.target.value)} placeholder="e.g. 2" />
              </Field>
            </div>
            <div className="admin-grid-3">
              <Field label="Balconies">
                <input className="admin-input" value={fp.balconies} onChange={e => updateFloorPlan(i, 'balconies', e.target.value)} placeholder="e.g. 1" />
              </Field>
              <Field label="Units Available">
                <input className="admin-input" value={fp.unitsAvailable} onChange={e => updateFloorPlan(i, 'unitsAvailable', e.target.value)} placeholder="e.g. 8" />
              </Field>
              <Field label="WhatsApp Message">
                <input className="admin-input" value={fp.waMsg || ''} onChange={e => updateFloorPlan(i, 'waMsg', e.target.value)} placeholder="Pre-filled WA text" />
              </Field>
            </div>
          </div>
        ))}
      </Section>

      {/* ── Amenities ── */}
      <Section title="Amenities">
        <div style={{ marginBottom: '.75rem' }}>
          <button type="button" className="admin-btn" onClick={addAmenity}>+ Add Amenity</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '.5rem' }}>
          {(data.amenities || []).map((a, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: '.5rem', alignItems: 'center' }}>
              <input className="admin-input" value={a.icon} onChange={e => updateAmenity(i, 'icon', e.target.value)} placeholder="🏊" style={{ textAlign: 'center', fontSize: '1.2rem' }} />
              <input className="admin-input" value={a.name} onChange={e => updateAmenity(i, 'name', e.target.value)} placeholder="Swimming Pool" />
              <button type="button" className="admin-btn-danger" onClick={() => removeAmenity(i)}>✕</button>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Photos ── */}
      <Section title="Photo Gallery">
        <div style={{ marginBottom: '.75rem' }}>
          <button type="button" className="admin-btn" onClick={addPhoto}>+ Add Photo</button>
        </div>
        {(data.photos || []).map((ph, i) => (
          <div key={i} style={{ border: '1px solid #1e1e1e', padding: '1rem', marginBottom: '.75rem', background: '#0d0d0d' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
              <span style={{ fontSize: '.7rem', color: '#555' }}>Photo #{i + 1}</span>
              <button type="button" className="admin-btn-danger" onClick={() => removePhoto(i)}>Remove</button>
            </div>
            <div style={{ marginBottom: '.75rem' }}>
              <FileUpload
                label="Image"
                value={ph.url}
                onChange={v => updatePhoto(i, 'url', v)}
                hint="JPG/WebP recommended, max 10MB"
              />
            </div>
            <div className="admin-grid-2">
              <Field label="Caption">
                <input className="admin-input" value={ph.caption} onChange={e => updatePhoto(i, 'caption', e.target.value)} placeholder="e.g. Entrance Lobby" />
              </Field>
              <Field label="Category">
                <select className="admin-select admin-input" value={ph.category} onChange={e => updatePhoto(i, 'category', e.target.value)}>
                  {['exterior', 'interior', 'amenity', 'construction', 'location'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        ))}
      </Section>

      {/* ── FAQs ── */}
      <Section title="FAQs">
        <div style={{ marginBottom: '.75rem' }}>
          <button type="button" className="admin-btn" onClick={addFaq}>+ Add FAQ</button>
        </div>
        {(data.faqs || []).map((f, i) => (
          <div key={i} style={{ border: '1px solid #1e1e1e', padding: '1rem', marginBottom: '.75rem', background: '#0d0d0d' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '.5rem' }}>
              <button type="button" className="admin-btn-danger" onClick={() => removeFaq(i)}>Remove</button>
            </div>
            <Field label="Question">
              <input className="admin-input" value={f.question} onChange={e => updateFaq(i, 'question', e.target.value)} placeholder="e.g. What is the possession date?" style={{ marginBottom: '.5rem' }} />
            </Field>
            <Field label="Answer">
              <textarea className="admin-input" rows={2} value={f.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} placeholder="Answer…" style={{ resize: 'vertical' }} />
            </Field>
          </div>
        ))}
      </Section>

      {/* ── Submit ── */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.5rem 0' }}>
        <button type="submit" className="admin-btn-gold" style={{ padding: '.75rem 2rem', fontSize: '.85rem' }} disabled={isPending}>
          {isPending ? 'Saving…' : project?._id ? 'Save Changes' : 'Create Project'}
        </button>
        <button type="button" className="admin-btn" onClick={() => router.push('/admin/projects')}>
          Cancel
        </button>
        {error && <span style={{ color: '#f87171', fontSize: '.8rem' }}>{error}</span>}
        {success && <span style={{ color: '#86efac', fontSize: '.8rem' }}>Saved! Redirecting…</span>}
      </div>
    </form>
  )
}
