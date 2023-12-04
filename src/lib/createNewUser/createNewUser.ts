import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import User from '@/core/user/entity/User'

export default async function createNewUser({ email, password, username, tasks }: CreateUserDto): Promise<User | null> {
    const res = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            username,
            tasks,
        }),
    })
    if (!res.ok) throw Error('Error creating new user')
    const user: User = await res.json()
    return user
}
