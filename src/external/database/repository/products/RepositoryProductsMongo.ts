import CreateProductDto from '@/core/products/dtos/CreateProduct.dto'
import { UpdateProductDto } from '@/core/products/dtos/UpdateProduct.dto'
import Products from '@/core/products/model/Products'
import { ProductsRepository } from '@/core/products/services/repository'
import ProductsModel, { ProductModelProps } from '../../model/products/Products'

export class RepositoryProductsMongo implements ProductsRepository {
    private productsModel: ProductModelProps

    constructor() {
        this.productsModel = ProductsModel
    }

    /**
     * Creates a new product.
     * @param {CreateProductDto} productData - The data of the product to be created.
     * @returns {Promise<Products>} - The created product.
     * @throws {Error} - If an error occurs during creation.
     */
    async createProduct(productData: CreateProductDto): Promise<Products> {
        try {
            // eslint-disable-next-line new-cap
            const newProduct = new this.productsModel(productData)
            await newProduct.save()
            return newProduct
        } catch (error) {
            throw new Error('Error creating the product: ' + error)
        }
    }

    /**
     * Gets a product by ID.
     * @param {string} id - The ID of the product.
     * @returns {Promise<Products | null>} - The corresponding product or null if not found.
     * @throws {Error} - If an error occurs during retrieval.
     */
    async getProductById(id: string): Promise<Products | null> {
        try {
            return (await this.productsModel.findById(id)) ?? null
        } catch (error) {
            throw new Error('Error fetching the product by ID: ' + error)
        }
    }

    /**
     * Gets a product by name.
     * @param {string} productName - The name of the product.
     * @returns {Promise<Products | null>} - The corresponding product or null if not found.
     * @throws {Error} - If an error occurs during retrieval.
     */
    async getProductByName(productName: string): Promise<Products | null> {
        try {
            return (await this.productsModel.findOne({ productName })) ?? null
        } catch (error) {
            throw new Error('Error fetching the product by name: ' + error)
        }
    }

    /**
     * Gets all products.
     * @returns {Promise<Products[]>} - A list of all products.
     * @throws {Error} - If an error occurs during retrieval.
     */
    async getAllProducts(): Promise<Products[]> {
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
     * @returns {Promise<Products | null>} - The updated product or null if not found.
     * @throws {Error} - If an error occurs during the update.
     */
    async updateProduct(id: string, updates: UpdateProductDto): Promise<Products | null> {
        try {
            return (await this.productsModel.findByIdAndUpdate(id, updates, { new: true })) ?? null
        } catch (error) {
            throw new Error('Error updating the product: ' + error)
        }
    }
}
