import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

function StatsTable({ stats, mode }) {
  if (!stats) return <Typography>No stats available.</Typography>;

  const displayStats = mode === 'perGame' ? stats.perGame : stats.season;
  const entries = displayStats ? Object.entries(displayStats) : [];

  return entries.length === 0 ? (
    <Typography>No stats found.</Typography>
  ) : (
    <>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {mode === 'perGame' ? 'Per Game Stats' : 'Season Totals'}
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: '#f9f9f9' }}>
        <Table size="small">
          <TableBody>
            {entries.map(([key, val], i) => (
              <TableRow key={i}>
                <TableCell sx={{ fontWeight: 500 }}>{key}</TableCell>
                <TableCell align="right">{val}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StatsTable;