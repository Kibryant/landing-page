import CreateProductDto from '@/core/product/dtos/CreateProduct.dto'
import { UpdateProductDto } from '@/core/product/dtos/UpdateProduct.dto'
import Product from '@/core/product/entity/Product'
import ProductRepository from '@/core/product/services/repository'
import { PrismaClient } from '../../../../../prisma/generated/client1'

export default class RepositoryProductPrisma implements ProductRepository {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    /**
     * Creates a new product.
     * @param {CreateProductDto} productData - The data of the product to be created.
     * @returns {Promise<Product>} - The created product.
     * @throws {Error} - If an error occurs during creation.
     */
    async createNewProduct({
        description,
        name,
        price,
        category,
        myProductId,
    }: CreateProductDto): Promise<Product | null> {
        try {
            const productExists = await this.getProductByName(name)

            if (productExists) {
                throw new Error('Product already exists')
            }

            const newProduct = Product.create({
                name,
                description,
                price,
                category,
                myProductId,
            })

            const product = await this.prisma.product.create({
                data: {
                    id: newProduct.id,
                    name: newProduct.name,
                    description: newProduct.description,
                    category: newProduct.category,
                    price: newProduct.price,
                    myProductId: newProduct.myProductId,
                },
            })

            return Product.create(product)
        } catch (error) {
            throw new Error('Error creating the product: ' + error)
        }
    }

    /**
     * Gets a product by ID.
     * @param {string} id - The ID of the product.
     * @returns {Promise<Product | null>} - The corresponding product or null if not found.
     * @throws {Error} - If an error occurs during retrieval.
     */

    async getProductById(id: string): Promise<Product | null> {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    id,
                },
            })

            if (!product) {
                return null
            }

            return product as Product
        } catch (error) {
            throw new Error('Error getting the product: ' + error)
        }
    }

    /**
     * Gets a product by name.
     * @param {string} productName - The name of the product.
     * @returns {Promise<Product | null>} - The corresponding product or null if not found.
     * @throws {Error} - If an error occurs during retrieval.
     */

    async getProductByName(productName: string): Promise<Product | null> {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    name: productName,
                },
            })

            if (!product) {
                return null
            }

            return Product.create(
                {
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    myProductId: product.myProductId,
                },
                product.id,
            )
        } catch (error) {
            throw new Error('Error getting the product: ' + error)
        }
    }

    /**
     * Gets all products.
     * @returns {Promise<Product[]>} - All products.
     * @throws {Error} - If an error occurs during retrieval.
     */

    async getProducts(): Promise<Product[]> {
        try {
            const products = await this.prisma.product.findMany()

            return products.map((product) => product as Product)
        } catch (error) {
            throw new Error('Error getting the products: ' + error)
        }
    }

    /**
     * Updates a product.
     * @param {UpdateProductDto} productData - The data of the product to be updated.
     * @returns {Promise<Product>} - The updated product.
     * @throws {Error} - If an error occurs during update.
     */

    async updateProduct(
        id: string,
        { description, name, price, category, myProductId }: UpdateProductDto,
    ): Promise<Product | null> {
        try {
            const product = await this.prisma.product.update({
                where: {
                    id,
                },
                data: {
                    name,
                    description,
                    category,
                    price,
                    myProductId,
                },
            })

            return Product.create(
                {
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    myProductId: product.myProductId,
                },
                product.id,
            )
        } catch (error) {
            throw new Error('Error updating the product: ' + error)
        }
    }

    /**
     * Deletes a product.
     * @param {string} id - The ID of the product to be deleted.
     * @returns {Promise<void>} - Nothing.
     * @throws {Error} - If an error occurs during deletion.
     */

    async deleteProduct(id: string): Promise<Product> {
        try {
            const product = await this.prisma.product.delete({
                where: {
                    id,
                },
            })

            return product as Product
        } catch (error) {
            throw new Error('Error deleting the product: ' + error)
        }
    }
}
