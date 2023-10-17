import { GetAdminByEmail } from '@/core/admin/services/GetAdminByEmail'
import RepositoryAdminMemory from '@/external/memory/RepositoryAdminMemory'

describe('GetAdminByEmail', () => {
    it('should get an admin by email', async () => {
        const adminRepository = new RepositoryAdminMemory()
        const getAdminByEmail = new GetAdminByEmail(adminRepository)

        const email = 'admin@gmail.com'
        const admin = await getAdminByEmail.exec(email)

        expect(admin).not.toBeNull()
        expect(admin?.email).toBe(email)
    })

    it('should return null', async () => {
        const adminRepository = new RepositoryAdminMemory()
        const getAdminByEmail = new GetAdminByEmail(adminRepository)
        const invalidEmail = 'invalid@gmail.com'
        const invalidAdmin = await getAdminByEmail.exec(invalidEmail)

        expect(invalidAdmin).toBeNull()
    })
})
