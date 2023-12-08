import Admin from '@/core/admin/model/Admin'

describe('Admin', () => {
    it('should be able to create a Admin', () => {
        const admin = new Admin('123456', 'admin@gmail.com', '123456')

        expect(admin).toHaveProperty('accessCode')
        expect(admin).toHaveProperty('email')
        expect(admin).toHaveProperty('password')
    })
})
