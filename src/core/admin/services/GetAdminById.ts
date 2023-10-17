import UseCases from '@/core/shared/UseCases'
import { AdminRepository } from './repository'
import Admin from '../model/Admin'

export class GetAdminById implements UseCases<string, Promise<Admin | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private adminRepository: AdminRepository) { }
    async exec(id: string): Promise<Admin | null> {
        const admin = await this.adminRepository.getAdminById(id)

        if (!admin) {
            return null
        }

        return admin
    }
}
