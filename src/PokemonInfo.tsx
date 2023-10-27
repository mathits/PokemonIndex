import React, { useEffect, useState } from 'react';
import axios from 'axios';

// burde brukt Material UI card her kanskje
interface PokemonData {
  name: string;
  picture: string;
  id: number;
  weight: number;
  height: number;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
}

interface Props {
  pokemonId: number;
}

const PokemonInfo: React.FC<Props> = ({ pokemonId }) => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
        const data = response.data;

        const pokemonData: PokemonData = {
          name: data.name,
          picture: data.sprites.front_default,
          id: data.id,
          weight: data.weight,
          height: data.height,
          types: data.types.map((type: { type: { name: string } }) => type.type.name),
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
        
        }; 

        setPokemonInfo(pokemonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  return (
    <div>
      {pokemonInfo ? (
        <div>
          <h2>{pokemonInfo.name}</h2>
          <img src={pokemonInfo.picture} alt={pokemonInfo.name} />
          <p>ID: {pokemonInfo.id}</p>
          <p>Weight: {pokemonInfo.weight} kg</p>
          <p>Height: {pokemonInfo.height} dm</p>
          <p>Types: {pokemonInfo.types.join(', ')}</p>
          <p>HP: {pokemonInfo.hp}</p>
          <p>Attack: {pokemonInfo.attack}</p>
          <p>Defense: {pokemonInfo.defense}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonInfo;