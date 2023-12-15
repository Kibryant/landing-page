import { Admin } from '@/components/Admin'
import { cookies } from 'next/headers'
import SignInAdmPage from '../sign-in-adm/page'

export default function Page() {
    const cookiesNext = cookies()

    const authToken = cookiesNext.get('auth_token')

    if (!authToken) {
        return <SignInAdmPage />
    }

    return <Admin />
}
