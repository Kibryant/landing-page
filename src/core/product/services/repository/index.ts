import CreateProductDto from '../../dtos/CreateProduct.dto'
import { UpdateProductDto } from '../../dtos/UpdateProduct.dto'
import Product from '../../entity/Product'

export default abstract class ProductRepository {
    abstract getProductById(productId: string): Promise<Product | null>
    abstract getProductByName(productName: string): Promise<Product | null>
    abstract getProducts(): Promise<Product[]>
    abstract createNewProduct(product: CreateProductDto): Promise<Product | null>
    abstract updateProduct(productId: string, updatedFields: UpdateProductDto): Promise<Product | null>
    abstract deleteProduct(productId: string): Promise<Product | null>
}
