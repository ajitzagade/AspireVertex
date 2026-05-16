import { notFound } from 'next/navigation'
import { getProject } from '../../actions'
import ProjectForm from './ProjectForm'

export const dynamic = 'force-dynamic'

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const isNew = slug === 'new'
  const project = isNew ? null : await getProject(slug)

  if (!isNew && !project) notFound()

  return (
    <div style={{ padding: '2rem', maxWidth: '960px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '.25rem' }}>
          {isNew ? 'New Project' : 'Edit Project'}
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 400, color: '#e0d6c8', margin: 0 }}>
          {isNew ? 'Create Project' : project.name}
        </h1>
      </div>
      <ProjectForm project={project} />
    </div>
  )
}
