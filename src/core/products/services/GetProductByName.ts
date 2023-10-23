import UseCases from '@/core/shared/UseCases'
import Products from '../model/Products'
import { ProductsRepository } from './repository'

export class GetProductByName implements UseCases<string, Promise<Products | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private productsRepository: ProductsRepository) { }
    async exec(productName: string): Promise<Products | null> {
        const product = await this.productsRepository.getProductByName(productName)

        if (!product) {
            return null
        }

        return product
    }
}
