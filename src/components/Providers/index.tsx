'use client'

import { CartProvider } from '@/contexts/Cart/CartContext'
import { ThemeProvider } from 'next-themes'
import AuthProvider from './authProvider'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert'
import { useState, useEffect } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [showAlert, setShowAlert] = useState(false)
    const [client] = useState(new QueryClient())

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > 100) {
                setShowAlert(true)
            } else {
                setShowAlert(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <QueryClientProvider client={client}>
            <AuthProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <CartProvider>{children}</CartProvider>
                </ThemeProvider>

                {showAlert && (
                    <Alert className="fixed bottom-2 right-2 max-w-sm alert">
                        <RocketLaunchIcon className="h-4 w-4" />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            You can add components and dependencies to your app using the cli.
                        </AlertDescription>
                    </Alert>
                )}
            </AuthProvider>
        </QueryClientProvider>
    )
}

export { Providers }
