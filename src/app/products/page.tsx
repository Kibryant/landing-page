import { Section } from '@/components/Section'
import { headers } from 'next/headers'
import { ProductsList } from '@/components/ProductsList'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import Product from '@/core/product/entity/Product'
import Widgets from '@/components/Widgets'
import { Link } from 'lucide-react'
import Image from 'next/image'
import { signal } from '@/constants'

const Page = async () => {
    const host = headers().get('host')
    const protocal = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const req = await fetch(`${protocal}://${host}/api/products`, { next: { revalidate: 10 }, signal })

    if (req.status !== HttpStatusCode.OK) {
        return <div>Error in Fetch products</div>
    }

    const res: { data: Product[] } = await req.json()

    if (!res.data) {
        return <div>No Products</div>
    }

    const products: Product[] = res.data

    return (
        <>
            <Section>
                <div className="w-full flex justify-center">
                    <Widgets.Template>
                        <div className="col-span-2 z-10 pe-8">
                            <Widgets.Title>
                                Hello, <span className="text-primary">Customer!</span>
                            </Widgets.Title>
                            <Widgets.Subtitle
                                subtitle="
                    On the journey from data to strategy, the Cloud is your trusted guide by making your metrics easier to visualize."
                            />
                            <Widgets.Bottom>
                                Ask your questions{' '}
                                <Link href="/dashboard" className="underline uppercase text-primary">
                                    here
                                </Link>
                                .
                            </Widgets.Bottom>
                        </div>
                        <Widgets.ImageComponent imagePath="1">
                            <Image
                                width={98}
                                height={63}
                                aria-hidden={true}
                                alt="Cloud"
                                quality={100}
                                src="/images/float/cloud.png"
                                className="absolute -top-12 -left-24  z-20"
                            />
                            <Image
                                width={98}
                                height={63}
                                alt="Cloud"
                                aria-hidden={true}
                                quality={100}
                                src="/images/float/cloud.png"
                                className="absolute -bottom-12 -right-12 z-10"
                            />
                        </Widgets.ImageComponent>
                    </Widgets.Template>
                </div>
            </Section>
            <Section>
                <ProductsList products={products} />
            </Section>
        </>
    )
}

export default Page
