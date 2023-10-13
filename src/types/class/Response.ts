export class Response<T> {
    constructor(
        public data: T | null = null,
        public message: string = '',
        public status: number = 200, // eslint-disable-next-line prettier/prettier
    ) { }
}
