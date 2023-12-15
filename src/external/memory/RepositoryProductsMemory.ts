import CreateProductDto from '@/core/product/dtos/CreateProduct.dto'
import { UpdateProductDto } from '@/core/product/dtos/UpdateProduct.dto'
import Product from '@/core/product/entity/Product'
import ProductRepository from '@/core/product/services/repository'

export default class RepositoryProductsMemory implements ProductRepository {
    private readonly products: Product[] = []

    getProducts(): Promise<Product[]> {
        return Promise.resolve(this.products)
    }

    async createNewProduct(product: CreateProductDto): Promise<Product | null> {
        const productExists = await this.getProductByName(product.name)

        if (productExists) {
            return null
        }

        const newProduct = Product.create(product)
        this.products.push(newProduct)
        return Promise.resolve(newProduct)
    }

    deleteProduct(productId: string): Promise<Product | null> {
        const productIndex = this.products.findIndex((product) => product.id === productId)
        const product = this.products[productIndex]
        this.products.splice(productIndex, 1)
        return Promise.resolve(product)
    }

    getProductById(productId: string): Promise<Product | null> {
        const product = this.products.find((product) => product.id === productId)
        return Promise.resolve(product ?? null)
    }

    getProductByName(productName: string): Promise<Product | null> {
        const product = this.products.find((product) => product.name === productName)
        return Promise.resolve(product ?? null)
    }

    updateProduct(
        productId: string,
        { description, name, price, category, myProductId }: UpdateProductDto,
    ): Promise<Product | null> {
        const productIndex = this.products.findIndex((product) => product.id === productId)

        if (productIndex === -1) {
            return Promise.resolve(null)
        }

        const product = this.products[productIndex]

        const updatedProduct = Product.create(
            {
                description: description ?? product.description,
                name: name ?? product.name,
                price: price ?? product.price,
                category: category ?? product.category,
                myProductId: myProductId ?? product.myProductId,
            },
            product.id,
        )

        this.products[productIndex] = updatedProduct

        return Promise.resolve(updatedProduct)
    }
}
