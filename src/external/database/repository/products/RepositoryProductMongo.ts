import CreateProductDto from '@/core/product/dtos/CreateProduct.dto'
import { UpdateProductDto } from '@/core/product/dtos/UpdateProduct.dto'
import ProductRepository from '@/core/product/services/repository'
import Product from '@/core/product/entity/Product'
import ProductModel, { ProductModelProps } from '../../model/product/Product'

export class RepositoryProductMongo implements ProductRepository {
    private productsModel: ProductModelProps

    constructor() {
        this.productsModel = ProductModel
    }

    /**
     * Creates a new product.
     * @param {CreateProductDto} productData - The data of the product to be created.
     * @returns {Promise<Product>} - The created product.
     * @throws {Error} - If an error occurs during creation.
     */
    async createProduct(productData: CreateProductDto): Promise<Product> {
        try {
            // eslint-disable-next-line new-cap
            const newProduct = Product.create(productData)
            const product = await this.productsModel.create(newProduct)
            await product.save()
            return newProduct
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
            return (await this.productsModel.findOne({ id })) ?? null
        } catch (error) {
            throw new Error('Error fetching the product by ID: ' + error)
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
            return (await this.productsModel.findOne({ productName })) ?? null
        } catch (error) {
            throw new Error('Error fetching the product by name: ' + error)
        }
    }

    /**
     * Gets all products.
     * @returns {Promise<Product[]>} - A list of all products.
     * @throws {Error} - If an error occurs during retrieval.
     */
    async getAllProduct(): Promise<Product[]> {
        try {
            return await this.productsModel.find()
        } catch (error) {
            throw new Error('Error fetching all products: ' + error)
        }
    }

    /**
     * Updates a product by ID.
     * @param {string} id - The ID of the product to be updated.
     * @param {UpdateProductDto} updates - The update data.
     * @returns {Promise<Product | null>} - The updated product or null if not found.
     * @throws {Error} - If an error occurs during the update.
     */
    async updateProduct(id: string, updates: UpdateProductDto): Promise<Product | null> {
        try {
            return (await this.productsModel.findByIdAndUpdate(id, updates, { new: true })) ?? null
        } catch (error) {
            throw new Error('Error updating the product: ' + error)
        }
    }

    /**
     * Deletes a product by ID.
     * @param {string} id - The ID of the product to be deleted.
     * @returns {Promise<Product | null>} - The deleted product or null if not found.
     * @throws {Error} - If an error occurs during deletion.
     */
    deleteProduct(productId: string): Promise<Product | null> {
        throw new Error('Method not implemented.')
    }

    getProducts(): Promise<Product[]> {
        throw new Error('Method not implemented.')
    }

    createNewProduct(product: CreateProductDto): Promise<Product | null> {
        throw new Error('Method not implemented.')
    }
}
