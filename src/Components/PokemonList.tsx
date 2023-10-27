import React from 'react';
import PokemonCard from './PokemonCard.tsx';

interface Pokemon {
  name: string;
  id: number;
}

interface PokemonListProps {
  pokemonData: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonData }) => {
  return (
    <div>
      {pokemonData.length > 0 ? (
        <div className="pokemon-list">
          {pokemonData.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonList;