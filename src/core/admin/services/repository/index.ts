import { UpdateAdminDto } from '../../dtos/UpdateAdminDto'
import Admin from '../../model/Admin'

export abstract class AdminRepository {
    abstract getAdminById(adminId: string): Promise<Admin | null>
    abstract getAdminByEmail(email: string): Promise<Admin | null>
    abstract getAdminByAccessCode(accessCode: string): Promise<Admin | null>
    abstract updateAdmin(adminId: string, updatedFields: UpdateAdminDto): Promise<Admin | null>
}
