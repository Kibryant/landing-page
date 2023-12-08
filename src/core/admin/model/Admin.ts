// export default interface Admin {
//     id?: string
//     token?: string
//     accessCode: string
//     email: string
//     password: string
//     createdAt?: Date
//     updatedAt?: Date
// }

export default class Admin {
    _id?: string
    token?: string
    accessCode: string
    email: string
    password: string
    createdAt?: Date
    updatedAt?: Date

    constructor(accessCode: string, email: string, password: string) {
        this.accessCode = accessCode
        this.email = email
        this.password = password
    }
}
