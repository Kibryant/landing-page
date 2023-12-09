import UseCase from '@/core/shared/UseCase'
import Product from '../entity/Product'
import ProductRepository from './repository'

export default class DeleteProduct implements UseCase<string, Promise<Product | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private readonly productRepository: ProductRepository) { }

    async exec(productId: string): Promise<Product | null> {
        const product = await this.productRepository.getProductById(productId)

        if (!product) {
            return null
        }

        const deletedProduct = await this.productRepository.deleteProduct(productId)

        return deletedProduct
    }
}
