'use client'

import { Header } from '@/components/Clients/Header'
import { capitalizeFirstLetter, getUserLocalStorage } from '@/utils'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '@/components/DropdownTheme'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRightFromLineIcon } from 'lucide-react'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const user = getUserLocalStorage()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/accounts/sign-in')
        }
    }, [router, user])

    return (
        <div className="flex">
            <Header username={user?.username ?? ''} />
            <main className="flex flex-col w-full">
                <div className="w-full flex items-center justify-between p-2 border-b-2 border-b-secondary">
                    <p className="text-xl text-secondary-foreground font-bold">
                        Hi, {capitalizeFirstLetter(user?.username ?? '')}!
                    </p>
                    <div className="flex gap-x-3">
                        <Button className="text-primary-foreground font-bold ms-4">
                            <ArrowRightFromLineIcon size={20} />
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
                <div className="px-5">{children}</div>
            </main>
        </div>
    )
}
