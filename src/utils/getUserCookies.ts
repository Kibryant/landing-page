import User from '@/core/user/entity/User'
import { cookies } from 'next/headers'

const getUserCookies = () => {
    const cookiesNext = cookies()
    const user = cookiesNext.get('client-system')?.value

    if (user === undefined) {
        return null
    }

    return JSON.parse(user) as User
}

export { getUserCookies }
