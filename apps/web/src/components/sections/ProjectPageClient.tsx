'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project, FloorPlan } from '@/types'
import Navbar from '@/components/ui/NavBar'
import Footer from '@/components/ui/Footer'
import ContactForm from '@/components/ui/ContactForm'
import VideoModal from '@/components/ui/VideoModal'

const PHOTO_FILTERS = ['all', 'exterior', 'interior', 'amenity', 'construction', 'location'] as const

const BANKS = [
  { name: 'SBI Home Loans', short: 'SBI', color: '#1a237e', bg: '#e8eaf6' },
  { name: 'HDFC Bank', short: 'HDFC', color: '#004c97', bg: '#e3f2fd' },
  { name: 'ICICI Bank', short: 'ICICI', color: '#b71c1c', bg: '#ffebee' },
  { name: 'Axis Bank', short: 'Axis', color: '#800000', bg: '#fce4ec' },
  { name: 'Kotak Mahindra', short: 'Kotak', color: '#e65100', bg: '#fff3e0' },
  { name: 'Bank of Baroda', short: 'BoB', color: '#1b5e20', bg: '#e8f5e9' },
  { name: 'LIC HFL', short: 'LIC', color: '#4a148c', bg: '#f3e5f5' },
  { name: 'Union Bank', short: 'Union', color: '#0d47a1', bg: '#e3f2fd' },
  { name: 'PNB Housing', short: 'PNB', color: '#006064', bg: '#e0f7fa' },
  { name: 'Canara Bank', short: 'Canara', color: '#33691e', bg: '#f1f8e9' },
]

// ── SVG Floor Plans ──
function FloorPlanSVG({ bhkType, variant = '' }: { bhkType: string; variant?: string }) {
  const isCorner = variant.toLowerCase().includes('corner')
  const isPremium = variant.toLowerCase().includes('premium') || variant.toLowerCase().includes('sky view') || variant.toLowerCase().includes('plus') || variant.toLowerCase().includes('sky suite')
  const isPenthouse = variant.toLowerCase().includes('penthouse')

  const W = 480
  const H = 320
  const s = { fill: 'none', stroke: '#c9a96e', strokeWidth: 1.5 }
  const labelStyle = { fontSize: '10px', fill: '#f5f0e8', textAnchor: 'middle' as const, fontFamily: 'Jost, sans-serif', fontWeight: '300' }
  const subStyle = { fontSize: '8.5px', fill: '#888480', textAnchor: 'middle' as const, fontFamily: 'Jost, sans-serif' }
  const lineStyle = { stroke: '#c9a96e', strokeWidth: 0.5, strokeDasharray: '3,3' }

  if (bhkType.startsWith('1')) {
    const lw = isCorner ? 200 : 185
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '420px' }}>
        <rect width={W} height={H} fill="#111111" rx="2" />
        {/* Living + Dining */}
        <rect x={20} y={20} width={lw} height={150} {...s} />
        <text x={20 + lw / 2} y={92} style={labelStyle}>Living + Dining</text>
        <text x={20 + lw / 2} y={108} style={subStyle}>{isCorner ? '230 sq.ft.' : '210 sq.ft.'}</text>
        {/* Bedroom */}
        <rect x={20} y={180} width={lw} height={120} {...s} />
        <text x={20 + lw / 2} y={237} style={labelStyle}>Bedroom</text>
        <text x={20 + lw / 2} y={253} style={subStyle}>{isCorner ? '145 sq.ft.' : '130 sq.ft.'}</text>
        {/* Kitchen */}
        <rect x={lw + 30} y={20} width={140} height={100} {...s} />
        <text x={lw + 30 + 70} y={67} style={labelStyle}>Kitchen</text>
        <text x={lw + 30 + 70} y={83} style={subStyle}>75 sq.ft.</text>
        {/* Bathroom */}
        <rect x={lw + 30} y={130} width={140} height={80} {...s} />
        <text x={lw + 30 + 70} y={168} style={labelStyle}>Bathroom</text>
        {/* Balcony */}
        <rect x={lw + 30} y={220} width={isCorner ? 140 : 100} height={80} {...s} />
        <text x={lw + 30 + (isCorner ? 70 : 50)} y={258} style={labelStyle}>Balcony</text>
        {/* compass */}
        <text x={W - 22} y={H - 22} style={{ ...labelStyle, fontSize: '12px', fill: '#c9a96e' }}>N↑</text>
        {/* door indicator */}
        <line x1={20} y1={170} x2={60} y2={170} style={lineStyle} />
      </svg>
    )
  }

  if (bhkType.startsWith('2')) {
    const isPlus = isPremium
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '420px' }}>
        <rect width={W} height={H} fill="#111111" rx="2" />
        {/* Living + Dining */}
        <rect x={20} y={20} width={200} height={130} {...s} />
        <text x={120} y={82} style={labelStyle}>Living + Dining</text>
        <text x={120} y={98} style={subStyle}>{isPlus ? '240 sq.ft.' : '210 sq.ft.'}</text>
        {/* Master Bedroom */}
        <rect x={20} y={160} width={200} height={140} {...s} />
        <text x={120} y={227} style={labelStyle}>Master Bedroom</text>
        <text x={120} y={243} style={subStyle}>{isPlus ? '155 sq.ft.' : '140 sq.ft.'}</text>
        {/* Bedroom 2 */}
        <rect x={230} y={20} width={170} height={130} {...s} />
        <text x={315} y={82} style={labelStyle}>Bedroom 2</text>
        <text x={315} y={98} style={subStyle}>{isPlus ? '135 sq.ft.' : '125 sq.ft.'}</text>
        {/* Kitchen */}
        <rect x={230} y={160} width={80} height={85} {...s} />
        <text x={270} y={200} style={labelStyle}>Kitchen</text>
        <text x={270} y={216} style={subStyle}>80 sq.ft.</text>
        {/* Bathroom 1 */}
        <rect x={320} y={160} width={80} height={85} {...s} />
        <text x={360} y={200} style={labelStyle}>Bath</text>
        {/* Balcony 1 */}
        <rect x={230} y={255} width={80} height={45} {...s} />
        <text x={270} y={278} style={labelStyle}>Balcony</text>
        {/* Bathroom 2 */}
        <rect x={320} y={255} width={80} height={45} {...s} />
        <text x={360} y={278} style={labelStyle}>Bath 2</text>
        {isPlus && (
          <>
            <rect x={230} y={H - 30} width={170} height={20} {...s} />
            <text x={315} y={H - 18} style={{ ...subStyle, fill: '#c9a96e' }}>Study Nook</text>
          </>
        )}
        <text x={W - 22} y={H - 8} style={{ ...labelStyle, fontSize: '12px', fill: '#c9a96e' }}>N↑</text>
      </svg>
    )
  }

  if (bhkType.startsWith('3')) {
    const isSkyView = isPremium
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '420px' }}>
        <rect width={W} height={H} fill="#111111" rx="2" />
        {/* Living + Dining */}
        <rect x={20} y={20} width={210} height={120} {...s} />
        <text x={125} y={76} style={labelStyle}>Living + Dining</text>
        <text x={125} y={92} style={subStyle}>{isSkyView ? '280 sq.ft.' : '250 sq.ft.'}</text>
        {/* Master Bedroom */}
        <rect x={20} y={150} width={130} height={150} {...s} />
        <text x={85} y={222} style={labelStyle}>Master Bed</text>
        <text x={85} y={238} style={subStyle}>{isSkyView ? '165 sq.ft.' : '148 sq.ft.'}</text>
        {/* Bedroom 2 */}
        <rect x={160} y={150} width={110} height={150} {...s} />
        <text x={215} y={222} style={labelStyle}>Bed 2</text>
        <text x={215} y={238} style={subStyle}>130 sq.ft.</text>
        {/* Bedroom 3 */}
        <rect x={240} y={20} width={120} height={120} {...s} />
        <text x={300} y={76} style={labelStyle}>Bed 3</text>
        <text x={300} y={92} style={subStyle}>120 sq.ft.</text>
        {/* Kitchen + Utility */}
        <rect x={370} y={20} width={90} height={120} {...s} />
        <text x={415} y={70} style={labelStyle}>Kitchen</text>
        <text x={415} y={86} style={subStyle}>85 sq.ft.</text>
        {/* Bathrooms */}
        <rect x={370} y={150} width={45} height={75} {...s} />
        <text x={392} y={190} style={{ ...labelStyle, fontSize: '8.5px' }}>Bath 1</text>
        <rect x={415} y={150} width={45} height={75} {...s} />
        <text x={437} y={190} style={{ ...labelStyle, fontSize: '8.5px' }}>Bath 2</text>
        <rect x={370} y={235} width={90} height={65} {...s} />
        <text x={415} y={270} style={{ ...labelStyle, fontSize: '8.5px' }}>Bath 3 + Util</text>
        {/* Balconies */}
        <rect x={20} y={308} width={100} height={10} {...s} />
        <text x={70} y={H - 2} style={subStyle}>Balcony</text>
        {isSkyView && (
          <rect x={130} y={308} width={70} height={10} {...s} />
        )}
        <text x={W - 22} y={H - 8} style={{ ...labelStyle, fontSize: '12px', fill: '#c9a96e' }}>N↑</text>
      </svg>
    )
  }

  // 4 BHK / Penthouse / Office / Retail / default
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '420px' }}>
      <rect width={W} height={H} fill="#111111" rx="2" />
      {/* Living + Dining */}
      <rect x={20} y={20} width={220} height={130} {...s} />
      <text x={130} y={82} style={labelStyle}>Living + Dining</text>
      <text x={130} y={98} style={subStyle}>{isPenthouse ? '380 sq.ft.' : '260 sq.ft.'}</text>
      {/* Master Bedroom */}
      <rect x={20} y={160} width={140} height={140} {...s} />
      <text x={90} y={228} style={labelStyle}>Master Bed</text>
      <text x={90} y={244} style={subStyle}>{isPenthouse ? '200 sq.ft.' : '160 sq.ft.'}</text>
      {/* Bedroom 2 */}
      <rect x={170} y={160} width={120} height={140} {...s} />
      <text x={230} y={228} style={labelStyle}>Bed 2</text>
      <text x={230} y={244} style={subStyle}>140 sq.ft.</text>
      {/* Bedroom 3 */}
      <rect x={250} y={20} width={110} height={130} {...s} />
      <text x={305} y={82} style={labelStyle}>Bed 3</text>
      <text x={305} y={98} style={subStyle}>130 sq.ft.</text>
      {/* Bedroom 4 */}
      <rect x={370} y={20} width={90} height={130} {...s} />
      <text x={415} y={82} style={labelStyle}>Bed 4</text>
      <text x={415} y={98} style={subStyle}>120 sq.ft.</text>
      {/* Kitchen */}
      <rect x={300} y={160} width={160} height={80} {...s} />
      <text x={380} y={198} style={labelStyle}>Kitchen + Util</text>
      {/* Bathrooms */}
      <rect x={300} y={250} width={80} height={50} {...s} />
      <text x={340} y={278} style={{ ...labelStyle, fontSize: '8.5px' }}>Bath</text>
      <rect x={390} y={250} width={70} height={50} {...s} />
      <text x={425} y={278} style={{ ...labelStyle, fontSize: '8.5px' }}>Bath</text>
      {/* Balconies */}
      {isPenthouse && (
        <rect x={20} y={308} width={440} height={10} {...s} />
      )}
      <text x={W - 22} y={H - 8} style={{ ...labelStyle, fontSize: '12px', fill: '#c9a96e' }}>N↑</text>
    </svg>
  )
}

// ── EMI Calculator ──
function EMICalculator({ onClose, inline = false }: { onClose: () => void; inline?: boolean }) {
  const [amount, setAmount] = useState(7500000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const r = rate / 12 / 100
  const n = tenure * 12
  const emi = r > 0 ? Math.round((amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : 0
  const totalPayable = emi * n
  const totalInterest = totalPayable - amount

  const fmt = (v: number) => v >= 100000
    ? `₹${(v / 100000).toFixed(2)}L`
    : `₹${v.toLocaleString('en-IN')}`

  if (inline) {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          {/* Loan Amount */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.35rem' }}>
              <span style={{ fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Loan Amt</span>
              <span style={{ fontSize: '.72rem', color: 'var(--gold)', fontWeight: 500 }}>{fmt(amount)}</span>
            </div>
            <input type="range" min={1000000} max={30000000} step={100000} value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#c9a96e', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.15rem', fontSize: '.55rem', color: 'var(--txt3)' }}>
              <span>₹10L</span><span>₹3Cr</span>
            </div>
          </div>
          {/* Interest Rate */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.35rem' }}>
              <span style={{ fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Rate</span>
              <span style={{ fontSize: '.72rem', color: 'var(--gold)', fontWeight: 500 }}>{rate.toFixed(1)}%</span>
            </div>
            <input type="range" min={6} max={14} step={0.1} value={rate}
              onChange={e => setRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#c9a96e', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.15rem', fontSize: '.55rem', color: 'var(--txt3)' }}>
              <span>6%</span><span>14%</span>
            </div>
          </div>
          {/* Tenure */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.35rem' }}>
              <span style={{ fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Tenure</span>
              <span style={{ fontSize: '.72rem', color: 'var(--gold)', fontWeight: 500 }}>{tenure} Yrs</span>
            </div>
            <input type="range" min={1} max={30} step={1} value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#c9a96e', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.15rem', fontSize: '.55rem', color: 'var(--txt3)' }}>
              <span>1 Yr</span><span>30 Yrs</span>
            </div>
          </div>
        </div>
        {/* Result bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem', padding: '.75rem 1rem', background: '#111', border: '1px solid rgba(201,169,110,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem' }}>
            <span style={{ fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Monthly EMI</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: 'var(--gold)', fontWeight: 300, lineHeight: 1 }}>₹{emi.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '.55rem', color: 'var(--txt3)', marginBottom: '.1rem' }}>Principal</div>
              <div style={{ fontSize: '.75rem', color: 'var(--warm)' }}>{fmt(amount)}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '.55rem', color: 'var(--txt3)', marginBottom: '.1rem' }}>Interest</div>
              <div style={{ fontSize: '.75rem', color: 'var(--warm)' }}>{fmt(totalInterest)}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '.55rem', color: 'var(--txt3)', marginBottom: '.1rem' }}>Total</div>
              <div style={{ fontSize: '.75rem', color: 'var(--warm)' }}>{fmt(totalPayable)}</div>
            </div>
          </div>
          <a href="https://wa.me/919090274545?text=I%20need%20home%20loan%20assistance%20for%20an%20Aspire%20InfraTech%20project"
            target="_blank" rel="noreferrer"
            style={{ padding: '.45rem 1rem', background: 'var(--gold)', color: 'var(--bg)', fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>
            Get Loan →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'absolute', bottom: '4.5rem', right: 0, width: '320px', background: '#111111', border: '1px solid rgba(201,169,110,0.35)', padding: '1.5rem', zIndex: 1002, boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: 'var(--warm)' }}>EMI Calculator</div>
        <button onClick={onClose} style={{ color: 'var(--txt3)', fontSize: '1.1rem', lineHeight: 1 }}>×</button>
      </div>

      {/* Loan Amount */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}>
          <span style={{ fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Loan Amount</span>
          <span style={{ fontSize: '.8rem', color: 'var(--gold)' }}>{fmt(amount)}</span>
        </div>
        <input type="range" min={1000000} max={30000000} step={100000} value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#c9a96e', cursor: 'pointer' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.2rem', fontSize: '.6rem', color: 'var(--txt3)' }}>
          <span>₹10L</span><span>₹3Cr</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}>
          <span style={{ fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Interest Rate</span>
          <span style={{ fontSize: '.8rem', color: 'var(--gold)' }}>{rate.toFixed(1)}% p.a.</span>
        </div>
        <input type="range" min={6} max={14} step={0.1} value={rate}
          onChange={e => setRate(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#c9a96e', cursor: 'pointer' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.2rem', fontSize: '.6rem', color: 'var(--txt3)' }}>
          <span>6%</span><span>14%</span>
        </div>
      </div>

      {/* Tenure */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}>
          <span style={{ fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txt2)' }}>Loan Tenure</span>
          <span style={{ fontSize: '.8rem', color: 'var(--gold)' }}>{tenure} Years</span>
        </div>
        <input type="range" min={1} max={30} step={1} value={tenure}
          onChange={e => setTenure(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#c9a96e', cursor: 'pointer' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.2rem', fontSize: '.6rem', color: 'var(--txt3)' }}>
          <span>1 Yr</span><span>30 Yrs</span>
        </div>
      </div>

      {/* Result */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(201,169,110,0.2)', padding: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '.75rem' }}>
          <div style={{ fontSize: '.58rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--txt2)', marginBottom: '.25rem' }}>Monthly EMI</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--gold)', fontWeight: 300 }}>
            ₹{emi.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', borderTop: '1px solid rgba(201,169,110,0.15)', paddingTop: '.75rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '.58rem', color: 'var(--txt2)', marginBottom: '.15rem' }}>Principal</div>
            <div style={{ fontSize: '.78rem', color: 'var(--warm)' }}>{fmt(amount)}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '.58rem', color: 'var(--txt2)', marginBottom: '.15rem' }}>Total Interest</div>
            <div style={{ fontSize: '.78rem', color: 'var(--warm)' }}>{fmt(totalInterest)}</div>
          </div>
        </div>
      </div>

      <a href="https://wa.me/919090274545?text=I%20would%20like%20home%20loan%20assistance%20for%20an%20Aspire%20InfraTech%20project"
        target="_blank" rel="noreferrer"
        style={{ display: 'block', textAlign: 'center', marginTop: '.85rem', padding: '.6rem', background: 'var(--gold)', color: 'var(--bg)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 500 }}>
        Get Loan Assistance →
      </a>
    </div>
  )
}

export default function ProjectPageClient({ project }: { project: Project }) {
  const [photoFilter, setPhotoFilter] = useState<(typeof PHOTO_FILTERS)[number]>('all')
  const [activeType, setActiveType] = useState<string>('')
  const [variantIdx, setVariantIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [videoId, setVideoId] = useState<string | null>(null)
  const [showEmi, setShowEmi] = useState(false)

  const plans = project.floorPlans || []

  // Unique BHK types in order
  const types = Array.from(new Set(plans.map(p => p.type)))
  const currentType = activeType || types[0] || ''
  const typeVariants = plans.filter(p => p.type === currentType)
  const safeIdx = Math.min(variantIdx, typeVariants.length - 1)
  const activePlan: FloorPlan | undefined = typeVariants[safeIdx]

  const handleTypeChange = useCallback((t: string) => {
    setActiveType(t)
    setVariantIdx(0)
  }, [])

  const photos = (project.photos || []).filter(
    (p) => photoFilter === 'all' || p.category === photoFilter,
  )
  const featuredVideo = project.videos?.find((v) => v.isFeatured) || project.videos?.[0]

  // Available units total
  const totalAvailable = plans.reduce((sum, p) => sum + (parseInt(p.unitsAvailable) || 0), 0)

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .pp-hero-body { padding: 0 1.5rem 3rem !important; }
          .pp-hero-stats { display: none !important; }
          .pp-specs-strip { grid-template-columns: repeat(2,1fr) !important; }
          .pp-overview { padding: 4rem 1.5rem !important; }
          .pp-plans { padding: 4rem 1.5rem !important; }
          .pp-plans-grid { grid-template-columns: 1fr !important; }
          .pp-amen { padding: 4rem 1.5rem !important; }
          .pp-video { padding: 4rem 1.5rem !important; }
          .pp-video-grid { grid-template-columns: 1fr !important; }
          .pp-gallery { padding: 4rem 1.5rem !important; }
          .pp-progress { padding: 4rem 1.5rem !important; }
          .pp-banks { padding: 4rem 1.5rem !important; }
          .pp-faq { padding: 4rem 1.5rem !important; }
          .pp-contact { padding: 4rem 1.5rem !important; }
          .pp-variant-nav { flex-direction: column !important; gap: .75rem !important; }
        }
        @media (max-width: 600px) {
          .pp-specs-strip { grid-template-columns: 1fr 1fr !important; }
          .pp-type-tabs { gap: .35rem !important; }
          .gallery-masonry { columns: 2 !important; }
          .pp-banks-grid { grid-template-columns: repeat(3,1fr) !important; }
          .pp-hero { min-height: 420px !important; }
        }
      `}</style>

      <Navbar />
      {videoId && (
        <VideoModal
          youtubeId={videoId}
          title={project.videos?.find((v) => v.youtubeId === videoId)?.title || 'Video'}
          onClose={() => setVideoId(null)}
        />
      )}

      {/* ── HERO ── */}
      <section className="pp-hero" style={{ position: 'relative', height: '75vh', minHeight: '520px' }}>
        <Image src={project.heroImage} alt={project.name} fill style={{ objectFit: 'cover' }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,8,.97) 0%,rgba(8,8,8,.45) 55%,rgba(8,8,8,.2) 100%)' }} />

        <div className="pp-hero-body" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 4rem 4.5rem', zIndex: 2 }}>
          <span style={{ display: 'inline-block', padding: '.3rem .85rem', border: '1px solid var(--gold)', fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            {project.tag}
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem,5vw,4.5rem)', fontWeight: 300, color: 'var(--warm)', lineHeight: 1.05, marginBottom: '.5rem' }}>
            {project.name}
          </h1>
          <p style={{ fontSize: '.9rem', color: 'var(--txt2)', marginBottom: '1.75rem' }}>{project.tagline}</p>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {[
              ['Starting Price', project.startingPrice],
              ['Unit Types', project.unitTypes],
              ['Possession', project.possession],
              ...(totalAvailable > 0 ? [['Units Available', `${totalAvailable} Units`]] : []),
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.2rem' }}>{l}</div>
                <div style={{ fontSize: '.95rem', color: 'var(--warm)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side hero stats */}
        <div className="pp-hero-stats" style={{ position: 'absolute', right: '4rem', bottom: '4.5rem', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'right' }}>
          {project.rera && (
            <div>
              <div style={{ fontSize: '.52rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.15rem' }}>MahaRERA</div>
              <div style={{ fontSize: '.78rem', color: 'var(--txt2)' }}>{project.rera}</div>
            </div>
          )}
          {project.totalUnits && (
            <div>
              <div style={{ fontSize: '.52rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.15rem' }}>Total Units</div>
              <div style={{ fontSize: '.78rem', color: 'var(--txt2)' }}>{project.totalUnits}</div>
            </div>
          )}
        </div>
      </section>

      {/* ── SPECS STRIP ── */}
      {project.specs && project.specs.length > 0 && (
        <div className="pp-specs-strip stats-strip" style={{ gridTemplateColumns: `repeat(${Math.min(project.specs.length, 4)}, 1fr)` }}>
          {project.specs.slice(0, 4).map((s) => (
            <div key={s.key} className="stat-cell">
              <div style={{ fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.35rem' }}>{s.key}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--warm)' }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── OVERVIEW ── */}
      <section className="pp-overview" style={{ padding: '6rem 4rem', background: 'var(--bg)' }}>
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

      {/* ── FLOOR PLANS ── */}
      {plans.length > 0 && (
        <section className="pp-plans" style={{ padding: '6rem 4rem', background: 'var(--ch)', borderTop: '1px solid var(--bdr)' }}>
          <div className="sec-eye"><span>Floor Plans &amp; Pricing</span></div>
          <h2 className="sec-h">Find the Home That Fits <em>Your Family</em></h2>
          <p style={{ fontSize: '.9rem', color: 'var(--txt2)', maxWidth: '600px', marginBottom: '1rem', lineHeight: 1.8 }}>
            Browse layouts, carpet areas and all-inclusive pricing — then calculate your monthly EMI instantly.
          </p>

          {/* BHK Type Tabs */}
          <div className="pp-type-tabs" style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', margin: '2rem 0 1.5rem' }}>
            {types.map((t) => (
              <button key={t} type="button" onClick={() => handleTypeChange(t)}
                style={{ padding: '.55rem 1.4rem', border: '1px solid', borderColor: currentType === t ? 'var(--gold)' : 'var(--bdr)', color: currentType === t ? 'var(--gold)' : 'var(--txt2)', fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', background: currentType === t ? 'rgba(201,169,110,.06)' : 'transparent', transition: 'all .25s' }}>
                {t}
              </button>
            ))}
          </div>

          {/* Variant Carousel Nav */}
          {typeVariants.length > 1 && (
            <div className="pp-variant-nav" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <button type="button" onClick={() => setVariantIdx(i => Math.max(0, i - 1))} disabled={safeIdx === 0}
                style={{ width: '36px', height: '36px', border: '1px solid var(--bdr)', color: safeIdx === 0 ? 'var(--txt3)' : 'var(--gold)', fontSize: '1rem', cursor: safeIdx === 0 ? 'default' : 'pointer', transition: 'all .25s' }}>
                ‹
              </button>
              <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                {typeVariants.map((v, i) => (
                  <button key={i} type="button" onClick={() => setVariantIdx(i)}
                    style={{ padding: '.3rem .9rem', border: '1px solid', borderColor: i === safeIdx ? 'var(--gold)' : 'var(--bdr)', color: i === safeIdx ? 'var(--gold)' : 'var(--txt2)', fontSize: '.65rem', letterSpacing: '.08em', cursor: 'pointer', background: i === safeIdx ? 'rgba(201,169,110,.06)' : 'transparent', transition: 'all .2s' }}>
                    {v.variant || `Variant ${i + 1}`}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setVariantIdx(i => Math.min(typeVariants.length - 1, i + 1))} disabled={safeIdx === typeVariants.length - 1}
                style={{ width: '36px', height: '36px', border: '1px solid var(--bdr)', color: safeIdx === typeVariants.length - 1 ? 'var(--txt3)' : 'var(--gold)', fontSize: '1rem', cursor: safeIdx === typeVariants.length - 1 ? 'default' : 'pointer', transition: 'all .25s' }}>
                ›
              </button>
            </div>
          )}

          {activePlan && (
            <div className="pp-plans-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
              {/* SVG Floor Plan */}
              <div style={{ background: '#111111', border: '1px solid var(--bdr)', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
                  {currentType}{activePlan.variant ? ` — ${activePlan.variant}` : ''}
                </div>
                <FloorPlanSVG bhkType={currentType} variant={activePlan.variant || ''} />
                <div style={{ marginTop: '1rem', fontSize: '.68rem', color: 'var(--txt3)', letterSpacing: '.06em' }}>* Schematic representation — not to scale</div>
              </div>

              {/* Specs + CTA */}
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem', marginBottom: '1.5rem' }}>
                  {([
                    ['Price', activePlan.price],
                    ['Carpet Area', activePlan.carpetArea],
                    ['Built-up Area', activePlan.builtUpArea],
                    ['Bathrooms', activePlan.bathrooms],
                    ['Balconies', activePlan.balconies],
                    ['Parking', activePlan.parking],
                    activePlan.unitsAvailable !== '0' ? ['Units Available', activePlan.unitsAvailable] : null,
                    activePlan.totalUnits ? ['Total Units', activePlan.totalUnits] : null,
                  ] as ([string, string] | null)[]).filter((row): row is [string, string] => row !== null).map(([k, v]) => (
                    <div key={k} style={{ padding: '.85rem 1rem', border: '1px solid var(--bdr)', background: 'var(--sl)' }}>
                      <div style={{ fontSize: '.58rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.25rem' }}>{k}</div>
                      <div style={{ fontSize: '.88rem', color: 'var(--warm)' }}>{v}</div>
                    </div>
                  ))}
                </div>

                {/* Inline EMI for this plan */}
                <div style={{ margin: '1.25rem 0', padding: '1rem 1.25rem', background: 'rgba(201,169,110,.04)', border: '1px solid rgba(201,169,110,.2)' }}>
                  <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.75rem' }}>Quick EMI Estimate</div>
                  <EMICalculator onClose={() => {}} inline />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
                  {project.brochureUrl && (
                    <a href={project.brochureUrl} target="_blank" rel="noreferrer" download className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Brochure
                    </a>
                  )}
                  <a href={`https://wa.me/919090274545?text=${encodeURIComponent(activePlan.waMsg || `${currentType} at ${project.name}`)}`}
                    target="_blank" rel="noreferrer" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Enquire on WhatsApp
                  </a>
                  <Link href="#contact" className="btn-outline" style={{ display: 'inline-flex' }}>📅 Schedule Site Visit</Link>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── BANKS APPROVED ── */}
      <section className="pp-banks" style={{ padding: '5rem 4rem', background: 'var(--bg)', borderTop: '1px solid var(--bdr)' }}>
        <div className="sec-eye"><span>Home Loan</span></div>
        <h2 className="sec-h">Pre-Approved by Leading <em>Banks</em></h2>
        <p style={{ fontSize: '.88rem', color: 'var(--txt2)', maxWidth: '600px', marginBottom: '2.5rem', lineHeight: 1.8 }}>
          {project.name} is pre-approved for home loans by 10+ leading banks and housing finance companies — making your home purchase faster and hassle-free.
        </p>

        {/* Scrolling marquee */}
        <div style={{ overflow: 'hidden', borderTop: '1px solid var(--bdr)', borderBottom: '1px solid var(--bdr)', padding: '.85rem 0', position: 'relative' }}>
          <div style={{ display: 'flex', gap: '1.25rem', animation: 'marqueeAnim 28s linear infinite', width: 'max-content' }}>
            {[...BANKS, ...BANKS].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.65rem', padding: '.55rem 1.1rem', border: '1px solid rgba(201,169,110,0.18)', background: 'var(--sl)', flexShrink: 0 }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: b.bg, color: b.color, fontSize: '.58rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: 0 }}>
                  {b.short}
                </div>
                <span style={{ fontSize: '.72rem', color: 'var(--txt2)', whiteSpace: 'nowrap' }}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ marginTop: '1.25rem', fontSize: '.75rem', color: 'var(--txt3)', marginBottom: '2rem' }}>
          * Home loan eligibility subject to individual bank criteria. Contact us for assisted loan processing at no extra charge.
        </p>

        {/* Inline EMI Calculator */}
        <div style={{ padding: '1.5rem', background: 'rgba(201,169,110,.04)', border: '1px solid rgba(201,169,110,.2)' }}>
          <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Calculate Your Home Loan EMI</div>
          <EMICalculator onClose={() => {}} inline />
        </div>
      </section>

      {/* ── AMENITIES ── */}
      {project.amenities && project.amenities.length > 0 && (
        <section className="pp-amen" style={{ padding: '6rem 4rem', background: 'var(--ch)', borderTop: '1px solid var(--bdr)' }}>
          <div className="sec-eye"><span>Amenities</span></div>
          <h2 className="sec-h">World-Class <em>Living</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: '3px', marginTop: '2.5rem' }}>
            {project.amenities.map((a) => (
              <div key={a.name} className="amen-card">
                <div style={{ fontSize: '1.75rem', marginBottom: '.5rem' }}>{a.icon}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--txt2)', letterSpacing: '.06em' }}>{a.name}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 3D WALKTHROUGH & VIDEOS ── */}
      {project.videos && project.videos.length > 0 && featuredVideo && (
        <section className="pp-video" style={{ padding: '6rem 4rem', background: 'var(--bg)', borderTop: '1px solid var(--bdr)' }}>
          <div className="sec-eye"><span>Virtual Tour</span></div>
          <h2 className="sec-h">3D Walkthrough &amp; <em>Video Tours</em></h2>
          <p style={{ fontSize: '.88rem', color: 'var(--txt2)', maxWidth: '540px', marginBottom: '2.5rem', lineHeight: 1.8 }}>
            Experience {project.name} from wherever you are — explore every room, amenity and view through our immersive video walkthroughs.
          </p>
          <div className="pp-video-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
            {/* Main featured video */}
            <div className="vw-main" onClick={() => setVideoId(featuredVideo.youtubeId)} role="button" tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setVideoId(featuredVideo.youtubeId)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featuredVideo.thumbnail} alt={featuredVideo.title} />
              <div className="vw-play">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--gold)"><polygon points="5,3 19,12 5,21" /></svg>
              </div>
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '.3rem .7rem', background: 'rgba(201,169,110,.9)', fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#080808', fontWeight: 600 }}>
                🎬 3D Walkthrough
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(transparent,rgba(8,8,8,.9))' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--warm)' }}>{featuredVideo.title}</div>
                <p style={{ fontSize: '.78rem', color: 'var(--txt2)' }}>{featuredVideo.subtitle}</p>
              </div>
            </div>
            {/* Video list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              {(project.videos || []).slice(0, 4).map((v) => (
                <div key={v.youtubeId} className="vw-thumb" onClick={() => setVideoId(v.youtubeId)} role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setVideoId(v.youtubeId)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.thumbnail} alt="" style={{ width: '80px', height: '54px', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '.82rem', color: 'var(--warm)' }}>{v.title}</div>
                    <div style={{ fontSize: '.68rem', color: 'var(--txt3)' }}>{v.duration}</div>
                  </div>
                </div>
              ))}
              <a href="https://wa.me/919090274545?text=I%20want%20to%20schedule%20a%20virtual%20site%20visit%20for%20this%20project"
                target="_blank" rel="noreferrer"
                style={{ display: 'block', padding: '.85rem 1.2rem', border: '1px solid var(--bdr2)', color: 'var(--gold)', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'center', transition: 'all .3s' }}>
                📱 Live Video Site Visit
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      {(project.photos || []).length > 0 && (
        <section className="pp-gallery" style={{ padding: '6rem 4rem', background: 'var(--ch)', borderTop: '1px solid var(--bdr)' }}>
          <div className="sec-eye"><span>Gallery</span></div>
          <h2 className="sec-h">Project <em>Gallery</em></h2>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', margin: '1.5rem 0 2rem' }}>
            {PHOTO_FILTERS.map((f) => (
              <button key={f} type="button" onClick={() => setPhotoFilter(f)}
                style={{ padding: '.4rem 1rem', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', border: '1px solid', borderColor: photoFilter === f ? 'var(--gold)' : 'var(--bdr)', color: photoFilter === f ? 'var(--gold)' : 'var(--txt2)', cursor: 'pointer', background: 'transparent', transition: 'all .2s' }}>
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          <div className="gallery-masonry">
            {photos.map((photo) => (
              <div key={photo.url} className="gallery-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt={photo.caption} style={{ width: '100%', display: 'block' }} />
                <div style={{ padding: '.5rem .75rem', fontSize: '.68rem', color: 'var(--txt2)', background: 'var(--sl)' }}>{photo.caption}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CONSTRUCTION PROGRESS ── */}
      {project.progress && project.progress.length > 0 && (
        <section className="pp-progress" style={{ padding: '6rem 4rem', background: 'var(--bg)', borderTop: '1px solid var(--bdr)' }}>
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
                  <div style={{ height: '100%', width: `${item.percentage}%`, background: 'linear-gradient(to right,var(--gold-dk),var(--gold))' }} />
                </div>
              </div>
            ))}
          </div>
          {project.timeline && project.timeline.length > 0 && (
            <div style={{ marginTop: '3rem', display: 'flex', gap: '0', flexWrap: 'wrap' }}>
              {project.timeline.map((t, i) => (
                <div key={i} style={{ flex: '1', minWidth: '130px', padding: '1rem', borderLeft: i === 0 ? 'none' : '1px solid var(--bdr)', position: 'relative' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: t.done ? 'var(--gold)' : 'var(--bdr)', marginBottom: '.5rem' }} />
                  <div style={{ fontSize: '.72rem', color: t.done ? 'var(--warm)' : 'var(--txt2)', marginBottom: '.2rem' }}>{t.label}</div>
                  <div style={{ fontSize: '.62rem', color: t.done ? 'var(--gold)' : 'var(--txt3)' }}>{t.date}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── MAP / LOCATION ── */}
      {project.nearbyCategories && project.nearbyCategories.length > 0 && (
        <section style={{ padding: '6rem 4rem', background: 'var(--ch)', borderTop: '1px solid var(--bdr)' }}>
          <div className="sec-eye"><span>Location</span></div>
          <h2 className="sec-h">Perfectly <em>Connected</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
            {project.nearbyCategories.map((cat) => (
              <div key={cat.title} style={{ padding: '1.5rem', border: '1px solid var(--bdr)', background: 'var(--sl)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>{cat.icon}</div>
                <div style={{ fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>{cat.title}</div>
                {cat.items.map((item) => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem', paddingBottom: '.5rem', borderBottom: '1px solid rgba(201,169,110,.08)', fontSize: '.78rem' }}>
                    <span style={{ color: 'var(--txt2)' }}>{item.name}</span>
                    <span style={{ color: 'var(--gold)' }}>{item.distance}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {project.mapEmbedUrl && (
            <div style={{ marginTop: '2.5rem', border: '1px solid var(--bdr)', overflow: 'hidden' }}>
              <iframe src={project.mapEmbedUrl} width="100%" height="360" style={{ border: 0, filter: 'grayscale(1) contrast(.85)', opacity: .7, display: 'block' }} allowFullScreen loading="lazy" title="Location Map" />
            </div>
          )}
        </section>
      )}

      {/* ── FAQ ── */}
      {project.faqs && project.faqs.length > 0 && (
        <section className="pp-faq" style={{ padding: '6rem 4rem', background: 'var(--bg)', borderTop: '1px solid var(--bdr)' }}>
          <div className="sec-eye"><span>FAQs</span></div>
          <h2 className="sec-h">Common <em>Questions</em></h2>
          <div style={{ maxWidth: '800px', marginTop: '2rem' }}>
            {project.faqs.map((faq, i) => (
              <div key={faq.question} className="accord-item">
                <button type="button" className="accord-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ color: openFaq === i ? 'var(--gold)' : 'var(--warm)' }}>
                  {faq.question}
                  <span>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="accord-a">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CONTACT / ENQUIRE ── */}
      <section id="contact" className="pp-contact" style={{ padding: '6rem 4rem', background: 'var(--ch)', borderTop: '1px solid var(--bdr)' }}>
        <div className="sec-eye"><span>Enquire</span></div>
        <h2 className="sec-h">Interested in <em>{project.name}?</em></h2>
        <p style={{ fontSize: '.88rem', color: 'var(--txt2)', maxWidth: '480px', marginBottom: '2.5rem', lineHeight: 1.85 }}>
          Book a free consultation with our property advisor — no sales pressure, just honest guidance.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div style={{ maxWidth: '480px' }}>
            <ContactForm projectName={project.name} />
          </div>
          <div>
            {[['📞', 'Call Us', '+91 90902 74545'], ['💬', 'WhatsApp', '+91 90902 74545'], ['📍', 'Address', 'Katraj–Dhankawadi, Pune — 411 046']].map(([ic, lbl, val]) => (
              <div key={lbl} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--bdr)' }}>
                <div style={{ width: '42px', height: '42px', border: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{ic}</div>
                <div>
                  <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.2rem' }}>{lbl}</div>
                  <div style={{ fontSize: '.88rem', color: 'var(--txt)' }}>{val}</div>
                </div>
              </div>
            ))}
            {project.brochureUrl && (
              <a href={project.brochureUrl} target="_blank" rel="noreferrer" download
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', padding: '.75rem 1.5rem', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '.5rem', marginBottom: '.75rem', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--bg)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Brochure
              </a>
            )}
            <a href={`https://wa.me/919090274545?text=${encodeURIComponent(`I'm interested in ${project.name}. Please share details.`)}`}
              target="_blank" rel="noreferrer" className="btn-wa" style={{ display: 'inline-flex', marginTop: '.5rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── EMI CALCULATOR FLOAT ── */}
      <div style={{ position: 'fixed', bottom: '6rem', right: '2rem', zIndex: 1001 }}>
        {showEmi && <EMICalculator onClose={() => setShowEmi(false)} />}
        <button
          onClick={() => setShowEmi(v => !v)}
          title="Calculate EMI"
          style={{ width: '56px', height: '56px', background: showEmi ? 'var(--gold)' : '#1a1a1a', border: '1px solid var(--gold)', borderRadius: '50%', color: showEmi ? '#080808' : 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 28px rgba(201,169,110,0.3)', transition: 'all .3s', fontSize: '1.1rem' }}>
          {showEmi ? '×' : '₹'}
        </button>
        {!showEmi && (
          <span style={{ position: 'absolute', bottom: '62px', right: 0, whiteSpace: 'nowrap', background: '#1a1a1a', border: '1px solid rgba(201,169,110,0.35)', color: 'var(--gold)', fontSize: '.6rem', letterSpacing: '.1em', padding: '.3rem .7rem', pointerEvents: 'none' }}>
            EMI Calc
          </span>
        )}
      </div>
    </>
  )
}
