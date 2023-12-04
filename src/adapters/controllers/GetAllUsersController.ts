/* eslint-disable prettier/prettier */
import { GetAllUsers } from '@/core/user/services/GetAllUsers'
import { Axios } from 'axios'

export default class GetAllUsersController {
    constructor(
        private readonly server: Axios,
        private readonly useCase: GetAllUsers,
    ) { }

    async handle() {
        const users = await this.useCase.exec()
        const { data } = await this.server.get('/users')
        return { users, data }
    }
}
