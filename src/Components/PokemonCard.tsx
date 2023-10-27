import React from 'react';

interface Pokemon {
  name: string;
  id: number;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <h2>{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>
      <img src= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt=''/>
    </div>
  );
};

export default PokemonCard;