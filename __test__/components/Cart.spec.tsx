import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProductsList } from '@/components/ProductsList'
import { CartContext } from '@/contexts/Cart/CartContext'
import userEvent from '@testing-library/user-event'
import Product from '@/core/product/entity/Product'

const product = new Product({
    name: 'Sample Product',
    description: 'Sample Description',
    price: '100',
    category: 'Sample Category',
    myProductId: 'myProductId',
})

const useCart = {
    cart: {
        product: [product],
        totalCartQuantity: 0,
        totalCartPrice: 0,
    },
    addProductToCart: jest.fn(),
    removeProductToCart: jest.fn(),
}

const sampleProducts: Product[] = [product]

describe('Products List', () => {
    beforeEach(() => {
        render(
            <CartContext.Provider value={useCart}>
                <ProductsList products={sampleProducts} />
            </CartContext.Provider>,
        )
    })

    it('It should render Products List!', () => {
        const productElements = screen.getByText('Sample Product')
        expect(productElements).toBeDefined()
    })

    it('Should be able to add new product to the list', async () => {
        const addToCartButton = screen.getByTestId('add-to-cart')
        await userEvent.click(addToCartButton)
        expect(useCart.addProductToCart).toHaveBeenCalledWith(sampleProducts[0])
    })

    describe('end-to-end', () => {
        it('Should be able to remove the product', async () => {
            const addToCartButton = screen.getByTestId('add-to-cart')
            await userEvent.click(addToCartButton)
            const removeFromCartButton = screen.getByTestId('remove-from-cart')
            await userEvent.click(removeFromCartButton)
            expect(useCart.removeProductToCart).toHaveBeenCalledWith(sampleProducts[0])
        })
    })
})
