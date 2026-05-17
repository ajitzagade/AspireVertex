import { connectDB } from '@/lib/mongodb'
import { ProjectModel, SettingsModel } from '@/lib/models'
import type { Project } from '@/types'
import { ALL_PROJECTS, SITE_SETTINGS } from '@/data/seed'
import ProjectPageClient from '@/components/sections/ProjectPageClient'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string): Promise<{ project: Project | null; waNumber: string }> {
  try {
    await connectDB()
    const [p, waDoc] = await Promise.all([
      ProjectModel.findOne({ slug }).lean(),
      SettingsModel.findOne({ key: 'whatsappNumber' }).lean() as unknown as Promise<{ value?: string } | null>,
    ])
    return {
      project: p ? JSON.parse(JSON.stringify(p)) : null,
      waNumber: waDoc?.value || SITE_SETTINGS.whatsappNumber || '919090274545',
    }
  } catch {
    return {
      project: (ALL_PROJECTS.find(p => p.slug === slug) as Project) || null,
      waNumber: SITE_SETTINGS.whatsappNumber || '919090274545',
    }
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { project: p } = await getProject(slug)
  if (!p) return { title: 'Project Not Found' }
  return {
    title: `${p.name} — Aspire Buildcon | ${p.location}`,
    description:
      p.description ||
      `${p.unitTypes} residences in ${p.location}. Starting ${p.startingPrice}. ${p.rera ? `MahaRERA: ${p.rera}` : ''}`,
    openGraph: { images: [p.heroImage] },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const { project, waNumber } = await getProject(slug)
  if (!project) notFound()
  return <ProjectPageClient project={project} waNumber={waNumber} />
}
