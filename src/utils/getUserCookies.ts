import User from '@/core/user/entity/User'
import { cookies } from 'next/headers'

const getUserCookies = () => {
    const cookiesNext = cookies()
    const data = cookiesNext.get('client-system')?.value

    if (data === undefined) {
        return null
    }

    return JSON.parse(data).data as User
}

export { getUserCookies }
