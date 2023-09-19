"use client";
import { useCart } from "@/contexts/CartContext";
import { type ProductSchemaProps } from "@/schemas/productSchema";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ProductsListProps {
  products: ProductSchemaProps[];
}
const ProductsList = ({ products }: ProductsListProps) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const calculateCartTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.product.price);
      const totalPriceItem = itemPrice * item.quantity;
      return total + totalPriceItem;
    }, 0);
  };

  return (
    <>
      <div className="bg-brandPink w-full py-2 rounded-md">
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
      </div>
      {products.map((product, index) => (
        <div className="border flex flex-col gap-2" key={product.id}>
          <h2 className="text-3xl text-white">{product.product}</h2>
          <h2 className="text-3xl text-white">{product.description}</h2>
          <h2 className="text-3xl text-white">{product.price}</h2>
          <div className="flex w-2/4 justify-between items-center">
            <Link
              className="text-black bg-emerald-500 py-2 px-4 font-medium rounded-md"
              href={`/products/${product.id}`}
            >
              See More
            </Link>
            <button
              className="bg-emerald-500 text-black py-2 px-4 font-medium rounded-md"
              onClick={() => addToCart(product)}
            >
              <ShoppingCartIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export { ProductsList };
