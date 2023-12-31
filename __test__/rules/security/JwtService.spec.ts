/**
 * @jest-environment node
 */

import JwtService from '@/external/security/jwt/JwtService'

describe('JwtService', () => {
    const SECRET_KEY =
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NzI0MDMwMywiaWF0IjoxNjk3MjQwMzAzfQ.kZTzbAHpyi2VJBoS2pJMIi4Mywljgbci3W8likNP__o'
    const EXPIRATION_TIME = Math.floor(Date.now() / 1000) + 5 * 60 * 60
    const ALG = 'HS256'

    it('should create a valid JWT token', async () => {
        const jwtService = new JwtService(SECRET_KEY, EXPIRATION_TIME, ALG)
        const token = await jwtService.createToken()

        expect(token).toBeDefined()
        expect(token).toContain('.')
        expect(token.split('.').length).toBe(3)
    })

    it('should verify a valid JWT token', async () => {
        const jwtService = new JwtService(SECRET_KEY, EXPIRATION_TIME, ALG)
        const token = await jwtService.createToken()

        const payload = await jwtService.verifyToken(token)

        expect(payload).toBeDefined()
        expect(payload.exp).toBeDefined()
        expect(payload.iat).toBeDefined()
    })

    it('should throw an exception when verifying an invalid JWT token', async () => {
        const jwtService = new JwtService(SECRET_KEY, EXPIRATION_TIME, ALG)
        const token = 'invalid_token'

        await expect(jwtService.verifyToken(token)).rejects.toThrow()
    })

    it('should throw an exception when creating a JWT token with invalid secret key', async () => {
        expect(() => {
            new JwtService('', EXPIRATION_TIME, ALG)
        }).toThrowError('Secret key must be provided')
    })

    it('should throw an exception when creating a JWT token with invalid expiration time', async () => {
        expect(() => {
            new JwtService(SECRET_KEY, 0, ALG)
        }).toThrowError('Expiration time must be provided')
    })

    it('should expires in 10 seconds', async () => {
        const jwtService = new JwtService(SECRET_KEY, 10, ALG)
        const token = await jwtService.createToken()

        setTimeout(async () => {
            await expect(jwtService.verifyToken(token)).rejects.toThrow('Token has expired')
        }, 10000)

        // const payload = await jwtService.verifyToken(token)

        // expect(payload).toBeDefined()
        // expect(payload.exp).toBeDefined()
        // expect(payload.iat).toBeDefined()
    })
})
