import CreateNewProduct from '@/core/product/services/CreateNewProduct'
import GetProductByName from '@/core/product/services/GetProductByName'
import RepositoryProductsMemory from '@/external/memory/RepositoryProductsMemory'

describe('Get Product By Name', () => {
    it('should get product by name', async () => {
        const productRepository = new RepositoryProductsMemory()
        const getProductByName = new GetProductByName(productRepository)
        const createNewProduct = new CreateNewProduct(productRepository)
        await createNewProduct.exec({
            description: 'Product description 1',
            name: 'Product name 1',
            price: '10',
            category: 'Category 1',
            myProductId: 'my-product-id-1',
        })
        await createNewProduct.exec({
            description: 'Product description 2',
            name: 'Product name 2',
            price: '10',
            category: 'Category 1',
            myProductId: 'my-product-id-2',
        })
        await createNewProduct.exec({
            description: 'Product description 3',
            name: 'Product name 3',
            price: '10',
            category: 'Category 1',
            myProductId: 'my-product-id-3',
        })

        const product = await getProductByName.exec('Product name 2')
        expect(product).toBeTruthy()
        expect(product?.name).toEqual('Product name 2')
        expect(product?.description).toEqual('Product description 2')
        expect(product?.price).toEqual('10')
    })
    it('should return null if there is no product', async () => {
        const productRepository = new RepositoryProductsMemory()
        const getProductByName = new GetProductByName(productRepository)
        const product = await getProductByName.exec('Product name 2')
        expect(product).toEqual(null)
    })
})
