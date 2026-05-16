import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

function expectedToken() {
  return btoa(encodeURIComponent(process.env.ADMIN_PASSWORD || 'aspire-admin'))
}

export async function POST(req: NextRequest) {
  // Verify admin session
  const jar = await cookies()
  const token = jar.get('_ait')?.value
  if (token !== expectedToken()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN not configured. Add it in Vercel Dashboard → Storage → Blob, or paste an image URL directly.' },
      { status: 503 }
    )
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const maxMB = file.type.startsWith('image/') ? 10 : 20
    if (file.size > maxMB * 1024 * 1024) {
      return NextResponse.json({ error: `File too large (max ${maxMB}MB)` }, { status: 400 })
    }

    const ext = file.name.split('.').pop() || 'bin'
    const safeName = `aspire/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const blob = await put(safeName, file, { access: 'public' })
    return NextResponse.json({ url: blob.url })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Upload failed' }, { status: 500 })
  }
}
