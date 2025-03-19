import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ 
        req: request,
        secret: process.env.NEXTAUTH_SECRET 
    })

    // Define public paths that don't require authentication
    const publicPaths = ['/login', '/register', '/api/auth']

    const isPublicPath = publicPaths.some((path) => 
        request.nextUrl.pathname.startsWith(path)
    )

    // If the user is not logged in and trying to access a protected route,
    // redirect them to the login page
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If the user is logged in and trying to access login/register page,
    // redirect them to the home page
    if (token && isPublicPath && request.nextUrl.pathname !== '/api/auth') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (auth API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)'
    ]
} 