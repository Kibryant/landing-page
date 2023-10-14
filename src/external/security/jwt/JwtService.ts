import * as jose from 'jose'

interface AdminJwtPayload {
    jti?: string
    iat?: string
}

export default class JwtService {
    private readonly SECRET_KEY: string
    private readonly expirationTime: number
    private readonly ALG: string

    constructor(SECRET_KEY: string, expirationTime: number, ALG: string) {
        this.SECRET_KEY = SECRET_KEY
        this.expirationTime = expirationTime
        this.ALG = ALG
    }

    async createToken(): Promise<string> {
        const token = await new jose.SignJWT({})
            .setProtectedHeader({ alg: this.ALG })
            .setIssuedAt()
            .setExpirationTime(this.expirationTime)
            .sign(new TextEncoder().encode(this.SECRET_KEY))

        return token
    }

    async verifyToken(token: string) {
        try {
            const verified = await jose.jwtVerify(token, new TextEncoder().encode(this.SECRET_KEY))
            return verified.payload as AdminJwtPayload
        } catch (error) {
            throw new Error(`Your Jwt has expired ${error}`)
        }
    }
}
