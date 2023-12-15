'use client'

import { UserMongooseDocument } from '@/types/UserMongooseDocument'
import { localstorage } from '.'

export const getUserLocalStorage = () => {
    const userStorage = localstorage?.getItem('client-system')

    let user: UserMongooseDocument | null = null

    if (userStorage) {
        user = JSON.parse(userStorage)
    }

    return user
}
