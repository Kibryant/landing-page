import Admin from '@/core/admin/model/Admin'
import { AdminRepository } from '@/core/admin/services/repository'

export default class RepositoryAdminMemory implements AdminRepository {
    private readonly admin: Admin = {
        id: '123456789',
        accessCode: '987654321',
        email: 'admin@gmail.com',
        password: 'secret',
    }

    async getAdminByEmail(email: string): Promise<Admin | null> {
        const adm = this.admin.email === email ? this.admin : null
        return adm
    }

    async getAdminByAccessCode(accessCode: string): Promise<Admin | null> {
        const adm = this.admin.accessCode === accessCode ? this.admin : null
        return adm
    }

    async getAdminById(adminId: string): Promise<Admin | null> {
        const adm = this.admin.id === adminId ? this.admin : null
        return adm
    }

    async updateAdmin(adminId: string, updatedFields: Record<string, unknown>): Promise<Admin | null> {
        console.log(adminId, updatedFields)

        return null
    }
}
