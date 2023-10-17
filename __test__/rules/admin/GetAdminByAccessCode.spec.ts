import { GetAdminByAccessCode } from '@/core/admin/services/GetAdminByAccessCode'
import RepositoryAdminMemory from '@/external/memory/RepositoryAdminMemory'

describe('getAdminByAccessCode', () => {
    it('should get an admin by accessCode', async () => {
        const adminRepository = new RepositoryAdminMemory()
        const getAdminByAccessCode = new GetAdminByAccessCode(adminRepository)

        const accessCode = '987654321'
        const admin = await getAdminByAccessCode.exec(accessCode)

        expect(admin).not.toBeNull()
        expect(admin?.accessCode).toBe(accessCode)
    })

    it('should return null', async () => {
        const adminRepository = new RepositoryAdminMemory()
        const getAdminByAccessCode = new GetAdminByAccessCode(adminRepository)
        const invalidAccessCode = '23890128904829084908912934-12931-30=1231'
        const invalidAdmin = await getAdminByAccessCode.exec(invalidAccessCode)

        expect(invalidAdmin).toBeNull()
    })
})
