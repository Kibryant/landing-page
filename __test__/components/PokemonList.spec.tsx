import { PokemonList } from '@/components/PokemonList'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

let globalFetch: jest.Mock

// jest.spyOn(global, 'fetch').mockImplementation(
//     jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ data: 100 }) })) as jest.Mock,
// )

beforeAll(() => {
    globalFetch = jest.fn()
    global.fetch = globalFetch
})

beforeEach(() => {
    globalFetch.mockClear()
})

afterEach(() => {
    jest.restoreAllMocks()
    globalFetch.mockClear()
})

afterAll(() => {
    global.fetch = jest.requireActual('node-fetch')
})

test('It should render the pokemon list and show stats on click', async () => {
    const mockPokemonsList = [
        { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'Charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    ]

    globalFetch.mockResolvedValue({
        json: async () => ({ results: mockPokemonsList }),
    })

    const { getByRole, getByText } = render(<PokemonList pokemonsList={mockPokemonsList} />)

    const pikachuButton = screen.getByText('Pikachu')
    const charizardButton = screen.getByText('Charizard')

    expect(pikachuButton).toBeInTheDocument()
    expect(charizardButton).toBeInTheDocument()

    const pikachuStats = screen.queryByText('Pikachu Statistics')
    const charizardStats = screen.queryByText('Charizard Statistics')

    expect(pikachuStats).not.toBeInTheDocument()
    expect(charizardStats).not.toBeInTheDocument()

    await act(async () => {
        fireEvent.click(pikachuButton)
    })

    // await act(async () => {
    //     await new Promise((resolve) => setTimeout(resolve, 2000))
    // })

    const pikachuStatsVisible = getByRole('heading', { name: 'Statistics!' })
    // const pikachuStatsVisible = getByText('Pikachu Statistics!')
    const charizardStatsStillHidden = screen.queryByText('Charizard Statistics!')

    expect(pikachuStatsVisible).toBeInTheDocument()
    expect(charizardStatsStillHidden).not.toBeInTheDocument()
})
