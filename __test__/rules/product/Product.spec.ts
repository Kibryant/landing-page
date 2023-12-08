import Product from '@/core/product/entity/Product'

describe('Product', () => {
    it('should be able to create a product', () => {
        const product = new Product({
            name: 'product',
            description: 'description',
            price: 'price',
        })

        expect(product).toBeInstanceOf(Product)
        expect(product.name).toBe('product')
        expect(product.description).toBe('description')
        expect(product.price).toBe('price')
        expect(product.id).toBeDefined()
    })

    it('should be able to create a product with id', () => {
        const product = new Product(
            {
                name: 'product',
                description: 'description',
                price: 'price',
            },
            '1234',
        )

        expect(product).toBeInstanceOf(Product)
        expect(product.name).toBe('product')
        expect(product.description).toBe('description')
        expect(product.price).toBe('price')
        expect(product.id).toBe('1234')
    })

    it('should be able to create a product with id', () => {
        const product = Product.create(
            {
                name: 'product',
                description: 'description',
                price: 'price',
            },
            '1234',
        )

        expect(product).toBeInstanceOf(Product)
        expect(product.name).toBe('product')
        expect(product.description).toBe('description')
        expect(product.price).toBe('price')
        expect(product.id).toBe('1234')
    })
})
