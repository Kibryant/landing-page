'use client'

import { usePathname } from 'next/navigation'
import { Complement } from '../Header/Complement'
import { Header } from '@/components/Clients/Header'

interface Props {
    children: React.ReactNode
    username: string
}

const View = ({ children, username }: Props) => {
    const pathname = usePathname()

    if (pathname === '/clients/posts' || pathname.startsWith('/clients/posts/chat')) {
        return <>{children}</>
    }

    return (
        <div className="flex">
            <Header username={username} />
            <main className="flex flex-col h-full max-h-[900px] w-full sm:max-h-none">
                <Complement username={username} />
                <div className="px-5 overflow-auto">{children}</div>
            </main>
        </div>
    )
}

export { View }
