import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import JwtService from './external/security/jwt/JwtService'
import { getSecretKey } from './utils'
import { expirationTime } from './constants'
import { HttpStatusCode } from './types/HttpStatusCode'

export async function middleware(req: NextRequest) {
    const jwtService = new JwtService(getSecretKey(), expirationTime, 'HS256')

    const token = req.cookies.get('auth_token')?.value
    const url = req.url

    const verifiedToken = !!token && (await jwtService.verifyToken(token))
    if (req.nextUrl.pathname.startsWith('/sign-in-adm') && !verifiedToken) {
        return
    }

    if (!verifiedToken) {
        return NextResponse.redirect(new URL('/sign-in-adm', url))
    }

    if (!verifiedToken) {
        if (req.nextUrl.pathname.startsWith('/api/admin')) {
            NextResponse.json({
                error: true,
                message: 'authentication required',
                status: HttpStatusCode.UNAUTHORIZED,
            })
        }
    }

    if (req.nextUrl.pathname.startsWith('/sign-in-adm') && verifiedToken) {
        return NextResponse.redirect(new URL('/admin', url))
    }

    if (url.startsWith('/admin/products') && !verifiedToken) {
        return NextResponse.redirect(new URL('/sign-in-adm', url))
    }
}

export const config = {
    matcher: ['/login-adm', '/admin'],
}
