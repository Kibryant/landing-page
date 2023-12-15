import { NextResponse } from 'next/server'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import CreateProductDto from '@/core/product/dtos/CreateProduct.dto'
import CreateNewProduct from '@/core/product/services/CreateNewProduct'
import RepositoryProductPrisma from '@/external/database/repository/products/RepositoryProductPrisma'

export async function POST(req: Request) {
    try {
        const repositoryProducts = new RepositoryProductPrisma()
        const createNewProduct = new CreateNewProduct(repositoryProducts)

        const body = await req.json()

        const { name, description, price, category, myProductId }: CreateProductDto = body

        const newProduct = await createNewProduct.exec({
            myProductId,
            name,
            description,
            category,
            price,
        })

        if (!newProduct) {
            return NextResponse.json({
                message: 'Error',
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                error: true,
            })
        }

        return NextResponse.json({
            message: 'Product successfully registered!',
            status: HttpStatusCode.CREATED,
            error: false,
        })
    } catch (error) {
        return NextResponse.json({
            message: `Error: ${error}`,
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            error: true,
        })
    }
}
