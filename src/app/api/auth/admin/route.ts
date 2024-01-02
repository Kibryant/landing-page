import { NextResponse } from 'next/server'
import connect from '@/core/db'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import Admin from '@/core/admin/model/Admin'
import { GetAdminByEmail } from '@/core/admin/services/GetAdminByEmail'
import { RepositoryAdminMongo } from '@/external/database/repository/admin/RepositoryAdminMongo'
import PasswordService from '@/external/security/hash/HashService'
import JwtService from '@/external/security/jwt/JwtService'
import { expirationTime } from '@/constants'
import { UpdateAdmin } from '@/core/admin/services/UpdateAdmin'
import { getSecretKey } from '@/utils'

export async function POST(req: Request) {
    try {
        await connect()

        const SECRET_KEY = getSecretKey()

        const repositoryAdminMongo = new RepositoryAdminMongo()
        const passwordHashService = new PasswordService()
        const jwtService = new JwtService(SECRET_KEY, expirationTime, 'HS256')

        const getAdminByEmail = new GetAdminByEmail(repositoryAdminMongo)
        const updateAdmin = new UpdateAdmin(repositoryAdminMongo)

        const body = await req.json()

        const { accessCode, email, password }: Admin = body

        const admin = await getAdminByEmail.exec(email)

        if (!admin) {
            return NextResponse.json({
                error: true,
                status: HttpStatusCode.NOT_FOUND,
                message: 'Credentials Invalid!',
            })
        }

        const validAccessCode = await passwordHashService.comparePassword(accessCode, admin.accessCode)
        const validPassword = await passwordHashService.comparePassword(password, admin.password)

        if (!validPassword || !validAccessCode) {
            return NextResponse.json({
                error: true,
                status: 401,
                message: 'Credentials Invalid!',
            })
        }

        const token = await jwtService.createToken()

        const adminUpdated = await updateAdmin.exec({ adminId: admin._id ?? '', updateFields: { token } })

        if (!adminUpdated) {
            return NextResponse.json({
                message: `Error!`,
                error: true,
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                data: null,
            })
        }

        // const token = await new jose.SignJWT({})
        //     .setProtectedHeader({ alg: 'HS256' })
        //     .setIssuedAt()
        //     .setExpirationTime(expirationTime)
        //     .sign(new TextEncoder().encode(SECRET_KEY))

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
                status: HttpStatusCode.OK,
            },
            { headers: { 'Set-Cookie': `${cookiesValue}` } },
        )
    } catch (error) {
        return NextResponse.json({
            message: `Error: ${error}`,
            error: true,
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        })
    }
}
