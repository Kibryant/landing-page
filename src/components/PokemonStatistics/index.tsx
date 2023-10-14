'use client'

import { useCallback, useEffect, useState } from 'react'

type Pokemon = {
    name?: string
    height: number
    weight: number
}

type PokemonStatisticsProps = {
    url: string
}

const PokemonStatistics = ({ url }: PokemonStatisticsProps) => {
    const [pokemonStatistics, setPokemonStatistics] = useState<Pokemon>({
        name: '',
        height: 0,
        weight: 0,
    })

    const handleFetch = useCallback(async () => {
        // const controller = new AbortController();
        const req = await fetch(url /*, { signal: controller.signal } */)
        const res: Pokemon = await req.json()
        setPokemonStatistics({ name: res.name, height: res.height, weight: res.weight })
    }, [url])

    useEffect(() => {
        // fetch(`https://pokeapi.co/api/v2/pokemon/${index}`, { signal: controller.signal })
        //   .then((res) => res.json())
        //   .then((data: Pokemon) => {
        //     console.log(data);
        //     setPokemonStatistics({
        //       height: data.height,
        //       weight: data.weight
        //     });
        //   });
        handleFetch()
        // return () => {
        // ESSE RETURN SÓ É CHAMADO QUANDO O COMPONENTE É DESMONTANDO!
        // controller.abort();
        // };
    }, [handleFetch, url])

    return (
        <div className="flex flex-col justify-between">
            <h3 className="text-xl capitalize">{pokemonStatistics.name} Statistics!</h3>
            <p className="">Height: {pokemonStatistics.height}</p>
            <p className="">Weight: {pokemonStatistics.weight}</p>
        </div>
    )
}

export { PokemonStatistics }
