import EmailValidator from '@/core/shared/EmailValidator'

describe('EmailValidator', () => {
    it('Must return true when email is valid', () => {
        const email = 'emailvalid@gmail.com'
        const isValid = EmailValidator.itsValid(email)

        expect(isValid).toBeTruthy()
    })

    it('Must return false when email is invalid', () => {
        const email = 'emailinvalid'
        const isValid = EmailValidator.itsValid(email)

        expect(isValid).toBeFalsy()
    })

    it('Must return false when email is null', () => {
        const email = null as unknown as string
        const isValid = EmailValidator.itsValid(email)

        expect(isValid).toBeFalsy()
    })
})
