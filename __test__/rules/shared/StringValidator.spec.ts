/* eslint-disable no-new */
import StringValidator from '@/core/shared/StringValidator'

describe('StringValidator', () => {
    it('should be able to create a string validator', () => {
        const stringValidator = new StringValidator('string')

        expect(stringValidator).toBeInstanceOf(StringValidator)
        expect(stringValidator.input).toBe('string')
    })

    it('should not be able to create a string validator with a string with less than 2 characters', () => {
        expect(() => {
            new StringValidator('s')
        }).toThrowError('The string must have more than 2 letters.')
    })

    it('should not be able to create a string validator with a string with only special characters', () => {
        expect(() => {
            new StringValidator('!@#$%^&*()_+-=[]{};:\'"|,.<>/?')
        }).toThrowError('The string cannot consist only of special characters.')
    })
})
