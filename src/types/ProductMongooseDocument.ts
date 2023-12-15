import { Document } from 'mongoose'
import Product from '@/core/product/entity/Product'

type ProductMongooseDocument = Document & Product

export type { ProductMongooseDocument }
