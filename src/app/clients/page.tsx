import { Section } from '@/components/Section'
import { UserProps } from '@/types/UserProps'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Client() {
    const userCookies = cookies().get('client-system')

    if (typeof userCookies === 'undefined') {
        redirect('/accounts/sign-up?origin=dashboard')
    }

    const user: UserProps = JSON.parse(userCookies.value)

    return (
        <>
            <Section>
                <h1 className="text-black">Hi Clients!</h1>
                <h3 className="text-gray-700">
                    <Link href={`clients/${user?.username}`}>Go to your Area Client!</Link>
                </h3>
            </Section>
        </>
    )
}
