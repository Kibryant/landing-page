import CreateProductDto from '../../dtos/CreateProduct.dto'
import { UpdateProductDto } from '../../dtos/UpdateProduct.dto'
import Products from '../../model/Products'

export abstract class ProductsRepository {
    abstract createProduct(product: CreateProductDto): Promise<Products>
    abstract getProductById(id: string): Promise<Products | null>
    abstract getProductByName(id: string): Promise<Products | null>
    abstract getAllProducts(): Promise<Products[]>
    abstract updateProduct(id: string, updates: UpdateProductDto): Promise<Products | null>
}
