import { NextResponse } from 'next/server'
import { connectMongoDb } from '@/external/database/connections'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import CreateProductDto from '@/core/product/dtos/CreateProduct.dto'
import GetProductByName from '@/core/product/services/GetProductByName'
import CreateNewProduct from '@/core/product/services/CreateNewProduct'
import { RepositoryProductMongo } from '@/external/database/repository/products/RepositoryProductMongo'

export async function POST(req: Request) {
    try {
        await connectMongoDb()

        const repositoryProducts = new RepositoryProductMongo()
        const createNewProduct = new CreateNewProduct(repositoryProducts)
        const getProductByName = new GetProductByName(repositoryProducts)

        const body = await req.json()

        const { name, description, price }: CreateProductDto = body

        const productExists = await getProductByName.exec(name)

        if (productExists)
            return NextResponse.json({
                message: 'This products already. Try another or change it.',
                error: true,
                status: HttpStatusCode.CONFLICT,
            })

        const newProduct = await createNewProduct.exec({
            name,
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
