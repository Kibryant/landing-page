"use server";

import { Section } from "@/components/Section";
import { ProductSchemaProps } from "@/schemas/productSchema";
import { headers } from "next/headers";

export async function generateStaticParams() {
  const productsIds = ["1", "2", "3", "4", "5"];

  return productsIds.map((productId) => {
    return productId;
  });
}

const Product = async ({ params: { id } }: { params: { id: string } }) => {
  const host = headers().get("host");
  const protocal = process.env.NODE_ENV === "development" ? "http" : "https";
  const req = await fetch(`${protocal}://${host}/api/products/${id}`, { next: { revalidate: 100 } });
  const res = await req.json();
  const product: ProductSchemaProps = res.data;

  return (
    <main>
      <Section>
        <h1 className="text-white text-3xl">{product.product}</h1>
        <h2 className="text-white text-3xl">{product.description}</h2>
      </Section>
    </main>
  );
};

export default Product;
