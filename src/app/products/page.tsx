import { Section } from '@/components/Section'
import { headers } from 'next/headers'
import { ProductsList } from '@/components/ProductsList'
import { Product } from '@/contexts/CartContext'

const Products = async () => {
    const host = headers().get('host')
    const protocal = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const req = await fetch(`${protocal}://${host}/api/products`, { next: { revalidate: 100 } })
    const res: { data: Product[] } = await req.json()
    const products = res.data.map(({ id, description, price, product }) => {
        return {
            id,
            description,
            price,
            product,
            totalPriceOfProduct: +price,
            totalQuantiyOfProduct: 1,
        }
    })

    return (
        <>
            <Section>
                <ProductsList products={products} />
            </Section>
        </>
    )
}

export default Products
