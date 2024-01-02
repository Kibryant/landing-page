import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import JwtService from './external/security/jwt/JwtService'
import { getSecretKey } from './utils'
import { expirationTime } from './constants'

export async function middleware(req: NextRequest) {
    const url = req.url
    const jwtService = new JwtService(getSecretKey(), expirationTime, 'HS256')
    const token = req.cookies.get('client-session-token')?.value
    const isTokenValid = !!token && (await jwtService.verifyToken(token))

    if (req.nextUrl.pathname.startsWith('/clients') && !isTokenValid) {
        return NextResponse.redirect(new URL('/accounts/sign-in', url))
    }

    if (req.nextUrl.pathname.startsWith('/api/clients')) {
        console.log(token)
        console.log(req.cookies.get('client-session-token'))
    }

    if (req.nextUrl.pathname.startsWith('/accounts/sign-up') && isTokenValid) {
        return NextResponse.redirect(new URL('/clients', url))
    }

    if (req.nextUrl.pathname.startsWith('/accounts/sign-in') && isTokenValid) {
        return NextResponse.redirect(new URL('/clients', url))
    }
}
export const config = {
    matcher: ['/clients/:path*', '/accounts/:path*', '/api/clients/:path*'],
}
