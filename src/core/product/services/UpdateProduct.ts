import UseCase from '@/core/shared/UseCase'
import { UpdateProductDto } from '../dtos/UpdateProduct.dto'
import Product from '../entity/Product'
import ProductRepository from './repository'

type Input = [string, UpdateProductDto]

export default class UpdateProduct implements UseCase<Input, Promise<Product | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private readonly productRepository: ProductRepository) { }

    exec([productId, product]: Input): Promise<Product | null> {
        const { description, name, price } = product

        return this.productRepository.updateProduct(productId, {
            description,
            name,
            price,
        })
    }
}
