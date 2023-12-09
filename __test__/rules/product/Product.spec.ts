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
        expect(product.createdAt).toBeInstanceOf(Date)
        expect(product.updatedAt).toBeInstanceOf(Date)
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

    it('should not be able to create a product with name.length < 3', () => {
        expect(() => {
            // eslint-disable-next-line no-new
            new Product({
                name: 'pr',
                description: 'description',
                price: 'price',
            })
        }).toThrowError('The string must have more than 2 letters')
    })

    it('should not be able to create a product with description.length < 3', () => {
        expect(() => {
            // eslint-disable-next-line no-new
            new Product({
                name: 'product',
                description: 'de',
                price: 'price',
            })
        }).toThrowError('The string must have more than 2 letters')
    })
})
