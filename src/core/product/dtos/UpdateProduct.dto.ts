import Products from '../model/Products'

export interface UpdateProductDto {
    id: string
    product?: string
    description?: string
    price?: string
}
