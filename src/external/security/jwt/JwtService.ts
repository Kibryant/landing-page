import * as jose from 'jose'

export default class JwtService {
    private readonly SECRET_KEY: string
    private readonly expirationTime: number
    private readonly ALG: string

    constructor(SECRET_KEY: string, expirationTime: number, ALG: string) {
        if (!SECRET_KEY) {
            throw new Error('Secret key must be provided')
        }
        this.SECRET_KEY = SECRET_KEY

        if (!expirationTime || expirationTime <= 0) {
            throw new Error('Expiration time must be provided')
        }
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
            return verified.payload
        } catch (error) {
            if (error instanceof jose.errors.JWTExpired) {
                return null
            } else if (error instanceof jose.errors.JWTInvalid) {
                return null
            }

            throw error
        }
    }
}
