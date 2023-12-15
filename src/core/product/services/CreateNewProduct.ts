import UseCase from '@/core/shared/UseCase'
import CreateProductDto from '../dtos/CreateProduct.dto'
import ProductRepository from './repository'
import Product from '../entity/Product'

export default class CreateNewProduct implements UseCase<CreateProductDto, Promise<Product | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private productRepository: ProductRepository) { }
    async exec({ price, description, name, category, myProductId }: CreateProductDto): Promise<Product | null> {
        const product = await this.productRepository.createNewProduct({
            price,
            description,
            name,
            category,
            myProductId,
        })
        return product
    }
}
