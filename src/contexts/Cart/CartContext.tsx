/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
'use client'

import { createContext, useContext } from 'react'
import { useCartContext } from './useCartContext'

interface CartProviderProps {
    children: React.ReactNode
}

export interface Product {
    id: string
    product: string
    description: string
    price: string
    totalQuantiyOfProduct: number
    totalPriceOfProduct: number
}

export interface Cart {
    product: Product[]
    totalCartQuantity: number
    totalCartPrice: number
}

interface CartContextProps {
    cart: Cart
    addProductToCart: (product: Product) => void
    removeProductToCart: (productToRemove: Product) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
const defaultValues = {
    cart: {
        product: [
            {
                id: "",
                product: "",
                description: "",
                price: "",
                totalQuantiyOfProduct: 0,
                totalPriceOfProduct: 0,
            }
        ],
        totalCartQuantity: 0,
        totalCartPrice: 0
    }, addProductToCart: () => { }, removeProductToCart: () => { }
}

const CartContext = createContext<CartContextProps>(defaultValues)

const useCart = () => {
    return useContext(CartContext)
}

const CartProvider = ({ children }: CartProviderProps) => {

    const { addProductToCart, cart, removeProductToCart } = useCartContext()

    return (
        <CartContext.Provider value={{ cart, addProductToCart, removeProductToCart }}>{children}</CartContext.Provider>
    )
}

export { useCart, CartProvider }
