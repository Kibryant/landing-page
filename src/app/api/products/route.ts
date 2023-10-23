import { NextResponse } from 'next/server'
import { RepositoryProductsMongo } from '@/external/database/repository/products/RepositoryProductsMongo'
import { GetAllProducts } from '@/core/products/services/GetAllProducts'
import { connectMongoDb } from '@/external/database/connections'
import { HttpStatusCode } from '@/types/HttpStatusCode'

export async function GET() {
    await connectMongoDb()

    const repositoryProducts = new RepositoryProductsMongo()
    const getAllProducts = new GetAllProducts(repositoryProducts)

    const products = await getAllProducts.exec()

    if (!products)
        return NextResponse.json({
            message: 'No have products!',
            error: true,
            status: HttpStatusCode.NOT_FOUND,
        })

    return NextResponse.json({
        message: 'Success',
        status: HttpStatusCode.OK,
        error: false,
        data: products,
    })
}
