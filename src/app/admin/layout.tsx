import { Header } from '@/components/Admin/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Landing Page | ADM',
}

export default function AdmLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <footer></footer>
        </>
    )
}
