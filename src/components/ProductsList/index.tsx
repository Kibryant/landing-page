'use client'
import { useCart } from '@/contexts/Cart/CartContext'
import Product from '@/core/product/entity/Product'
import { capitalizeFirstLetter } from '@/utils'
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { Button } from '../ui/button'
import { Badge } from '@/components/Badge'
import { SearchIcon } from 'lucide-react'
import { TextField } from '@radix-ui/themes'

interface ProductsListProps {
    products: Product[]
}

const ProductsList = ({ products }: ProductsListProps) => {
    const { cart, addProductToCart, removeProductToCart } = useCart()
    const [initialProducts] = useState<Product[]>(products)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)

    const filterProducts = (word: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(word.target.value)
    }

    useEffect(() => {
        setFilteredProducts(
            initialProducts.filter((product) => capitalizeFirstLetter(product.name).includes(searchTerm)),
        )
    }, [searchTerm, initialProducts])

    useEffect(() => {
        setFilteredProducts(products)
    }, [products])

    return (
        <div className="flex flex-col justify-center gap-y-6 items-center">
            <Toaster richColors />
            <div>
                <TextField.Root className="flex w-full items-center justify-center gap-x-3">
                    <TextField.Slot>
                        <SearchIcon />
                    </TextField.Slot>
                    <TextField.Input
                        onChange={filterProducts}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Search the docs…"
                    />
                </TextField.Root>
            </div>

            <h1 className="text-primary font-bold text-2xl text-center">R${cart.totalCartPrice}</h1>
            <div className="flex justify-center gap-6 flex-wrap">
                {products.length === 0 && (
                    <h1 className="text-primary font-bold text-2xl text-center">No Products to see here</h1>
                )}
                {filteredProducts.map((product) => (
                    <label className="flex flex-col gap-2" key={product.id}>
                        <Badge text="New" />

                        <input type="checkbox" className="absolute scale-0" id="my-checkbox" />
                        <article className="relative bg-primary-foreground my-perspective w-64 h-64 rounded-lg shadow">
                            <div
                                id="front"
                                className="overflow-hidden absolute top-0 left-0 right-0 bottom-0 text-center my-backface-visibility rounded-lg shadow-lg p-6 cursor-pointer duration-300"
                            >
                                <div className="flex flex-col gap-6 justify-between items-center h-full mb-6">
                                    <h2 className="text-xl font-bold text-primary break-all uppercase">
                                        {product.name}
                                    </h2>
                                    <h3 className="text-lg font-medium">{product.description}</h3>
                                    <div className="flex w-full justify-center items-center gap-x-3">
                                        <s className="text-base flex justify-center">
                                            <span className="text-xs">$</span>
                                            <span className="font-semibold">
                                                {parseFloat(product.price) - (parseFloat(product.price) * 10) / 100}
                                            </span>
                                            <span>USD</span>
                                        </s>
                                        <h4 className="text-2xl relative font-medium flex justify-end items-end text-primary">
                                            <span className="text-xs absolute top-0 -left-[6px]">$</span>
                                            <span className="font-semibold">{product.price}</span>
                                            <span className="text-xs">USD</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div
                                id="back"
                                className="absolute top-0 left-0 right-0 bottom-0 text-center my-backface-visibility rounded-lg shadow-lg p-6 cursor-pointer duration-300 my-rotate"
                            >
                                <div className="w-full flex flex-col justify-between h-full">
                                    <Button className="font-medium rounded-lg">
                                        <Link href={`/products/${product.id}?color=black&size=xs`}>See More</Link>
                                    </Button>

                                    <div className="flex gap-x-2 justify-center">
                                        <button
                                            data-testid="add-to-cart"
                                            className="bg-primary text-zinc-100 rounded-full p-3"
                                            onClick={() => addProductToCart(product)}
                                        >
                                            <ShoppingCartIcon className="w-8 h-8" />
                                        </button>
                                        {cart.product.length > 0 && (
                                            <button
                                                data-testid="remove-from-cart"
                                                className="bg-red-500 text-zinc-100 rounded-full p-3"
                                                onClick={() => removeProductToCart(product)}
                                            >
                                                <XMarkIcon className="w-8 h-8" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </label>
                ))}
            </div>
        </div>
    )
}

export { ProductsList }
