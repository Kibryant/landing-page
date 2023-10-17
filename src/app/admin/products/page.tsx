'use client'

import { Section } from '@/components/Section'
import { type ProductSchemaProps, productSchema } from '@/schemas/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import type { ResProps } from '@/types/class/Response'

export default function ProductsPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductSchemaProps>({
        resolver: zodResolver(productSchema),
    })

    const [errorMessage, setMessageErro] = useState('')
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleSubmitForm: SubmitHandler<ProductSchemaProps> = async ({ id, product, description, price }) => {
        try {
            await fetch('/api/adm/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    product,
                    description,
                    price,
                }),
            }).then(async (result) => {
                const res: ResProps = await result.json()

                if (res.status !== 201) {
                    setMessageErro(res.message)
                    return
                }

                setSuccessMessage(res.message)
            })
        } catch (err) {
            // handleError(`Error: ${error}`);
            console.log(err)
        }
    }

    return (
        <Section>
            <h2 className="text-3xl text-white">Products Page</h2>
            <div className="w-full justify-center items-center shadow-lg mt-4 flex rounded-md p-4 overflow-hidden">
                <div className="w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-3xl text-primary font-semibold">Add Your Products</h2>
                    <p className="text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci ut commodi, voluptatem
                        perspiciatis non repellat esse facilis magni, harum natus dolor, maxime fuga sed sequi ipsa
                        eveniet impedit odio!
                    </p>
                </div>
                <form
                    className="w-1/2 py-16 px-12 flex flex-col justify-center items-center gap-4 p-4"
                    onSubmit={handleSubmit(handleSubmitForm)}
                >
                    <h2 className="text-3xl text-zinc-600 font-extralight">Add a Product</h2>
                    <p className="text-zinc-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    {!!errorMessage && <span className="text-destructive">{errorMessage}</span>}
                    <div className="w-full flex gap-1 flex-col justify-start">
                        <label className="text-zinc-300 text-lg" htmlFor="">
                            ID
                        </label>
                        <input
                            type="text"
                            {...register('id')}
                            className="bg-transparent outline-none text-white rounded-md border-b border-primary w-full duration-150 focus:border-b-2"
                        />
                        {!!errors.id?.message && <span className="text-destructive">{errors.id.message}</span>}
                    </div>
                    <div className="w-full flex gap-1 flex-col justify-start">
                        <label className="text-zinc-300 text-lg" htmlFor="">
                            NAME PRODUCT
                        </label>
                        <input
                            type="text"
                            {...register('product')}
                            className="bg-transparent outline-none text-white rounded-md border-b border-primary w-full duration-150 focus:border-b-2"
                        />
                        {!!errors.product?.message && (
                            <span className="text-destructive">{errors.product.message}</span>
                        )}
                    </div>
                    <div className="w-full flex gap-1 flex-col justify-start">
                        <label className="text-zinc-300 text-lg" htmlFor="">
                            DESCRIPTION
                        </label>
                        <input
                            type="text"
                            {...register('description')}
                            className="bg-transparent outline-none text-white rounded-md border-b border-primary w-full duration-150 focus:border-b-2"
                        />
                        {!!errors.description?.message && (
                            <span className="text-destructive">{errors.description.message}</span>
                        )}
                    </div>
                    <div className="w-full flex gap-1 flex-col justify-start">
                        <label className="text-zinc-300 text-lg" htmlFor="">
                            PRICE
                        </label>
                        <input
                            type="text"
                            {...register('price')}
                            className="bg-transparent outline-none text-white rounded-md border-b border-primary w-full duration-150 focus:border-b-2"
                        />
                        {!!errors.price?.message && <span className="text-destructive">{errors.price.message}</span>}
                    </div>
                    {!!successMessage && <span className="text-green-500">{successMessage}</span>}
                    <div className="w-full">
                        <button
                            type="submit"
                            className="uppercase w-full text-white font-medium tracking-widest bg-primary py-2 px-4 rounded-md text-center"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </Section>
    )
}
