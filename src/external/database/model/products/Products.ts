import mongoose, { Model } from 'mongoose'
import type { ProductProps } from '@/types/ProductProps'
const { Schema } = mongoose
type ProductModelProps = Model<ProductProps>

const productsSchema = new Schema<ProductProps>(
    {
        id: { type: String, required: true, unique: true },
        product: { type: String, require: true, unique: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
    },
    { timestamps: true },
)

const ProductsModel: ProductModelProps = mongoose.models.Product || mongoose.model('Product', productsSchema)

export default ProductsModel
