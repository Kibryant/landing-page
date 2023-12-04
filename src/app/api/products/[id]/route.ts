import { NextResponse } from 'next/server'
import { RepositoryProductsMongo } from '@/external/database/repository/products/RepositoryProductsMongo'
import { GetProductById } from '@/core/products/services/GetProductById'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import mongoose from 'mongoose'

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await mongoose.connect(process.env.MONGODB_URI!, {})
        const repositoryProducts = new RepositoryProductsMongo()
        const getProductById = new GetProductById(repositoryProducts)

        const product = await getProductById.exec(id)
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
    } catch (error) {
        if (error instanceof Error) console.log('Error in GET /api/products/[id]', error.message)
        return NextResponse.json({
            message: 'Internal server error',
            error: true,
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        })
    }
}
