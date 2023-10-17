import UseCases from '@/core/shared/UseCases'
import { AdminRepository } from './repository'
import Admin from '../model/Admin'

interface UpdateAdminProps {
    adminId: string
    updateFields: {
        token?: string
        email?: string
        password?: string
    }
}

export class UpdateAdmin implements UseCases<UpdateAdminProps, Promise<Admin | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private adminRepository: AdminRepository) { }
    async exec({ adminId, updateFields }: UpdateAdminProps): Promise<Admin | null> {
        const updatedUser = await this.adminRepository.updateAdmin(adminId, updateFields)

        if (!updatedUser) {
            return null
        }

        return updatedUser
    }
}
