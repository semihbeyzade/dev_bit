import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
// add material ui styles

//{
//   "id": 3062496,
//   "date": 1681532388716,
//   "id_firma": 30161,
//   "id_user": 0,
//   "id_car": 0,
//   "id_data": 0,
//   "level": 2,
//   "quelle": 9,
//   "msg": "runtimeError at https://www.fugel-gruppe.de/suche/?fahrzeugtyp=gebrauchtfahrzeug - ChunkLoadError: Loading chunk 734 failed.\n(error: https://hpt.autohaus-digital.de/static/js/734.b7ce874c1c57db480ce1.chunk.js)\n    at i.f.j (https://hpt.autohaus-digital.de/main.js?ts=1681475670139:1:4671)\n    at https://hpt.autohaus-digital.de/main.js?ts=1681475670139:1:1040\n    at Array.reduce (<anonymous>)\n    at i.e (https://hpt.autohaus-digital.de/main.js?ts=1681475670139:1:1005)\n    at https://hpt.autohaus-digital.de/static/js/841.949fcd98e33e601b1be4.chunk.js:1:99033\n    at j (https://hpt.autohaus-digital.de/static/js/284.33bef2141e325b1d4875.chunk.js:102:377562)\n    at Pu (https://hpt.autohaus-digital.de/static/js/284.33bef2141e325b1d4875.chunk.js:102:344886)\n    at wl (https://hpt.autohaus-digital.de/static/js/284.33bef2141e325b1d4875.chunk.js:102:333566)\n    at yl (https://hpt.autohaus-digital.de/static/js/284.33bef2141e325b1d4875.chunk.js:102:333494)\n    at vl (https://hpt.autohaus-digital.de/static/js/284.33bef2141e325b1d4875.chunk.js:102:333357)\n",
//   "id_portal": 0,
//   "id_proto": 0,
//   "status": 0
// }
interface ErrorData {
  id: number;
  date: number;
  id_firma: number;
  id_user: number;
  id_car: number;
  id_data: number;
  level: number;
  quelle: number;
  msg: string;
  id_portal: number;
  id_proto: number;
  status: number;
}

// https://data.autohaus-digital.de/log/v1/search/{idCustomer}/{idUser}/-1/-1/-1/{level}/{source}/{dateFrom}/{dateTo}/{limit}/-1
const ErrorLog = () => {
  const [errorData, setErrorData] = useState<ErrorData[]>([]);

  const [filter, setFilter] = useState<{
    idCustomer: number;
    idUser: number;
    level: number;
    source: number;
    dateFrom: number;
    dateTo: number;
    limit: number;
  }>({
    idCustomer: -1,
    idUser: -1,
    level: -1,
    source: -1,
    dateFrom: -1,
    dateTo: -1,
    limit: 20,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const getFilteredApiUrl = () => {
    return `https://data.autohaus-digital.de/log/v1/search/${filter.idCustomer}/${filter.idUser}/-1/-1/-1/${filter.level}/${filter.source}/${filter.dateFrom}/${filter.dateTo}/${filter.limit}/-1`;
  };

  const fetchData = async () => {
    try {
      const response = await axios.post<ErrorData[]>(getFilteredApiUrl());
      setErrorData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const hadnleFilterChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* add mui drawer for filtering */}
      <Box sx={{ display: 'flex' }}>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'
        >
          <TextField
            id='outlined-basic'
            label='ID Customer'
            variant='outlined'
            name='idCustomer'
            value={filter.idCustomer}
            onChange={hadnleFilterChange}
          />
          <TextField
            id='outlined-basic'
            label='ID User'
            variant='outlined'
            name='idUser'
            value={filter.idUser}
            onChange={hadnleFilterChange}
          />
          <TextField id='outlined-basic' label='Level' variant='outlined' name='level' value={filter.level} onChange={hadnleFilterChange} />
          <TextField
            id='outlined-basic'
            label='Source'
            variant='outlined'
            name='source'
            value={filter.source}
            onChange={hadnleFilterChange}
          />
          <TextField
            id='outlined-basic'
            label='Date From'
            variant='outlined'
            name='dateFrom'
            value={filter.dateFrom}
            onChange={hadnleFilterChange}
          />
          <TextField
            id='outlined-basic'
            label='Date To'
            variant='outlined'
            name='dateTo'
            value={filter.dateTo}
            onChange={hadnleFilterChange}
          />
          <TextField id='outlined-basic' label='Limit' variant='outlined' name='limit' value={filter.limit} onChange={hadnleFilterChange} />
        </Box>
      </Box>
      {/* add button to refetch */}
      <Box sx={{ display: 'flex' }}>
        <Button variant='contained' onClick={fetchData}>
          Filter
        </Button>
      </Box>

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
            {errorData.map((error, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(error.date).toLocaleString()}</TableCell>
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
    </div>
  );
};

export default ErrorLog;