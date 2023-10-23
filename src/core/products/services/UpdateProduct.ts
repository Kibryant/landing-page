import UseCases from '@/core/shared/UseCases'
import { UpdateProductDto } from '../dtos/UpdateProduct.dto'
import Products from '../model/Products'
import { ProductsRepository } from './repository'

export class UpdateProducts implements UseCases<UpdateProductDto, Promise<Products | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private productsRepository: ProductsRepository) { }
    async exec({ id: productId, description, price, product }: UpdateProductDto): Promise<Products | null> {
        const updatedFieldsProduct: UpdateProductDto = {
            id: productId,
        }

        if (description) {
            updatedFieldsProduct.description = description
        }

        if (price) {
            updatedFieldsProduct.price = price
        }

        if (product) {
            updatedFieldsProduct.product = product
        }

        const updatedProducts = await this.productsRepository.updateProduct(productId, updatedFieldsProduct)
        if (!updatedProducts) {
            return null
        }

        return updatedProducts
    }
}
