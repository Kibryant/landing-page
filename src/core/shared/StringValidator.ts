// shared/RichStringValidator.ts

export default class StringValidator {
    private readonly _input: string

    constructor(input: string) {
        this._input = input
        this.validate()
    }

    private validate(): void {
        if (this._input.length <= 2) {
            throw new Error('The string must have more than 2 letters.')
        }

        const specialCharactersRegex = /^[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]*$/
        if (specialCharactersRegex.test(this._input)) {
            throw new Error('The string cannot consist only of special characters.')
        }
    }

    get input(): string {
        return this._input
    }
}
