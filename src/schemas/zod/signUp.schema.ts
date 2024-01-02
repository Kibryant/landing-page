import { z } from 'zod'

const signUpSchema = z
    .object({
        email: z.string().email(),
        username: z.string().min(5, { message: 'The username must contain 5 digits!' }),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: z.string().min(1, 'Please confirm your password'),
        photoURL: z.string().optional(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
    })

type SignUpSchemaInput = z.input<typeof signUpSchema>

export type { SignUpSchemaInput }
export { signUpSchema }
