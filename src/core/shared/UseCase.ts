export default interface UseCase<Input, Output> {
    exec(input: Input): Promise<Output> | Output
}
