import UseCase from '@/core/shared/UseCase'
import { AdminRepository } from './repository'
import Admin from '../model/Admin'
import { UpdateAdminDto } from '../dtos/UpdateAdminDto'

interface UpdateAdminProps {
    adminId: string
    updateFields: UpdateAdminDto
}

export class UpdateAdmin implements UseCase<UpdateAdminProps, Promise<Admin | null>> {
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
