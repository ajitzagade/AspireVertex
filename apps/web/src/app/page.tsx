import { connectDB } from '@/lib/mongodb'
import { ProjectModel, TestimonialModel, SettingsModel } from '@/lib/models'
import type { Project, Testimonial, SiteSettings } from '@/types'
import { SITE_SETTINGS, ALL_PROJECTS, TESTIMONIALS } from '@/data/seed'
import HomeClient from '@/components/sections/HomeClient'

async function getData() {
  try {
    await connectDB()
    const [projectDocs, testimonialDocs, settingsDocs] = await Promise.all([
      ProjectModel.find({}).sort({ order: 1 }).lean(),
      TestimonialModel.find({ isActive: true }).sort({ order: 1 }).lean(),
      SettingsModel.find({}).lean(),
    ])

    const settings: Record<string, unknown> = {}
    for (const s of settingsDocs as any[]) settings[s.key] = s.value

    return {
      projects: JSON.parse(JSON.stringify(projectDocs)) as Project[],
      testimonials: JSON.parse(JSON.stringify(testimonialDocs)) as Testimonial[],
      settings: settings as unknown as SiteSettings,
    }
  } catch {
    // Fallback to seed data if DB not connected
    return {
      projects: ALL_PROJECTS as Project[],
      testimonials: TESTIMONIALS as Testimonial[],
      settings: SITE_SETTINGS,
    }
  }
}

export default async function HomePage() {
  const { projects, testimonials, settings } = await getData()
  return <HomeClient projects={projects} testimonials={testimonials} settings={settings} />
}