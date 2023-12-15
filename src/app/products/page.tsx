import { Section } from '@/components/Section'
import { headers } from 'next/headers'
import { ProductsList } from '@/components/ProductsList'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import Product from '@/core/product/entity/Product'

const Page = async () => {
    const host = headers().get('host')
    const protocal = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const req = await fetch(`${protocal}://${host}/api/products`, { next: { revalidate: 10 } })

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
                <ProductsList products={products} />
            </Section>
        </>
    )
}

export default Page
