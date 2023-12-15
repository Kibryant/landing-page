import { z } from 'zod'

const productSchema = z.object({
    myProductId: z.string().nonempty('ID of procuts is necessary!'),
    name: z.string().min(1, 'Invalid Product!').nonempty('Name of Product is necessary!'),
    description: z.string().min(8, 'Invalid Description!').nonempty('Description is necessary!'),
    price: z
        .string()
        .min(0)
        .nonempty()
        .refine((price) => /^\d+(\.\d{1,2})?$/.test(price), {
            message: 'Price invalid can not contain words!',
        }),
    category: z.string().nonempty('Category of Product is necessary!'),
})

type ProductSchemaProps = z.infer<typeof productSchema>

export type { ProductSchemaProps }
export { productSchema }
