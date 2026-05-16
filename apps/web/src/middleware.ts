import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function expectedToken() {
  return btoa(encodeURIComponent(process.env.ADMIN_PASSWORD || 'aspire-admin'))
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
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
  matcher: ['/admin/:path*'],
}
