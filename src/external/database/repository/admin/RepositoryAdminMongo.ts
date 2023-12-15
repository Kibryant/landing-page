import Admin from '@/core/admin/model/Admin'
import AdminModel from '../../models/admin/Adm'
import { AdminRepository } from '@/core/admin/services/repository'

interface UpdateFieldsProps {
    email?: string
    password?: string
}

export class RepositoryAdminMongo extends AdminRepository {
    async getAdminById(adminId: string): Promise<Admin | null> {
        return (await AdminModel.findOne({ _id: adminId })) ?? null
    }

    async getAdminByAccessCode(accessCode: string): Promise<Admin | null> {
        return (await AdminModel.findOne({ accessCode })) ?? null
    }

    async updateAdmin(adminId: string, updatedFields: UpdateFieldsProps): Promise<Admin | null> {
        return (await AdminModel.findByIdAndUpdate(adminId, updatedFields, { new: true })) ?? null
    }

    async getAdminByEmail(email: string) {
        return (await AdminModel.findOne({ email })) ?? null
    }
}
