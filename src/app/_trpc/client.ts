'use client'
import { AppRouterProps } from '@/trpc'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouterProps>({})
