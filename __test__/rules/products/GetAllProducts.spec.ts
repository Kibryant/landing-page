import { GetAllProducts } from '@/core/product/services/GetAllProducts'
import RepositoryProductsMemory from '@/external/memory/RepositoryProductsMemory'

const productsRepository = new RepositoryProductsMemory()
const getAllProducts = new GetAllProducts(productsRepository)

describe('RepositoryProductsMemory', () => {
    it('should return a list of products', async () => {
        const productList = await getAllProducts.exec()

        expect(productList).toBeDefined()
        expect(productList?.length).toBeGreaterThan(0)
    })
})
