import { NextResponse } from 'next/server'
import connect from '@/core/db'
import ProductsModel from '@/external/database/model/products/Products'

export async function GET() {
    await connect()

    const products = await ProductsModel.find()

    if (!products)
        return NextResponse.json({
            message: 'No have products!',
            error: true,
            status: 401,
        })

    return NextResponse.json({
        message: 'Success',
        status: 201,
        error: false,
        data: products,
    })
}
