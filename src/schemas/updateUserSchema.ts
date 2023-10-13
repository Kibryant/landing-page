import { z } from 'zod'

export const updateUserSchema = z
    .object({
        newUsername: z.string().optional(),
        newEmail: z.string().email().optional(),
        newPassword: z.string().optional(),
        currentPassword: z.string().optional(),
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
        path: ['currentPassword'],
        message: 'The new password must be diferent!',
    })

export type UpdateUserSchemaInput = z.input<typeof updateUserSchema>
