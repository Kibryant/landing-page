export default interface Admin {
    id?: string
    token?: string
    accessCode: string
    email: string
    password: string
    createdAt?: Date
    updatedAt?: Date
}
