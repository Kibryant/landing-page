import UseCases from '@/core/shared/UseCases'
import { AdminRepository } from './repository'
import Admin from '../model/Admin'

export class GetAdminByAccessCode implements UseCases<string, Promise<Admin | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private adminRepository: AdminRepository) { }
    async exec(accesCode: string): Promise<Admin | null> {
        const admin = await this.adminRepository.getAdminByAccessCode(accesCode)

        if (!admin) {
            return null
        }

        return admin
    }
}
