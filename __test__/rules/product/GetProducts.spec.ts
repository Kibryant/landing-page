import CreateNewProduct from '@/core/product/services/CreateNewProduct'
import GetProducts from '@/core/product/services/GetProducts'
import RepositoryProductsMemory from '@/external/memory/RepositoryProductsMemory'

describe('Get Products', () => {
    it('should get all products', async () => {
        const productRepository = new RepositoryProductsMemory()
        const getProducts = new GetProducts(productRepository)
        const createNewProduct = new CreateNewProduct(productRepository)

        await createNewProduct.exec({
            description: 'Product description 1',
            name: 'Product name 1',
            price: '10',
        })
        await createNewProduct.exec({
            description: 'Product description 2',
            name: 'Product name 2',
            price: '10',
        })
        await createNewProduct.exec({
            description: 'Product description 3',
            name: 'Product name 3',
            price: '10',
        })

        const products = await getProducts.exec()

        expect(products?.length).toBe(3)
    })

    it('should return null if there is no product', async () => {
        const productRepository = new RepositoryProductsMemory()
        const getProducts = new GetProducts(productRepository)
        const products = await getProducts.exec()

        expect(products).toEqual(null)
    })
})
