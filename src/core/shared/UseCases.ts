export default interface UseCases<Input, Output> {
    exec(input: Input): Promise<Output> | Output
}
