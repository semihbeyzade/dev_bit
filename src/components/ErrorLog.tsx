import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface ErrorData {
  id: number;
  message: string;
  level: number;
  source: number;
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Error Message</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Source</TableCell>
            {/* Diğer sütunlar */}
          </TableRow>
        </TableHead>
        <TableBody>
          {errorData.map((error) => (
            <TableRow key={error.id}>
              <TableCell>{error.id}</TableCell>
              <TableCell>{error.message}</TableCell>
              <TableCell>{error.level}</TableCell>
              <TableCell>{error.source}</TableCell>
              {/* Diğer sütunlar */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


export default ErrorLog;