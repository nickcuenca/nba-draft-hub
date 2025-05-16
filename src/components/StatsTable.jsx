import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

function StatsTable({ stats, mode }) {
  if (!stats) return <Typography>No stats available.</Typography>;

  const displayStats = mode === 'perGame' ? stats.perGame : stats.total;

  if (!displayStats) return <Typography>No {mode} stats found.</Typography>;

  const statKeys = Object.keys(displayStats);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ px: 2, pt: 2 }}>
        {mode === 'perGame' ? 'Per Game Stats' : 'Total Stats'}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {statKeys.map((key) => (
              <TableCell key={key} sx={{ fontWeight: 'bold' }}>{key.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {statKeys.map((key) => (
              <TableCell key={key}>{displayStats[key]}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StatsTable;