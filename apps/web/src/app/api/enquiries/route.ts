import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { EnquiryModel } from '@/lib/models'
import nodemailer from 'nodemailer'

const NOTIFY_EMAIL = 'hello@aspirebuildcons.in'

async function sendEnquiryEmail(data: {
  firstName: string; lastName?: string; phone: string; email?: string;
  project?: string; budget?: string; message?: string;
}) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  await transporter.sendMail({
    from: `"Aspire Buildcon Website" <${process.env.SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `New Enquiry from ${data.firstName} ${data.lastName || ''}`.trim(),
    html: `
      <div style="font-family:sans-serif;max-width:560px;padding:24px;border:1px solid #e5e5e5">
        <h2 style="color:#c9a96e;margin:0 0 20px">New Website Enquiry</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#888;width:130px">Name</td><td style="padding:8px 0;font-weight:600">${data.firstName} ${data.lastName || ''}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Phone</td><td style="padding:8px 0;font-weight:600">${data.phone}</td></tr>
          ${data.email ? `<tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0">${data.email}</td></tr>` : ''}
          ${data.project ? `<tr><td style="padding:8px 0;color:#888">Project</td><td style="padding:8px 0">${data.project}</td></tr>` : ''}
          ${data.budget ? `<tr><td style="padding:8px 0;color:#888">Budget</td><td style="padding:8px 0">${data.budget}</td></tr>` : ''}
          ${data.message ? `<tr><td style="padding:8px 0;color:#888;vertical-align:top">Message</td><td style="padding:8px 0">${data.message}</td></tr>` : ''}
        </table>
      </div>
    `,
  })
}

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
        firstName, lastName, phone, email, project, budget, message,
        source: source || 'website',
        status: 'new',
      })
    } catch {
      console.log('[enquiry]', { firstName, phone, project, budget })
    }

    sendEnquiryEmail({ firstName, lastName, phone, email, project, budget, message }).catch((err) => {
      console.error('[email error]', err?.message || err)
    })

    return NextResponse.json({ success: true, message: 'Enquiry received' })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
