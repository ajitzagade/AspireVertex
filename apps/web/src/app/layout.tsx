import type { Metadata } from 'next'
import '@/styles/global.css'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5173'),
  title: 'Aspire Group — Premium Real Estate Developers, Pune',
  description: "Aspire Group — Pune's most trusted real estate developers. Premium residences across Katraj, Ambegaon & Kondhwa. 825,000+ sq.ft. delivered.",
  keywords: 'real estate Pune, flats Katraj, 2 BHK Ambegaon, Aspire Group, premium apartments Pune',
  openGraph: {
    title: 'Aspire Group — Premium Real Estate Developers, Pune',
    description: "Pune's most trusted builders delivering landmark residences.",
    images: [{ url: '/logo.png', width: 204, height: 212, alt: 'Aspire Group' }],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  )
}