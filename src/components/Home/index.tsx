import Footer from "../Footer";
import Header from "../Header";
import { PokemonList } from "../PokemonList";
import { Section } from "../Section";

type PokemonsProps = {
  name: string;
  url: string;
};
type ApiResponse = {
  results: PokemonsProps[];
};

const getData = async (): Promise<PokemonsProps[]> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon")
    .then((res) => res.json())
    .then((data: ApiResponse) => data.results);
  if (!res) throw new Error("Failed to Fetch Data!");
  return res;
};

const Home = async () => {
  const pokemons = await getData();
  return (
    <>
      <Header isAdm={false} />
      <main>
        <Section>
          <PokemonList pokemonsList={pokemons} />
        </Section>
        <Section>
          <div></div>
        </Section>
      </main>
      <Footer />
    </>
  );
};

export { Home };
