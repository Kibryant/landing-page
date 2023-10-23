import { NextResponse } from 'next/server'
import { connectMongoDb } from '@/external/database/connections'
import { RepositoryProductsMongo } from '@/external/database/repository/products/RepositoryProductsMongo'
import { GetProductById } from '@/core/products/services/GetProductById'
import { HttpStatusCode } from '@/types/HttpStatusCode'

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    await connectMongoDb()

    const repositoryProducts = new RepositoryProductsMongo()
    const getAllProducts = new GetProductById(repositoryProducts)

    const product = await getAllProducts.exec(id)

    if (!product)
        return NextResponse.json({
            message: 'This product no exists!',
            error: true,
            status: HttpStatusCode.NOT_FOUND,
        })

    return NextResponse.json({
        message: 'Success',
        status: HttpStatusCode.NOT_FOUND,
        error: false,
        data: product,
    })
}
