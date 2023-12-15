// shared/RichStringValidator.ts

export default class StringValidator {
    private readonly _input: string
    private readonly _attribute: string

    constructor(input: string, attribute?: string) {
        this._input = input
        this._attribute = attribute ?? 'string'
        this.validate()
    }

    private validate(): void {
        if (this._input.length <= 2) {
            throw new Error(`The ${this._attribute} must have more than 2 letters.`)
        }

        const specialCharactersRegex = /^[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]*$/
        if (specialCharactersRegex.test(this._input)) {
            throw new Error(`The ${this._attribute} cannot consist only of special characters.`)
        }
    }

    get input(): string {
        return this._input
    }
}
