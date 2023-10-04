import { Section } from "@/components/Section";
import { headers } from "next/headers";
import { type ProductSchemaProps } from "@/schemas/productSchema";
import { ProductsList } from "@/components/ProductsList";

const Products = async () => {
  const host = headers().get("host");
  const protocal = process.env.NODE_ENV === "development" ? "http" : "https";
  const req = await fetch(`${protocal}://${host}/api/products`, { next: { revalidate: 100 } });
  const res = await req.json();
  const products: ProductSchemaProps[] = res.data;

  return (
    <div>
      <h2 className="text-zinc-600 text-3xl">Products</h2>
      <Section>
        <div className="flex flex-col"></div>
      </Section>
      <Section>
        <ProductsList products={products} />
      </Section>
    </div>
  );
};

export default Products;
