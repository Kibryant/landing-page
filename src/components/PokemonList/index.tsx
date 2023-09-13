"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { PokemonStatistics } from "../PokemonStatistics";
import { useEffect, useState } from "react";

type PokemonsProps = {
  name: string;
  url: string;
};

type PokemonListProps = {
  pokemonsList: PokemonsProps[];
};
type ApiResponse = {
  results: PokemonsProps[];
};

const PokemonList = ({ pokemonsList }: PokemonListProps) => {
  const [showStats, setShowStats] = useState<boolean[]>(Array(pokemonsList.length).fill(false));
  const [pokemonsListState, setpokemonsListState] = useState(pokemonsList);
  const [offsetNumber, setOffsetNumber] = useState(0);

  const toggleStats = (index: number) => {
    const newShowStats = [...showStats];
    newShowStats[index] = !newShowStats[index];
    setShowStats(newShowStats);
  };

  const getNewPokemons = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offsetNumber}&limit=20`)
      .then((res) => res.json())
      .then((data: ApiResponse) => data.results);
    if (!res) throw new Error("Failed to Fetch Data!");
    setpokemonsListState(res);
  };

  useEffect(() => {
    getNewPokemons();
  }, [offsetNumber]);

  return (
    <>
      {pokemonsListState.map((pokemon, index) => (
        <div key={index} className="flex justify-between">
          <div>
            <button
              className="text-brandPink text-2xl flex justify-between uppercase items-center"
              onClick={() => toggleStats(index)}
            >
              {pokemon.name}
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
          {showStats[index] && <PokemonStatistics url={pokemon.url} />}
        </div>
      ))}
      <div className="w-full">
        <button
          className="py-2 px-4 bg-emerald-500 rounded-md max-w-md uppercase tracking-widest"
          onClick={() => setOffsetNumber(offsetNumber + 20)}
        >
          Click Here
        </button>
      </div>
    </>
  );
};

export { PokemonList };
