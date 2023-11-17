import CreateProductDto from '@/core/products/dtos/CreateProduct.dto'
import { UpdateProductDto } from '@/core/products/dtos/UpdateProduct.dto'
import Products from '@/core/products/model/Products'
import { ProductsRepository } from '@/core/products/services/repository'

export default class RepositoryProductsMemory implements ProductsRepository {
    private readonly products: Products[] = []

    constructor() {
        this.createProducts()
    }

    private createProducts() {
        for (let i = 1; i <= 10; i++) {
            const product: Products = {
                id: `product_${i}`,
                product: `Product ${i}`,
                description: `Description for Product ${i}`,
                price: `${i * 10}`,
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            this.products.push(product)
        }
    }

    async createProduct(product: CreateProductDto): Promise<Products> {
        this.products.push(product)
        return product
    }

    async getProductById(id: string): Promise<Products | null> {
        return this.products.find((product) => product.id === id) || null
    }

    async getProductByName(name: string): Promise<Products | null> {
        return this.products.find((product) => product.product === name) || null
    }

    async getAllProducts(): Promise<Products[]> {
        return this.products
    }

    async updateProduct(id: string, updates: UpdateProductDto): Promise<Products | null> {
        const index = this.products.findIndex((product) => product.id === id)
        if (index === -1) {
            return null
        }

        this.products[index] = {
            ...this.products[index],
            ...updates,
            updatedAt: new Date(),
        }

        return this.products[index]
    }
}
