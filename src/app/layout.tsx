import './globals.css'
import { Poppins } from 'next/font/google'
import { Providers } from '@/components/Providers'

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${poppins.className} min-h-screen antialiased overflow-x-hidden`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
