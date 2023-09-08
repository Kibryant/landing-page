import mongoose, { Model } from "mongoose";
import type { ProductProps } from "@/types/ProductProps";

const { Schema } = mongoose;
interface ProductModelProps extends Model<ProductProps> {}

const productSchema = new Schema<ProductProps>(
  {
    id: { type: String, required: true, unique: true },
    product: { type: String, require: true, unique: true },
    description: { type: String, required: true },
    price: { type: String, required: true }
  },
  { timestamps: true }
);

const ProductModel: ProductModelProps = mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModel;
