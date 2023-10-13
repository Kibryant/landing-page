import { Header } from '@/components/Clients/Header'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'CLIENT',
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const userCookies = cookies().get('client-system')
    const nextAuthCookies = cookies().get('next-auth.session-token')

    if (typeof userCookies === 'undefined') {
        redirect('/accounts/sign-in?origin=dashboard')
    }

    return (
        <div className="flex">
            <Header />
            <main className="flex flex-col w-full">
                <div className="w-full p-2 border-b-2">
                    <p>Clients</p>
                </div>
                <div className="px-5">{children}</div>
            </main>
        </div>
    )
}
