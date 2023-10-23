import { NextResponse } from 'next/server'
import { RepositoryProductsMongo } from '@/external/database/repository/products/RepositoryProductsMongo'
import { CreateNewProduct } from '@/core/products/services/CreateNewProduct'
import { GetProductByName } from '@/core/products/services/GetProductByName'
import { connectMongoDb } from '@/external/database/connections'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import CreateProductDto from '@/core/products/dtos/CreateProduct.dto'

export async function POST(req: Request) {
    try {
        await connectMongoDb()

        const repositoryProducts = new RepositoryProductsMongo()
        const createNewProduct = new CreateNewProduct(repositoryProducts)
        const getProductByName = new GetProductByName(repositoryProducts)

        const body = await req.json()

        const { id, product, description, price }: CreateProductDto = body

        const productExists = await getProductByName.exec(product)

        if (productExists)
            return NextResponse.json({
                message: 'This products already. Try another or change it.',
                error: true,
                status: HttpStatusCode.CONFLICT,
            })

        const newProduct = await createNewProduct.exec({
            id,
            product,
            description,
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
            status: 201,
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
