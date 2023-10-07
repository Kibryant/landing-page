import { z } from 'zod'

const productSchema = z.object({
    id: z.string().nonempty('ID of procuts is necessary!'),
    product: z.string().min(1, 'Invalid Product!').nonempty('Name of Product is necessary!'),
    description: z.string().min(8, 'Invalid Description!').nonempty('Description is necessary!'),
    price: z
        .string()
        .min(0)
        .nonempty()
        .refine((price) => /^\d+(\.\d{1,2})?$/.test(price), {
            message: 'Price invalid can not contain words!',
        }),
})

type ProductSchemaProps = z.infer<typeof productSchema>

export type { ProductSchemaProps }
export { productSchema }
