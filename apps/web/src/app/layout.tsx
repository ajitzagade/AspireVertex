import type { Metadata } from 'next'
import '@/styles/global.css'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import { connectDB } from '@/lib/mongodb'
import { SettingsModel } from '@/lib/models'
import { SITE_SETTINGS } from '@/data/seed'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5173'),
  title: 'Aspire Buildcon — Premium Real Estate Developers, Pune',
  description: "Aspire Buildcon — Pune's most trusted real estate developers. Premium residences across Katraj, Ambegaon & Kondhwa. 825,000+ sq.ft. delivered.",
  keywords: 'real estate Pune, flats Katraj, 2 BHK Ambegaon, Aspire Buildcon, premium apartments Pune',
  openGraph: {
    title: 'Aspire Buildcon — Premium Real Estate Developers, Pune',
    description: "Pune's most trusted builders delivering landmark residences.",
    images: [{ url: '/logo.png', width: 204, height: 212, alt: 'Aspire Buildcon' }],
    type: 'website',
  },
}

async function getWANumber(): Promise<string> {
  try {
    await connectDB()
    const doc = await SettingsModel.findOne({ key: 'whatsappNumber' }).lean() as unknown as { value?: string } | null
    return doc?.value || SITE_SETTINGS.whatsappNumber || '919090274545'
  } catch {
    return SITE_SETTINGS.whatsappNumber || '919090274545'
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const waNumber = await getWANumber()
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* ── Page Loader ── */}
        <div id="__page-loader" style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: '#080808',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          transition: 'opacity 0.6s ease',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Aspire Buildcon" style={{ width: '72px', height: 'auto', marginBottom: '2rem' }} />
          <div style={{ width: '120px', height: '2px', background: 'rgba(201,169,110,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
            <div id="__loader-bar" style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg,#c9a96e,#f0d4a0)' }} />
          </div>
          <div style={{ marginTop: '1.25rem', fontFamily: "'Jost',sans-serif", fontSize: '.58rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#c9a96e' }}>
            Aspire Buildcon
          </div>
        </div>
        <style>{`
          @keyframes __loaderFill { from { width: 0% } to { width: 100% } }
          #__loader-bar { animation: __loaderFill 1.6s cubic-bezier(0.4,0,0.2,1) forwards; }
        `}</style>
        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load', function() {
            var l = document.getElementById('__page-loader');
            if (l) { l.style.opacity = '0'; setTimeout(function() { l.style.display = 'none'; }, 650); }
          });
        `}} />

        {children}
        <WhatsAppFloat phone={waNumber} />
      </body>
    </html>
  )
}
