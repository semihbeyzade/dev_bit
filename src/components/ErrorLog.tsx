import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface ErrorData {
  date: number;
  level: string;
  quelle: number;
  status: number;
  id_user: number,
  id_firma: number;
  id_car: number;
  id_data: number;
  id_proto: number;
  id_portal: number;
  msg: string;
  // Diğer özellikler
}

const ErrorLog = () => {
  const [errorData, setErrorData] = useState<ErrorData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post<ErrorData[]>(
        'https://data.autohaus-digital.de/log/v1/search/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1/-1'
      );
      setErrorData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(errorData);

  return (
    <TableContainer component={Paper} style={{ width: '100%', height: '100vh' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Datum</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Quelle</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Firma</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Fahrzeug ID</TableCell>
            <TableCell>Data ID</TableCell>
            <TableCell>Protokoll ID</TableCell>
            <TableCell>Portal</TableCell>
            <TableCell>Kurzbeschreibung</TableCell>
            {/* Diğer sütunlar */}
          </TableRow>
        </TableHead>
        <TableBody>
          {errorData.map((error,index) => (
            <TableRow key={index}>
              <TableCell>{error.date}</TableCell>
              <TableCell>{error.level}</TableCell>
              <TableCell>{error.quelle}</TableCell>
              <TableCell>{error.status}</TableCell>
              <TableCell>{error.id_firma}</TableCell>
              <TableCell>{error.id_user}</TableCell>
              <TableCell>{error.id_car}</TableCell>
              <TableCell>{error.id_data}</TableCell>
              <TableCell>{error.id_proto}</TableCell>
              <TableCell>{error.id_portal}</TableCell>
              <TableCell>{error.msg}</TableCell>
              {/* Diğer sütunlar */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


export default ErrorLog;