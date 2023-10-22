import { NextResponse } from 'next/server'
import connect from '@/core/db'
import ProductsModel from '@/external/database/model/products/Products'

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    await connect()

    const product = await ProductsModel.findOne({ id })

    if (!product)
        return NextResponse.json({
            message: 'This product no exists!',
            error: true,
            status: 401,
        })

    return NextResponse.json({
        message: 'Success',
        status: 201,
        error: false,
        data: product,
    })
}
