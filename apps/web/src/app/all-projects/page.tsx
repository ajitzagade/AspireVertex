import { connectDB } from '@/lib/mongodb'
import { ProjectModel, SettingsModel } from '@/lib/models'
import type { Project } from '@/types'
import { ALL_PROJECTS, SITE_SETTINGS } from '@/data/seed'
import AllProjectsClient from './AllProjectsClient'

async function getData(): Promise<{ projects: Project[]; waNumber: string }> {
  try {
    await connectDB()
    const [projectDocs, waDoc] = await Promise.all([
      ProjectModel.find({}).sort({ order: 1 }).lean(),
      SettingsModel.findOne({ key: 'whatsappNumber' }).lean() as Promise<{ value?: string } | null>,
    ])
    return {
      projects: JSON.parse(JSON.stringify(projectDocs)) as Project[],
      waNumber: waDoc?.value || SITE_SETTINGS.whatsappNumber || '919090274545',
    }
  } catch {
    return {
      projects: ALL_PROJECTS as Project[],
      waNumber: SITE_SETTINGS.whatsappNumber || '919090274545',
    }
  }
}

export const metadata = {
  title: 'All Projects — Aspire InfraTech | Pune Real Estate',
  description: 'Explore all Aspire InfraTech residential and commercial developments across Pune — ongoing, completed and upcoming.',
}

export default async function AllProjectsPage() {
  const { projects, waNumber } = await getData()
  return <AllProjectsClient projects={projects} waNumber={waNumber} />
}
