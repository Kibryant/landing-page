'use client'

import { Header } from '@/components/Clients/Header'
import { capitalizeFirstLetter, getUserLocalStorage } from '@/utils'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '@/components/DropdownTheme'

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
                <div className="w-full flex items-center justify-between p-2 border-b-2 border-b-secondary">
                    <p className="text-xl text-secondary-foreground font-bold">
                        Hi, {capitalizeFirstLetter(user.username)}!
                    </p>
                    <ModeToggle />
                </div>
                <div className="px-5">{children}</div>
            </main>
        </div>
    )
}
