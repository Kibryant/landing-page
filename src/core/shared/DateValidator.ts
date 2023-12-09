export default class DateValidator {
    private readonly _input: Date

    constructor(input: Date) {
        this._input = input
    }

    static itsValid(input: Date): boolean {
        return new DateValidator(input).itsValid()
    }

    itsValid(): boolean {
        return this._input.toString() !== 'Invalid Date'
    }

    get input(): Date {
        return this._input
    }

    get inputAsString(): string {
        return this._input.toString()
    }
}
