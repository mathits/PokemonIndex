import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonList from './Components/PokemonList.tsx';
import PokemonDataGrid from './Components/PokemonDataGrid.tsx';
import BulbasaurInfo from './Bulbasaur.tsx';
import PokemonInfo from './PokemonInfo.tsx';

interface Pokemon {
  name: string;
  id: number;
}

function App() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(1)
  const [totalPokemons, setTotalPokemons] = useState(0)


  const loadNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  const loadPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handleRowClick = (row) => {
    console.log('Row clicked:', row);
    setSelectedPokemon(row.id);
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`)
      .then((response) => response.json())
      .then((data) => {
        const promises = data.results.map((pokemon: { name: string; url: string }) => {
          const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0]);
          return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => response.json())
            .then((details) => ({ name: pokemon.name, id: id } as Pokemon));
        });

        Promise.all(promises)
          .then((pokemonWithDetails) => {
            setPokemonData(pokemonWithDetails);
            setTotalPokemons(data.count);
            console.log(data.count);
            setTotalPages(Math.ceil(data.count / 20));
          });
      })
      .catch((error) => console.log(error));
      
  }, [page]);

/*
Min originale Pagination
<div className="pagination">
<button onClick={loadPreviousPage} disabled={page === 1}>
Load Previous Page
</button>
<button onClick={loadNextPage} disabled={page === totalPages}>
Load Next Page
</button>
*/

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon App</h1>
        <p>Mathilde Tedesco Siem</p>
        <div className="pagination">
          <button onClick={loadPreviousPage} disabled={page === 1}>
          Load Previous Page
          </button>
          <button onClick={loadNextPage} disabled={page === totalPages}>Load Next Page</button> </div>
      </header>
      <div className='container'> 
          <div className='left-content'>
            
            <PokemonDataGrid pokemonData={pokemonData} onRowClick={handleRowClick}  />
          </div>
          <div className='right-content'></div>
          
          <PokemonInfo pokemonId={selectedPokemon}/>

      </div>
      
    </div>
  );
}

export default App;
