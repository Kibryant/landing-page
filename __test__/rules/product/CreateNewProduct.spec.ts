import CreateNewProduct from '@/core/product/services/CreateNewProduct'
import RepositoryProductsMemory from '@/external/memory/RepositoryProductsMemory'

describe('CreateNewProduct', () => {
    it('should be able to create a new product', async () => {
        const productsRepository = new RepositoryProductsMemory()
        const createProduct = new CreateNewProduct(productsRepository)

        const product = await createProduct.exec({
            name: 'My Product 1',
            description: 'Description 1',
            price: '10.00',
            myProductId: 'my-product-id',
            category: 'Category 1',
        })

        expect(product).toHaveProperty('id')
        expect(product).toHaveProperty('name', 'My Product 1')
        expect(product).toHaveProperty('description', 'Description 1')
        expect(product).toHaveProperty('price', '10.00')
        expect(product).toHaveProperty('createdAt')
        expect(product).toHaveProperty('updatedAt')
    })

    it('should not be able to create a new product with the same name', async () => {
        const productsRepository = new RepositoryProductsMemory()
        const createProduct = new CreateNewProduct(productsRepository)

        const product1 = await createProduct.exec({
            name: 'Product 1',
            description: 'Description 1',
            price: '10.00',
            category: 'Category 1',
            myProductId: 'my-product-id',
        })

        const product2 = await createProduct.exec({
            name: 'Product 1',
            description: 'Description 1',
            price: '10.00',
            category: 'Category 1',
            myProductId: 'my-product-id',
        })

        expect(product1).toHaveProperty('id')
        expect(product2).toBeNull()
    })
})
