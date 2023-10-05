'use client'
import { useCart } from '@/contexts/CartContext'
import { type ProductSchemaProps } from '@/schemas/productSchema'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface ProductsListProps {
    products: ProductSchemaProps[]
}

const ProductsList = ({ products }: ProductsListProps) => {
    const { cart, addToCart } = useCart()

    const calculateCartTotalPrice = () => {
        return cart.reduce((total, item) => {
            const itemPrice = parseFloat(item.product.price)
            const totalPriceItem = itemPrice * item.quantity
            return total + totalPriceItem
        }, 0)
    }

    return (
        <>
            {/* <div className="bg-brandPink w-full py-2 rounded-md">
        <h1>Total Price R${calculateCartTotalPrice()}</h1>
        {cart.map((item) => (
          <div className="border-b flex gap-2 justify-between">
            <h2 className="text-3xl text-white">{item.product.product}</h2>
            <h2 className="text-3xl text-white">{item.product.price}</h2>
            <h2 className="text-3xl text-white">{item.quantity}</h2>
            <button
              className="bg-red-500 text-white py-2 px-4 font-medium rounded-md"
              onClick={() => removeFromCart(item.product.id)}
            >
              <TrashIcon className="w-8 h-8" />
            </button>
          </div>
        ))}
      </div> */}
            <div className="flex gap-6 flex-wrap">
                {products.map((product) => (
                    <label className="flex flex-col gap-2" key={product.id}>
                        <input type="checkbox" className="absolute scale-0" id="my-checkbox" />
                        <article className="relative my-perspective w-96 h-96 rounded-[60px] shadow">
                            <div
                                id="front"
                                className="overflow-hidden absolute top-0 left-0 right-0 bottom-0 text-center my-backface-visibility rounded-[60px] shadow-lg p-6 cursor-pointer duration-300"
                            >
                                <div className="flex flex-col gap-6 justify-between items-center h-full mb-6">
                                    <h2 className="text-xl font-medium text-brandBlue break-all uppercase">
                                        {product.product}
                                    </h2>
                                    <h3 className="text-lg font-medium text-zinc-600">{product.description}</h3>
                                    <div className="flex w-full justify-center items-center gap-x-1">
                                        <s className="text-base">
                                            <span className="text-xs">$</span>
                                            <span className="font-semibold">{product.price} </span>
                                            <span>USD</span>
                                        </s>
                                        <h4 className="text-2xl font-medium text-brandBlue">
                                            <span className="text-xs">$</span>
                                            <span className="font-semibold">{product.price} </span>
                                            <span className="text-xs">USD</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div
                                id="back"
                                className="absolute top-0 left-0 right-0 bottom-0 text-center my-backface-visibility rounded-[60px] shadow-lg p-6 cursor-pointer duration-300 my-rotate"
                            >
                                <div className="">
                                    <Link
                                        className="text-black bg-emerald-500 py-2 px-4 font-medium rounded-md"
                                        href={`/products/${product.id}?color=black&size=xs`}
                                    >
                                        See More
                                    </Link>

                                    <div className="flex w-2/4 justify-between items-center">
                                        <button
                                            className="bg-emerald-500 text-black py-2 px-4 font-medium rounded-md"
                                            onClick={() => addToCart(product)}
                                        >
                                            <ShoppingCartIcon className="w-8 h-8" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </label>
                ))}
            </div>
        </>
    )
}

export { ProductsList }
