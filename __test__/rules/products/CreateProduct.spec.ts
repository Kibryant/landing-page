import { CreateNewProduct } from '@/core/products/services/CreateNewProduct'
import RepositoryProductsMemory from '@/external/memory/RepositoryProductsMemory'

const repositoryProductsMemory = new RepositoryProductsMemory()
const createNewProduct = new CreateNewProduct(repositoryProductsMemory)

describe('RepositoryProductsMemory', () => {
    it('Must create a new product!', async () => {
        const newProduct = {
            id: '12345678910',
            product: 'Novo Produto',
            description: 'Descrição do Novo Produto',
            price: '50',
        }

        const createdProduct = await createNewProduct.exec(newProduct)

        expect(createdProduct).toBeDefined()
        expect(createdProduct?.id).toBeDefined()
        expect(createdProduct?.product).toBe(newProduct.product)
    })
})
