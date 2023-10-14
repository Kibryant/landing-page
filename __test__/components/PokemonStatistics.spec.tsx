import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { PokemonStatistics } from '@/components/PokemonStatistics'

beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    name: 'Pikachu',
                    height: 40,
                    weight: 6,
                }),
        }),
    ) as jest.Mock
})

afterAll(() => {
    // @ts-expect-error i dont know why
    global.fetch.mockClear()
    // @ts-expect-error i dont know why
    delete global.fetch
})

test('PokemonStatistics component renders correctly', async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/25/'

    render(<PokemonStatistics url={url} />)

    // Você pode usar waitFor para aguardar os elementos aparecerem
    await waitFor(() => {
        expect(screen.getByText('Pikachu Statistics!')).toBeInTheDocument()
        expect(screen.getByText('Height: 40')).toBeInTheDocument()
        expect(screen.getByText('Weight: 6')).toBeInTheDocument()
    })
})
