import { NextResponse } from 'next/server'
import { RepositoryProductsMongo } from '@/external/database/repository/products/RepositoryProductsMongo'
import { GetAllProducts } from '@/core/products/services/GetAllProducts'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import mongoose from 'mongoose'
import { connectMongoDb } from '@/external/database/connections'

export async function GET() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {})
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
    } catch (error) {
        if (error instanceof Error) console.log('Error in GET /api/products', error.message)
        return NextResponse.json({
            message: 'Internal server error',
            error: true,
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        })
    }
}
