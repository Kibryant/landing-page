import User from '@/core/user/entity/User'

export interface FriendOperationResult {
    success: boolean
    friend?: User
    error?: string
}
