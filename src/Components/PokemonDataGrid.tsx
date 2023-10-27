import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


interface Pokemon {
  id: number;
  name: string;
  // Kan legge til flere her
}

interface PokemonDataGridProps {
  pokemonData: Pokemon[];
  onRowClick: (row: Pokemon) => void;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  // Kan legge til flere her
];

//Har et problem her med pagination, den vil bare vise de 20 første, selv om jeg fjerne de knappene i app.tsx

const PokemonDataGrid: React.FC<PokemonDataGridProps> = ({ pokemonData, onRowClick }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={pokemonData} 
        columns={columns} 
        onRowClick={(params) => {
          const selectedRow = params.row as Pokemon;
          onRowClick(selectedRow);
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
         />
    </div>
  );
};

export default PokemonDataGrid;