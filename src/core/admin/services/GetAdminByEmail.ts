import UseCase from '@/core/shared/UseCase'
import { AdminRepository } from './repository'
import Admin from '../model/Admin'

export class GetAdminByEmail implements UseCase<string, Promise<Admin | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private adminRepository: AdminRepository) { }
    async exec(email: string): Promise<Admin | null> {
        const admin = await this.adminRepository.getAdminByEmail(email)

        if (!admin) {
            return null
        }

        return admin
    }
}
