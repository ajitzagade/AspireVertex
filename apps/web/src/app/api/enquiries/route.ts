import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { EnquiryModel } from '@/lib/models'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, phone, email, project, budget, message, source } = body

    if (!firstName || !phone) {
      return NextResponse.json(
        { success: false, error: 'First name and phone are required' },
        { status: 400 },
      )
    }

    try {
      await connectDB()
      await EnquiryModel.create({
        firstName,
        lastName,
        phone,
        email,
        project,
        budget,
        message,
        source: source || 'website',
        status: 'new',
      })
    } catch {
      console.log('[enquiry]', { firstName, phone, project, budget })
    }

    return NextResponse.json({ success: true, message: 'Enquiry received' })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
