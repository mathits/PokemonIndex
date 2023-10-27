import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PokemonData {
  name: string;
  picture: string;
  id: number;
  weight: number;
  height: number;
  types: string[];
}

const BulbasaurInfo: React.FC = () => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/1/');
        const data = response.data;

        const bulbasaurData: PokemonData = {
          name: data.name,
          picture: data.sprites.front_default,
          id: data.id,
          weight: data.weight,
          height: data.height,
          types: data.types.map((type: { type: { name: string } }) => type.type.name),
        };

        setPokemonInfo(bulbasaurData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div>
      {pokemonInfo && (
        <div>
          <h2>{pokemonInfo.name}</h2>
          <img src={pokemonInfo.picture} alt={pokemonInfo.name} />
          <p>ID: {pokemonInfo.id}</p>
          <p>Weight: {pokemonInfo.weight} kg</p>
          <p>Height: {pokemonInfo.height} dm</p>
          <p>Types: {pokemonInfo.types.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default BulbasaurInfo;
