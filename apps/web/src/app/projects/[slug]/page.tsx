import { connectDB } from '@/lib/mongodb'
import { ProjectModel } from '@/lib/models'
import type { Project } from '@/types'
import { SIDDHI_PROJECT, OPTIMA_PROJECT } from '@/data/seed'
import ProjectPageClient from '@/components/sections/ProjectPageClient'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    await connectDB()
    const p = await ProjectModel.findOne({ slug }).lean()
    return p ? JSON.parse(JSON.stringify(p)) : null
  } catch {
    const seed = { 'siddhi-aspire': SIDDHI_PROJECT, 'optima-aspire': OPTIMA_PROJECT }
    return (seed[slug as keyof typeof seed] as Project) || null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getProject(slug)
  if (!p) return { title: 'Project Not Found' }
  return {
    title: `${p.name} — Aspire Group | ${p.location}`,
    description:
      p.description ||
      `${p.unitTypes} residences in ${p.location}. Starting ${p.startingPrice}. ${p.rera ? `MahaRERA: ${p.rera}` : ''}`,
    openGraph: { images: [p.heroImage] },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()
  return <ProjectPageClient project={project} />
}
