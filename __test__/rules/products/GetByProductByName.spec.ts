import { GetProductByName } from '@/core/products/services/GetProductByName'
import RepositoryProductsMemory from '@/external/memory/RepositoryProductsMemory'

const productsRepository = new RepositoryProductsMemory()
const getProductByName = new GetProductByName(productsRepository)

describe('RepositoryProductsMemory', () => {
    it('must return a product', async () => {
        const product = await getProductByName.exec('Product 1')

        expect(product).toBeDefined()
    })
})
