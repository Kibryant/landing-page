'use client'

import { CartProvider } from '@/contexts/CartContext'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Providers from '@/components/Providers/trcpProvider'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
    title: 'My Landing Page',
    description: 'My first Landing Page! FULLSTACK',
}

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Providers>
                <body className={`${poppins.className} min-h-screen antialiased overflow-x-hidden`}>
                    <SessionProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                            <CartProvider>{children}</CartProvider>
                        </ThemeProvider>
                    </SessionProvider>
                </body>
            </Providers>
        </html>
    )
}
