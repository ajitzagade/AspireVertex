import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const MAIN_DOMAIN = 'aspirebuildcons.in'

function expectedToken() {
  return btoa(encodeURIComponent(process.env.ADMIN_PASSWORD || 'aspire-admin'))
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  // ── Subdomain routing ──
  const isSubdomain =
    hostname.endsWith(`.${MAIN_DOMAIN}`) && !hostname.startsWith('www.')

  if (isSubdomain) {
    const slug = hostname.replace(`.${MAIN_DOMAIN}`, '')
    return NextResponse.rewrite(new URL(`/projects/${slug}`, request.url))
  }

  // ── Admin auth ──
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const isLoginPage = pathname === '/admin/login'
  const token = request.cookies.get('_ait')?.value

  if (isLoginPage) {
    if (token === expectedToken()) {
      return NextResponse.redirect(new URL('/admin/projects', request.url))
    }
    return NextResponse.next()
  }

  if (token !== expectedToken()) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|logo.png).*)'],
}
