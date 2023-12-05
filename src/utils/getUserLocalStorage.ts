'use client'

import { UserMongooseDocument } from '@/types/UserMongooseDocument'

export const getUserLocalStorage = () => {
    const userStorage = localStorage.getItem('client-system')

    let user: UserMongooseDocument | null = null

    if (userStorage) {
        user = JSON.parse(userStorage)
    }

    return user
}
