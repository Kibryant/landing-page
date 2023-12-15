'use client'

import { CartProvider } from '@/contexts/Cart/CartContext'
import './globals.css'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import AuthProvider from '@/components/Providers/authProvider'

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${poppins.className} min-h-screen antialiased overflow-x-hidden`}>
                <AuthProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <CartProvider>{children}</CartProvider>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
