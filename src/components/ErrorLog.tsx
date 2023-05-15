import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';

interface ErrorData {
  idUser: number;
  message: string;
  level: number;
  source: number;
  // Diğer özellikler
}

const ErrorLog: React.FC = () => {
  const [errorData, setErrorData] = useState<GridRowId[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post<ErrorData[]>(
        'https://data.autohaus-digital.de/log/v1/search/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1'
      );
        setErrorData(response.data);
   /*   setErrorData(response.data.map((error) => ({ id: error.id, message: error.message, level: error.level, source: error.source }))); */
    } catch (error) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'message', headerName: 'Error Message', width: 300 },
    { field: 'level', headerName: 'Level', width: 150 },
    { field: 'source', headerName: 'Source', width: 150 },
    // Diğer sütunlar
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={errorData} columns={columns} pagination />
    </div>
  );
};

export default ErrorLog;