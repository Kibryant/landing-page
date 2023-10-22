/* eslint-disable prettier/prettier */
import { ProductSchemaProps } from '@/schemas/productSchema'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
    const productsIds = ['1', '2', '3', '4', '5']

    return productsIds.map((productId) => {
        return productId
    })
}

const colorVariants = ['black', 'pink', 'white', 'blue'] as const
const sizeVariants = ['xs', 's', 'l', 'xl'] as const

const Product = async ({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const host = headers().get('host')
    const protocal = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const req = await fetch(`${protocal}://${host}/api/products/${params.id}`, { next: { revalidate: 100 } })
    const res = await req.json()
    console.log(res.data)
    const product: ProductSchemaProps = res.data

    const selectedColor = (searchParams.color || 'black') as string
    const selectedSize = (searchParams.size || 'xs') as string

    return (
        <main className="min-h-screen flex justify-center items-center">
            <section className="w-full flex justify-center items-center">
                <div className="w-full max-w-7xl gap-6 bg-gray-100 rounded-3xl flex items-center justify-center shadow-lg min-h-[75vh]">
                    <div className="flex justify-center">
                        <div className="shadow-lg rounded-3xl flex justify-center items-center w-[622px] h-[550px]">
                            <Image
                                quality={100}
                                width={551.7}
                                height={467.68}
                                src="/images/dashboard-picture.png"
                                alt="Product Image"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 justify-start">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl text-[#7C1DC9] font-semibold">{product.product}</h1>
                            <div className="bg-[#7C1DC9] flex justify-center max-w-[120px] py-2 px-1 rounded-full mt-3 mb-10">
                                <span className="text-white font-medium">${product.price} USD</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start gap-2">
                            <h2 className="text-md">Colors</h2>
                            <div className="flex gap-1 justify-center">
                                {colorVariants.map((color) => (
                                    <Link
                                        href={`?${new URLSearchParams({
                                            color,
                                            size: selectedSize,
                                        })}`}
                                        key={color}
                                        className={`bg-white shadow px-4 py-1 rounded-full border-2 capitalize font-medium duration-200 ${selectedColor === color && 'border-[#7C1DC9]'
                                            }`}
                                    >
                                        {color}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-start gap-2">
                            <h2 className="text-md">Sizes</h2>
                            {sizeVariants.map((size) => (
                                <Link
                                    // href={`?color=${selectedColor}&size=${size}`}
                                    href={`?${new URLSearchParams({
                                        color: selectedColor,
                                        size,
                                    })}`}
                                    key={size}
                                    className={`bg-white shadow px-4 py-1 rounded-full border-2 uppercase font-medium duration-300 ${selectedSize === size && 'border-[#7C1DC9]'
                                        }`}
                                >
                                    {size}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Product
