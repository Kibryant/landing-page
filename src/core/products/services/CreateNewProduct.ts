import UseCases from '@/core/shared/UseCases'
import { ProductsRepository } from './repository'
import Products from '../model/Products'

export class CreateNewProduct implements UseCases<Products, Promise<Products | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private productsRepository: ProductsRepository) { }

    async exec({ id, product, description, price }: Products): Promise<Products | null> {
        const productNameExists = await this.productsRepository.getProductByName(product)

        if (productNameExists) {
            return null
        }

        const newProduct: Products = await this.productsRepository.createProduct({
            id,
            product,
            description,
            price,
        })

        return newProduct
    }
}
