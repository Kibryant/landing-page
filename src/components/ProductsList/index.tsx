"use client";
import { type ProductSchemaProps } from "@/schemas/productSchema";
import Link from "next/link";

interface ProductsListProps {
  products: ProductSchemaProps[];
}
const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <>
      {products.map((product, index) => (
        <div className="border flex flex-col gap-2" key={product.id}>
          <h2 className="text-3xl text-white">{product.product}</h2>
          <h2 className="text-3xl text-white">{product.description}</h2>
          <h2 className="text-3xl text-white">{product.price}</h2>
          <Link className="text-black bg-emerald-500 py-2 px-4 font-medium rounded-md" href={`/products/${product.id}`}>
            See More
          </Link>
        </div>
      ))}
    </>
  );
};

export { ProductsList };
