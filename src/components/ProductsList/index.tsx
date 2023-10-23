'use client'
import { type Product, useCart } from '@/contexts/Cart/CartContext'
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Toaster } from 'sonner'

interface ProductsListProps {
    products: Product[]
}

const ProductsList = ({ products }: ProductsListProps) => {
    const { cart, addProductToCart, removeProductToCart } = useCart()

    // const calculateCartTotalPrice = () => {
    //     return cart.reduce((total, item) => {
    //         const itemPrice = parseFloat(item.product.price)
    //         const totalPriceItem = itemPrice * item.quantity
    //         return total + totalPriceItem
    //     }, 0)
    // }

    return (
        <>
            <Toaster richColors />
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
            <h1 className="text-primary font-bold text-2xl text-center">R${cart.totalCartPrice}</h1>
            <div className="flex justify-center gap-6 flex-wrap">
                {products.map((product) => (
                    <label className="flex flex-col gap-2" key={product.id}>
                        <input type="checkbox" className="absolute scale-0" id="my-checkbox" />
                        <article className="relative bg-primary-foreground my-perspective w-64 h-64 rounded-[60px] shadow">
                            <div
                                id="front"
                                className="overflow-hidden absolute top-0 left-0 right-0 bottom-0 text-center my-backface-visibility rounded-[60px] shadow-lg p-6 cursor-pointer duration-300"
                            >
                                <div className="flex flex-col gap-6 justify-between items-center h-full mb-6">
                                    <h2 className="text-xl font-bold text-primary break-all uppercase">
                                        {product.product}
                                    </h2>
                                    <h3 className="text-lg font-medium text-zinc-600">{product.description}</h3>
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
                                className="absolute top-0 left-0 right-0 bottom-0 text-center my-backface-visibility rounded-[60px] shadow-lg p-6 cursor-pointer duration-300 my-rotate"
                            >
                                <div className="w-full flex flex-col justify-between h-full">
                                    <Link
                                        className="text-zinc-100 bg-primary py-2 px-4 font-medium rounded-3xl"
                                        href={`/products/${product.id}?color=black&size=xs`}
                                    >
                                        See More
                                    </Link>

                                    <div className="flex gap-x-2 justify-center">
                                        <button
                                            className="bg-primary text-zinc-100 rounded-full p-3"
                                            onClick={() => addProductToCart(product)}
                                        >
                                            <ShoppingCartIcon className="w-8 h-8" />
                                        </button>
                                        {cart.product.length > 0 && (
                                            <button
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
        </>
    )
}

export { ProductsList }
