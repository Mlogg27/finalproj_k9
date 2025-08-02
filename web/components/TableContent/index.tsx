import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface Props {
  columns: { field: string; headerName: string; width: number }[];
  rows: {
    id: any;
    name: any;
    email: any;
    phone: any;
    type: any;
    location: any;
    createTime: string;
  }[];
  paginationModel: { page: number; pageSize: number };
  onApprove: (e: any) => void;
  onRemove: (e: any) => void;
  showEdit: boolean;
}

const TableContent: React.FC<Props> = ({ rows, columns, paginationModel, onApprove, onRemove }) => {
  const enhancedColumns: GridColDef[] = columns.map((col) => ({
    ...col,
    headerAlign: 'center',
    align: 'center'
  })) as GridColDef[];

  enhancedColumns.push({
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <div className='flex h-full gap-x-[8px] justify-center items-center'>
        <button className={'max-h-[35px] px-[1px] flex justify-center items-center bg-[#2c2c2c] text-white rounded-[3px]'}
                onClick={() =>{
                  onApprove(params.row)
                }}>Approve</button>
        <button className={'max-h-[35px] px-[1px] flex justify-center items-center bg-[#2c2c2c] text-white rounded-[3px]'}
                onClick={()=>{
                  onRemove(params.row)
                }}>Remove</button>
      </div>
    ),
    sortable: false,
    filterable: false,
  } as GridColDef);

  return (
    <>
      <Paper sx={{ height: 400, width: '1260px' }}>
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
