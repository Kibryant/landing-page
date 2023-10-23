import UseCases from '@/core/shared/UseCases'
import Products from '../model/Products'
import { ProductsRepository } from './repository'

export class GetAllProducts implements UseCases<void, Promise<Products[] | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private productsRepository: ProductsRepository) { }
    async exec(): Promise<Products[] | null> {
        const products = await this.productsRepository.getAllProducts()

        if (!products) {
            return null
        }

        return products
    }
}
