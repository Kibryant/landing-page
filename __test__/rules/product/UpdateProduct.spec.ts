import CreateNewProduct from '@/core/product/services/CreateNewProduct'
import UpdateProduct from '@/core/product/services/UpdateProduct'
import RepositoryProductsMemory from '@/external/memory/RepositoryProductsMemory'

describe('Update Product', () => {
    it('should update a product', async () => {
        const productRepository = new RepositoryProductsMemory()
        const updateProduct = new UpdateProduct(productRepository)
        const createNewProduct = new CreateNewProduct(productRepository)
        const product = await createNewProduct.exec({
            description: 'Product description',
            name: 'Product name',
            price: '10',
            category: 'Product category',
            myProductId: 'my-product-id',
        })

        const updatedProduct = await updateProduct.exec([
            product?.id as string,
            {
                description: 'Updated description',
                name: 'Updated name',
                price: '20',
                category: 'Updated category',
                myProductId: 'my-updated-product-id',
            },
        ])

        expect(updatedProduct).toBeTruthy()
        expect(updatedProduct?.description).toEqual('Updated description')
        expect(updatedProduct?.name).toEqual('Updated name')
        expect(updatedProduct?.price).toEqual('20')
        expect(updatedProduct?.id).toEqual(product?.id)
    })

    it('should not update a product if it does not exist', async () => {
        const productRepository = new RepositoryProductsMemory()
        const updateProduct = new UpdateProduct(productRepository)
        const updatedProduct = await updateProduct.exec([
            'non-existing-product-id',
            {
                description: 'Updated description',
                name: 'Updated name',
                price: '20',
                category: 'Updated category',
                myProductId: 'my-updated-product-id',
            },
        ])
        expect(updatedProduct).toEqual(null)
    })
})
