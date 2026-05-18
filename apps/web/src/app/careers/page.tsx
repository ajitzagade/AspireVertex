import type { Metadata } from 'next'
import CareersClient from '@/components/sections/CareersClient'

export const metadata: Metadata = {
  title: 'Careers — Aspire Buildcon | Join Our Team',
  description: "Build your career with Aspire Buildcon — Pune's most trusted real estate developer. View current openings and apply today.",
}

export default function CareersPage() {
  return <CareersClient />
}
