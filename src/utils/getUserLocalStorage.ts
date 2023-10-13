'use client'

import { UserProps } from '@/types/UserProps'

export const getUserLocalStorage = () => {
    const userStorage = localStorage.getItem('client-system')

    let user: UserProps | null = null

    if (userStorage) {
        user = JSON.parse(userStorage)
    }

    return user
}
