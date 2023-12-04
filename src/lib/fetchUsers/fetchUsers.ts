import User from '@/core/user/entity/User'

export default async function fetchUsers(): Promise<User[]> {
    try {
        const response = await fetch('/api/users')
        const users: User[] = await response.json()
        return users
    } catch (error) {
        if (error instanceof Error) console.error(error.message)
        return []
    }
}
