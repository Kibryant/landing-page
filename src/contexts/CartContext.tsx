/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import { ProductSchemaProps } from '@/schemas/productSchema'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface CartProviderProps {
    children: React.ReactNode
}

interface CartItems {
    product: ProductSchemaProps
    quantity: number
}

interface CartContextProps {
    cart: CartItems[]
    addToCart: (product: ProductSchemaProps) => void
    removeFromCart: (productId: string) => void
}

const CartContext = createContext<CartContextProps>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
})

const useCart = () => {
    return useContext(CartContext)
}

const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartItems[] | []>([])
    const notify = (msg: string) => toast.error(msg)
    const notifySucess = (msg: string) => toast.success(msg)

    useEffect(() => {
        const savedCart = window.localStorage.getItem('cart')

        if (savedCart) {
            setCart(JSON.parse(savedCart))
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: ProductSchemaProps) => {
        const existingItem = cart.find((item) => item.product.id === product.id)

        if (existingItem) {
            const updateCart = cart.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            )

            notifySucess('Quantity of product incremented!')
            setCart(updateCart)
            return
        }
        notifySucess('Product added to cart!')
        setCart([...cart, { product, quantity: 1 }])
    }

    const removeFromCart = (productId: string) => {
        const updateCart = cart.filter((item) => item.product.id !== productId)
        notify(`Product removed from cart!`)
        setCart(updateCart)
    }

    return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>
}

export { useCart, CartProvider }
