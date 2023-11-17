'use client'

import { Header } from '@/components/Clients/Header'
import { getUserLocalStorage } from '@/utils'
import { useRouter } from 'next/navigation'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const user = getUserLocalStorage()
    const router = useRouter()

    if (!user) {
        router.push('/accounts/sign-in')
        return
    }

    return (
        <div className="flex">
            <Header username={user.username} />
            <main className="flex flex-col w-full">
                <div className="w-full p-2 border-b-2">
                    <p className="text-xl text-primary font-bold">Hi, {user.username}!</p>
                </div>
                <div className="px-5">{children}</div>
            </main>
        </div>
    )
}
