import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextApiRequest } from 'next'

export async function middleware(
  req: NextRequest & NextApiRequest,
  ev: NextFetchEvent
) {
  // Token will exist if user is logged in
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET as string,
  })
  const { pathname, origin } = req.nextUrl

  // Allow the request if the following is true
  // 1. its a request for next-auth session & provider fetching
  // 2. the token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // Redirect to index page if the following is true
  if (token && pathname === '/') {
    console.log('origin ', origin)
    return NextResponse.redirect(`${origin}/`)
  }

  // Otherwise redirect to login page
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(`${origin}/login`)
  }
}
