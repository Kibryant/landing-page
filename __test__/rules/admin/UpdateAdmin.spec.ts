import { UpdateAdmin } from '@/core/admin/services/UpdateAdmin'
import RepositoryAdminMemory from '@/external/memory/RepositoryAdminMemory'

describe('UpdateAdmin', () => {
    it('should update an admin', async () => {
        const adminRepository = new RepositoryAdminMemory()
        const updateAdmin = new UpdateAdmin(adminRepository)

        const admin = await updateAdmin.exec({
            adminId: '123456789',
            updateFields: {
                email: 'newEmailAdmin@gmail.com',
                password: 'newPassword',
            },
        })

        expect(admin).not.toBeNull()
        expect(admin?._id).toBe('123456789')
        expect(admin?.accessCode).toBe('987654321')
        expect(admin?.email).toBe('newEmailAdmin@gmail.com')
        expect(admin?.password).toBe('newPassword')
    })
    it('should return null', async () => {
        const adminRepository = new RepositoryAdminMemory()
        const updateAdmin = new UpdateAdmin(adminRepository)

        const admin = await updateAdmin.exec({
            adminId: 'blablalblalblabvl',
            updateFields: {
                email: 'blblalblaslb@gmail.com',
                password: 'blblalblaslb',
            },
        })

        expect(admin).toBeNull()
    })

    it('should just change accessCode', async () => {
        const adminRepository = new RepositoryAdminMemory()
        const updateAdmin = new UpdateAdmin(adminRepository)

        const admin = await updateAdmin.exec({
            adminId: '123456789',
            updateFields: {
                accessCode: 'newAccessCode',
            },
        })

        expect(admin).not.toBeNull()
        expect(admin?._id).toBe('123456789')
        expect(admin?.accessCode).toBe('newAccessCode')
        expect(admin?.email).toBe('admin@gmail.com')
        expect(admin?.password).toBe('secret')
    })
})
