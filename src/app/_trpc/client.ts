'use client'
import { AppRouterProps } from '@/external/trpc'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouterProps>({})
