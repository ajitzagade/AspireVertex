import { connectDB } from '@/lib/mongodb'
import { ProjectModel } from '@/lib/models'
import type { Project } from '@/types'
import { ALL_PROJECTS } from '@/data/seed'
import AllProjectsClient from './AllProjectsClient'

async function getProjects(): Promise<Project[]> {
  try {
    await connectDB()
    const docs = await ProjectModel.find({}).sort({ order: 1 }).lean()
    return JSON.parse(JSON.stringify(docs)) as Project[]
  } catch {
    return ALL_PROJECTS as Project[]
  }
}

export const metadata = {
  title: 'All Projects — Aspire InfraTech | Pune Real Estate',
  description: 'Explore all Aspire InfraTech residential and commercial developments across Pune — ongoing, completed and upcoming.',
}

export default async function AllProjectsPage() {
  const projects = await getProjects()
  return <AllProjectsClient projects={projects} />
}
