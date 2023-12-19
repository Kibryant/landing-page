import type { Metadata } from 'next'
import Header from '@/components/Header'

export const metadata: Metadata = {
    title: 'CLIENT',
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header showContent={false} isAdm={false} />
            <main>{children}</main>
        </>
    )
}
