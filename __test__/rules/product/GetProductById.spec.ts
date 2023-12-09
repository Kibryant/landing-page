import CreateNewProduct from '@/core/product/services/CreateNewProduct'
import GetProductById from '@/core/product/services/GetProductById'
import RepositoryProductsMemory from '@/external/memory/RepositoryProductsMemory'

describe('Get Product By Id', () => {
    it('should get a product by id', async () => {
        const productsRepository = new RepositoryProductsMemory()
        const createProduct = new CreateNewProduct(productsRepository)
        const getProductById = new GetProductById(productsRepository)
        const product = await createProduct.exec({
            name: 'My Product 1',
            description: 'Description 1',
            price: '10.00',
        })
        const productFound = await getProductById.exec(product?.id as string)
        expect(productFound).toHaveProperty('id')
        expect(productFound).toHaveProperty('name', 'My Product 1')
        expect(productFound).toHaveProperty('description', 'Description 1')
        expect(productFound).toHaveProperty('price', '10.00')
        expect(productFound).toHaveProperty('createdAt')
        expect(productFound).toHaveProperty('updatedAt')
    })
    it('should not get a product by id if it does not exist', async () => {
        const productsRepository = new RepositoryProductsMemory()
        const getProductById = new GetProductById(productsRepository)
        const productFound = await getProductById.exec('non-existing-product-id')
        expect(productFound).toEqual(null)
    })
})
