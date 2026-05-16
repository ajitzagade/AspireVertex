import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ProjectModel } from '@/lib/models'
import { ALL_PROJECTS } from '@/data/seed'

export async function GET() {
  try {
    await connectDB()
    const count = await ProjectModel.countDocuments()

    if (count === 0) {
      await ProjectModel.insertMany(ALL_PROJECTS)
      const newCount = await ProjectModel.countDocuments()
      return NextResponse.json({ ok: true, seeded: true, count: newCount })
    }

    return NextResponse.json({ ok: true, seeded: false, count })
  } catch (e: unknown) {
    return NextResponse.json({
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    })
  }
}
