import UseCase from '@/core/shared/UseCase'
import Product from '../entity/Product'
import ProductRepository from './repository'

export default class GetProducts implements UseCase<void, Promise<Product[] | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private readonly productRepository: ProductRepository) { }

    async exec(): Promise<Product[] | null> {
        const products = await this.productRepository.getProducts()

        if (!products.length) {
            return null
        }

        return products
    }
}
