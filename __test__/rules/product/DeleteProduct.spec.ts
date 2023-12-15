import CreateNewProduct from '@/core/product/services/CreateNewProduct'
import DeleteProduct from '@/core/product/services/DeleteProduct'
import RepositoryProductsMemory from '@/external/memory/RepositoryProductsMemory'

describe('Delete Product', () => {
    it('should delete a product', async () => {
        const productRepository = new RepositoryProductsMemory()
        const deleteProduct = new DeleteProduct(productRepository)
        const createNewProduct = new CreateNewProduct(productRepository)
        const product = await createNewProduct.exec({
            myProductId: 'my-product-id',
            description: 'Product description',
            name: 'Product name',
            price: '10',
            category: 'Product category',
        })
        const deletedProduct = await deleteProduct.exec(product?.id as string)
        expect(deletedProduct).toBeTruthy()
        expect(deletedProduct === null || deletedProduct === undefined ? undefined : deletedProduct.id).toEqual(
            product === null || product === undefined ? undefined : product.id,
        )
    })
    it('should not delete a product if it does not exist', async () => {
        const productRepository = new RepositoryProductsMemory()
        const deleteProduct = new DeleteProduct(productRepository)
        const deletedProduct = await deleteProduct.exec('non-existing-product-id')
        expect(deletedProduct).toEqual(null)
    })
})
