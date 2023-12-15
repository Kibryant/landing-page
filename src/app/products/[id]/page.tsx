/* eslint-disable prettier/prettier */
import { Button } from '@/components/ui/button'
import Product from '@/core/product/entity/Product'
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

const Page = async ({
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
    const product: Product = res.data
    const selectedColor = (searchParams.color || 'black') as string
    const selectedSize = (searchParams.size || 'xs') as string

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <h1 className='text-5xl text-primary font-bold tracking-widest mb-4'>Product</h1>
            <section className="w-full flex justify-center items-center">
                <div className="w-full max-w-5xl gap-6 bg-primary-foreground rounded-3xl border border-primary flex items-center justify-center shadow-lg min-h-[70vh]">
                    <div className="flex justify-center">
                        <div className="shadow-lg rounded-3xl flex justify-center items-center w-[622px] h-[550px]">
                            <Image
                                quality={100}
                                width={551.7}
                                height={467.68}
                                src="/images/illustrations/dashboard.png"
                                alt="Product Image"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 justify-start">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-3xl text-primary font-bold">{product.name}</h1>
                            <div className="bg-primary flex justify-center max-w-[120px] py-2 px-1 rounded-lg hover:bg-primary/90">
                                <span className="text-white font-medium">${product.price} USD</span>
                            </div>
                            <div className='my-3'>
                                <h2 className="text-2xl text-primary font-semibold">Description</h2>
                                <p className="text-sm">{product.description}</p>
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
                                        className={`bg-white shadow px-4 py-1 rounded-full border-2 capitalize font-medium duration-200 hover:bg-primary/90 hover:text-white ${selectedColor === color && 'border-primary'
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
                                    className={`bg-white shadow px-3 py-1 rounded-full border-2 uppercase font-medium duration-300 hover:bg-primary/90 hover:text-white ${selectedSize === size && 'border-primary'
                                        }`}
                                >
                                    {size}
                                </Link>
                            ))}
                        </div>
                        <div className='flex gap-x-4'>
                            <Button className="bg-primary text-white font-medium rounded-lg">
                                <Link href={`/products/${product.id}?color=${selectedColor}&size=${selectedSize}`}>
                                    Buy
                                </Link>
                            </Button>
                            <Button className="bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
                                <Link href={`/products/${product.id}?color=${selectedColor}&size=${selectedSize}`}>
                                    Cancel
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Page
