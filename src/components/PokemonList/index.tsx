'use client'

import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { PokemonStatistics } from '../PokemonStatistics'
import { useCallback, useEffect, useState } from 'react'

type PokemonsProps = {
    name: string
    url: string
}

type PokemonListProps = {
    pokemonsList: PokemonsProps[]
}
type ApiResponse = {
    results: PokemonsProps[]
}

const PokemonList = ({ pokemonsList }: PokemonListProps) => {
    const [showStats, setShowStats] = useState<boolean[]>(Array(pokemonsList.length).fill(false))
    const [pokemonsListState, setpokemonsListState] = useState(pokemonsList)
    const [offsetNumber, setOffsetNumber] = useState(0)

    const toggleStats = (index: number) => {
        const newShowStats = [...showStats]
        newShowStats[index] = !newShowStats[index]
        setShowStats(newShowStats)
    }

    const getNewPokemons = useCallback(async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offsetNumber}&limit=20`)
            .then((res) => res.json())
            .then((data: ApiResponse) => data.results)
        if (!res) throw new Error('Failed to Fetch Data!')
        setpokemonsListState(res)
    }, [offsetNumber])

    useEffect(() => {
        getNewPokemons()
    }, [getNewPokemons, offsetNumber])

    return (
        <>
            {pokemonsListState.map((pokemon, index) => (
                <div key={index} className="flex  flex-col justify-center px-4 shadow-md py-2 rounded-md mt-3 ">
                    <div className="">
                        <button
                            className="text-primary text-2xl w-full flex justify-between uppercase items-center"
                            onClick={() => toggleStats(index)}
                        >
                            {pokemon.name}
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>
                    </div>
                    {showStats[index] && <PokemonStatistics url={pokemon.url} />}
                </div>
            ))}
            <div className="w-full flex justify-center mt-3">
                <button
                    className="py-2 px-4 w-full bg-emerald-500 rounded-md max-w-md uppercase tracking-widest"
                    onClick={() => setOffsetNumber(offsetNumber + 20)}
                >
                    See New Pokemons
                </button>
            </div>
        </>
    )
}

export { PokemonList }
