import GetProductById from '@/core/product/services/GetProductById'
import RepositoryProductPrisma from '@/external/database/repository/products/RepositoryProductPrisma'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    try {
        const repositoryProduct = new RepositoryProductPrisma()
        const getProductById = new GetProductById(repositoryProduct)
        console.log('id', id)
        const product = await getProductById.exec(id)
        return NextResponse.json({
            status: HttpStatusCode.OK,
            data: product,
        })
    } catch (error) {
        return NextResponse.json({
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            data: null,
        })
    }
}
