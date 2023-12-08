import UseCase from '@/core/shared/UseCase'
import Product from '../entity/Product'
import ProductRepository from './repository'

export default class GetProductByName implements UseCase<string, Promise<Product | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private productRepository: ProductRepository) { }
    async exec(name: string): Promise<Product | null> {
        const product = await this.productRepository.getProductByName(name)
        return product
    }
}
