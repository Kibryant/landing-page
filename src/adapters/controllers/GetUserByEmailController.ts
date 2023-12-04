/* eslint-disable prettier/prettier */
import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
import { Axios } from 'axios'

export default class GetUserByEmailController {
    constructor(
        private readonly server: Axios,
        private readonly useCase: GetUserByEmail,
    ) { }

    async handle(email: string) {
        const user = await this.useCase.exec(email)
        const { data } = await this.server.get('/user', { params: { email } })
        return { user, data }
    }
}
