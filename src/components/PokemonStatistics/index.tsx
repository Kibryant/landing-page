"use client";

import { useEffect, useState } from "react";

type Pokemon = {
  height: number;
  weight: number;
};

type PokemonStatisticsProps = {
  index: number;
};

const PokemonStatistics = ({ index }: PokemonStatisticsProps) => {
  const [pokemonStatistics, setPokemonStatistics] = useState<Pokemon>({
    height: 0,
    weight: 0
  });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
      .then((res) => res.json())
      .then((data: Pokemon) => {
        console.log(data);
        setPokemonStatistics({
          height: data.height,
          weight: data.weight
        });
      });
  }, [index]);

  return (
    <div className="flex flex-col justify-between">
      <h3 className="text-brandPink text-xl">Pokemon Statistics!</h3>
      <p className="text-zinc-300">Height:{pokemonStatistics.height}</p>
      <p className="text-zinc-300">Weight:{pokemonStatistics.weight}</p>
    </div>
  );
};

export { PokemonStatistics };
