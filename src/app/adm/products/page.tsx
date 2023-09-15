"use client";

import { Section } from "@/components/Section";
import { type ProductSchemaProps, productSchema } from "@/schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { ResProps } from "@/types/ResProps";

export default function ProductsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductSchemaProps>({
    resolver: zodResolver(productSchema)
  });

  const [errorMessage, setMessageErro] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmitForm: SubmitHandler<ProductSchemaProps> = async ({ id, product, description, price }) => {
    try {
      await fetch("/api/adm/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          product,
          description,
          price
        })
      }).then(async (result) => {
        const res: ResProps = await result.json();

        if (res.status !== 201) {
          setMessageErro(res.message);
          return;
        }

        setSuccessMessage(res.message);
        return;
      });
    } catch (err) {
      // handleError(`Error: ${error}`);
      console.log(err);
    }
  };

  return (
    <Section>
      <h2 className="text-3xl text-white">Products Page</h2>
      <form
        className="flex flex-col mt-4 justify-center items-center gap-4 w-full rounded-md border p-4"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <h3 className="text-2xl text-white">Add a Product</h3>
        {!!errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <div className="w-full flex gap-1 flex-col justify-start">
          <label className="text-zinc-300 text-lg" htmlFor="">
            ID
          </label>
          <input
            type="text"
            {...register("id")}
            className="bg-transparent outline-none text-white p-2 rounded-md border border-zinc-200 w-full"
          />
          {!!errors.id?.message && <span className="text-red-500">{errors.id.message}</span>}
        </div>
        <div className="w-full flex gap-1 flex-col justify-start">
          <label className="text-zinc-300 text-lg" htmlFor="">
            NAME PRODUCT
          </label>
          <input
            type="text"
            {...register("product")}
            className="bg-transparent outline-none text-white p-2 rounded-md border border-zinc-200 w-full"
          />
          {!!errors.product?.message && <span className="text-red-500">{errors.product.message}</span>}
        </div>
        <div className="w-full flex gap-1 flex-col justify-start">
          <label className="text-zinc-300 text-lg" htmlFor="">
            DESCRIPTION
          </label>
          <input
            type="text"
            {...register("description")}
            className="bg-transparent outline-none text-white p-2 rounded-md border border-zinc-200 w-full"
          />
          {!!errors.description?.message && <span className="text-red-500">{errors.description.message}</span>}
        </div>
        <div className="w-full flex gap-1 flex-col justify-start">
          <label className="text-zinc-300 text-lg" htmlFor="">
            PRICE
          </label>
          <input
            type="text"
            {...register("price")}
            className="bg-transparent outline-none text-white p-2 rounded-md border border-zinc-200 w-full"
          />
          {!!errors.price?.message && <span className="text-red-500">{errors.price.message}</span>}
        </div>
        {!!successMessage && <span className="text-green-500">{successMessage}</span>}
        <div className="w-full">
          <button
            type="submit"
            className="uppercase w-full font-medium tracking-widest bg-emerald-500 py-2 px-4 rounded-md text-center"
          >
            Add
          </button>
        </div>
      </form>
    </Section>
  );
}
