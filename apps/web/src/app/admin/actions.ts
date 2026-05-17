'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectDB } from '@/lib/mongodb'
import { ProjectModel, TestimonialModel, SettingsModel } from '@/lib/models'
import { ALL_PROJECTS, SITE_SETTINGS } from '@/data/seed'
import type { SiteSettings, Testimonial } from '@/types'

function expectedToken() {
  return btoa(encodeURIComponent(process.env.ADMIN_PASSWORD || 'aspire-admin'))
}

export async function loginAction(_: unknown, formData: FormData) {
  const password = formData.get('password') as string
  if (password !== (process.env.ADMIN_PASSWORD || 'aspire-admin')) {
    return { error: 'Invalid password' }
  }
  const jar = await cookies()
  jar.set('_ait', expectedToken(), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
  redirect('/admin/projects')
}

export async function logoutAction() {
  const jar = await cookies()
  jar.delete('_ait')
  redirect('/admin/login')
}

// ── Projects ──

export async function getProjects() {
  try {
    await connectDB()
    const docs = await ProjectModel.find({}).sort({ order: 1 }).lean()
    return JSON.parse(JSON.stringify(docs))
  } catch {
    return []
  }
}

export async function getProject(slug: string) {
  try {
    await connectDB()
    const doc = await ProjectModel.findOne({ slug }).lean()
    return doc ? JSON.parse(JSON.stringify(doc)) : null
  } catch {
    return null
  }
}

export async function saveProject(_: unknown, formData: FormData) {
  await connectDB()

  const raw = formData.get('__json') as string
  if (!raw) return { error: 'No data' }

  let data: Record<string, unknown>
  try {
    data = JSON.parse(raw)
  } catch {
    return { error: 'Invalid JSON' }
  }

  const { _id, ...rest } = data as { _id?: string; [k: string]: unknown }

  try {
    if (_id) {
      await ProjectModel.findByIdAndUpdate(_id, rest, { new: true })
    } else {
      await ProjectModel.create(rest)
    }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Save failed' }
  }

  revalidatePath('/')
  revalidatePath('/all-projects')
  revalidatePath(`/projects/${rest.slug}`)
  revalidatePath('/admin/projects')

  return { success: true }
}

export async function deleteProject(id: string) {
  await connectDB()
  await ProjectModel.findByIdAndDelete(id)
  revalidatePath('/')
  revalidatePath('/all-projects')
  revalidatePath('/admin/projects')
}

export async function seedProjects() {
  try {
    await connectDB()
    const count = await ProjectModel.countDocuments()
    if (count > 0) return { error: 'DB already has projects. Delete them first.' }
    await ProjectModel.insertMany(ALL_PROJECTS)
    revalidatePath('/')
    revalidatePath('/all-projects')
    revalidatePath('/admin/projects')
    return { success: true, count: ALL_PROJECTS.length }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Could not connect to database' }
  }
}

// ── Settings ──

export async function getSettings(): Promise<SiteSettings> {
  try {
    await connectDB()
    const docs = await SettingsModel.find({}).lean() as unknown as { key: string; value: unknown }[]
    const settings: Record<string, unknown> = {}
    for (const d of docs) settings[d.key] = d.value
    return settings as unknown as SiteSettings
  } catch {
    return SITE_SETTINGS
  }
}

export async function saveSettings(_: unknown, formData: FormData) {
  const raw = formData.get('__json') as string
  if (!raw) return { error: 'No data' }

  let data: SiteSettings
  try {
    data = JSON.parse(raw)
  } catch {
    return { error: 'Invalid JSON' }
  }

  try {
    await connectDB()
    const entries = Object.entries(data) as [string, unknown][]
    await Promise.all(
      entries.map(([key, value]) =>
        SettingsModel.findOneAndUpdate({ key }, { key, value }, { upsert: true, new: true })
      )
    )
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Save failed' }
  }

  revalidatePath('/')
  revalidatePath('/all-projects')
  revalidatePath('/admin/settings')

  return { success: true }
}

export async function seedSettings() {
  try {
    await connectDB()
    const entries = Object.entries(SITE_SETTINGS) as [string, unknown][]
    await Promise.all(
      entries.map(([key, value]) =>
        SettingsModel.findOneAndUpdate({ key }, { key, value }, { upsert: true, new: true })
      )
    )
    revalidatePath('/')
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Could not connect to database' }
  }
}

// ── Testimonials ──

export async function getTestimonials() {
  try {
    await connectDB()
    const docs = await TestimonialModel.find({}).sort({ order: 1 }).lean()
    return JSON.parse(JSON.stringify(docs))
  } catch {
    return []
  }
}

export async function saveTestimonial(_: unknown, formData: FormData) {
  const raw = formData.get('__json') as string
  if (!raw) return { error: 'No data' }

  let data: Partial<Testimonial> & { _id?: string }
  try {
    data = JSON.parse(raw)
  } catch {
    return { error: 'Invalid JSON' }
  }

  const { _id, ...rest } = data

  try {
    await connectDB()
    if (_id) {
      await TestimonialModel.findByIdAndUpdate(_id, rest, { new: true })
    } else {
      await TestimonialModel.create(rest)
    }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Save failed' }
  }

  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  return { success: true }
}

export async function deleteTestimonial(id: string) {
  await connectDB()
  await TestimonialModel.findByIdAndDelete(id)
  revalidatePath('/')
  revalidatePath('/admin/testimonials')
}

export async function seedTestimonials() {
  const { TESTIMONIALS } = await import('@/data/seed')
  try {
    await connectDB()
    const count = await TestimonialModel.countDocuments()
    if (count > 0) return { error: 'DB already has testimonials. Delete them first.' }
    await TestimonialModel.insertMany(TESTIMONIALS)
    revalidatePath('/')
    revalidatePath('/admin/testimonials')
    return { success: true, count: TESTIMONIALS.length }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'Could not connect to database' }
  }
}
