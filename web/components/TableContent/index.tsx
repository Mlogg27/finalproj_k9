import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

interface Props {
  rows: Record<any, any>[];
  columns: GridColDef[];
  paginationModel: Record<any, any>;
}

const TableContent: React.FC<Props> = ({ rows, columns, paginationModel }) => {
  const enhancedColumns: GridColDef[] = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => console.log('Edit:', params.row.id)}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => console.log('Remove:', params.row.id)}
          >
            Remove
          </Button>
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={enhancedColumns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};

export default React.memo(TableContent);
