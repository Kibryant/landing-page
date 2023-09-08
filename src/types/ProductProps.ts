import { Document } from "mongoose";

interface ProductProps extends Document {
  id: string;
  product: string;
  description: string;
  price: string;
}

export type { ProductProps };
