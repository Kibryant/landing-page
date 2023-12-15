import GetProducts from '@/core/product/services/GetProducts'
import RepositoryProductPrisma from '@/external/database/repository/products/RepositoryProductPrisma'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const productsRepository = new RepositoryProductPrisma()
        const getProducts = new GetProducts(productsRepository)

        const products = await getProducts.exec()

        return NextResponse.json({
            status: HttpStatusCode.OK,
            data: products,
        })
    } catch (error) {
        return NextResponse.json({
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            data: null,
        })
    }
}
