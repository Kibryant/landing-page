import PasswordService from '@/external/security/PasswordHashService'

describe('PasswordService', () => {
    const passwordService = new PasswordService()

    it('should hash a password', async () => {
        const password = 'myPassword'
        const hashedPassword = await passwordService.hashPassword(password)

        expect(hashedPassword).not.toBeUndefined()
        expect(typeof hashedPassword).toBe('string')
    })

    it('should compare a password with its hash', async () => {
        const password = 'myPassword'
        const hashedPassword = await passwordService.hashPassword(password)

        const isPasswordMatch = await passwordService.comparePassword(password, hashedPassword)
        expect(isPasswordMatch).toBe(true)
    })

    it('should return false for an incorrect password', async () => {
        const correctPassword = 'myPassword'
        const incorrectPassword = 'incorrectPassword'
        const hashedPassword = await passwordService.hashPassword(correctPassword)

        const isPasswordMatch = await passwordService.comparePassword(incorrectPassword, hashedPassword)
        expect(isPasswordMatch).toBe(false)
    })
})
