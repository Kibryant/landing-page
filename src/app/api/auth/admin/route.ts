import Adm from '@/core/admin/Adm'
import { NextResponse } from 'next/server'
import connect from '@/core/db'
import bcrypt from 'bcrypt'
import { type AdmProps } from '@/types/AdmProps'
import * as jose from 'jose'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { getSecretKey } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        await connect()

        const body = await req.json()

        const { accessCode, email, password }: AdmProps = body

        const SECRET_KEY = getSecretKey()

        const adm: AdmProps | null = await Adm.findOne({ email })

        if (!adm) {
            return NextResponse.json({
                error: true,
                status: HttpStatusCode.NOT_FOUND,
                message: 'Credentials Invalid!',
            })
        }

        const validAccessCode = await bcrypt.compare(accessCode, adm.accessCode)
        const validPassword = await bcrypt.compare(password, adm.password)

        if (!validPassword || !validAccessCode) {
            return NextResponse.json({
                error: true,
                status: 401,
                message: 'Credentials Invalid!',
            })
        }

        adm.token = ''

        const expirationTime = Math.floor(Date.now() / 1000) + 5 * 60 * 60 // 5 hours

        const token = await new jose.SignJWT({})
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(expirationTime)
            .sign(new TextEncoder().encode(SECRET_KEY))

        adm.token = token

        await adm.save()

        const cookiesValue = NextResponse.next().cookies.set('auth_token', token, {
            expires: 5 * 60 * 60,
            httpOnly: false,
            maxAge: 5 * 60 * 60,
            path: '/',
        })

        return NextResponse.json(
            {
                message: 'Sucess!',
                error: false,
                status: 201,
            },
            { headers: { 'Set-Cookie': `${cookiesValue}` } },
        )
    } catch (error) {
        return NextResponse.json({
            message: `Error: ${error}`,
            error: true,
            status: 500,
        })
    }
}
