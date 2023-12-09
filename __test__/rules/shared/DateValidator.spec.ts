import DateValidator from '@/core/shared/DateValidator'

describe('DateValidator', () => {
    it('Must return true when date is valid', () => {
        const date = new Date()
        const dateValidator = new DateValidator(date)

        const response = dateValidator.itsValid()

        expect(response).toBe(true)
    })

    it('Must return false when date is invalid', () => {
        const date = new Date('invalid date')
        const dateValidator = new DateValidator(date)

        const response = dateValidator.itsValid()

        expect(response).toBe(false)
    })

    it('Must return true when date is valid', () => {
        const date = new Date()
        const response = DateValidator.itsValid(date)

        expect(response).toBe(true)
    })

    it('Must return false when date is invalid', () => {
        const date = new Date('invalid date')
        const response = DateValidator.itsValid(date)

        expect(response).toBe(false)
    })
})
