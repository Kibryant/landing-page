import { cookies } from 'next/headers'

const getUserSessionToken = () => {
    const cookiesNext = cookies()
    const userToken = cookiesNext.get('client-session-token')?.value

    if (userToken === undefined) {
        return null
    }

    return userToken
}

export { getUserSessionToken }
