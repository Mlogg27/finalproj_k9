import React from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface Props {
  rows: Record<any, any>[];
  columns: GridColDef[];
  paginationModel: Record<any, any>;
}

const TableContent: React.FC<Props> = ({rows, columns, paginationModel} ) =>{
  return (
    <>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  )
}

export default React.memo(TableContent);