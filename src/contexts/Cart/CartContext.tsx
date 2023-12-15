/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
'use client'

import { createContext, useContext } from 'react'
import { useCartContext } from './useCartContext'
import Product from '@/core/product/entity/Product'

interface CartProviderProps {
    children: React.ReactNode
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

export const CartContext = createContext<CartContextProps>({} as CartContextProps)

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
