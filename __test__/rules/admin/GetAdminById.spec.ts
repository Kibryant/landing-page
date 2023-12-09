import { GetAdminById } from '@/core/admin/services/GetAdminById'
import RepositoryAdminMemory from '@/external/memory/RepositoryAdminMemory'

describe('GetAdminById', () => {
    it('should get an admin by id', async () => {
        const adminRepository = new RepositoryAdminMemory()
        const getAdminById = new GetAdminById(adminRepository)
        const admin = await getAdminById.exec('123456789')
        expect(admin).not.toBeNull()
        expect(admin?._id).toBe('123456789')
    })
    it('should return null', async () => {
        const adminRepository = new RepositoryAdminMemory()
        const getAdminById = new GetAdminById(adminRepository)
        const invalidId = '23890128904829084908912934-12931-30=1231'
        const invalidAdmin = await getAdminById.exec(invalidId)
        expect(invalidAdmin).toBeNull()
    })
})
