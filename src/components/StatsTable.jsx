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

function StatsTable({ stats, mode, compareTo = null }) {
  if (!stats) return <Typography>No stats available.</Typography>;

  const displayStats = mode === 'perGame' ? stats.perGame : stats.season;
  const compareStats = compareTo?.seasonStats?.[mode] || {};
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
            {entries.map(([key, val], i) => {
              const current = parseFloat(val);
              const compare = parseFloat(compareStats[key]);
              let color = 'inherit';

              if (!isNaN(current) && !isNaN(compare)) {
                if (current > compare) color = 'green';
                else if (current < compare) color = 'red';
              }

              return (
                <TableRow key={i}>
                  <TableCell sx={{ fontWeight: 500 }}>{key}</TableCell>
                  <TableCell align="right" sx={{ color }}>{val}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StatsTable;