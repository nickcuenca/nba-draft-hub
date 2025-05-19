import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';

function BigBoardFilters({
  leagues,
  positions,
  scouts,
  selectedLeague,
  setSelectedLeague,
  selectedPosition,
  setSelectedPosition,
  scoutFilter,
  setScoutFilter,
  searchText,
  setSearchText
}) {
  return (
    <>
      <TextField
        size="small"
        label="Search by Name"
        variant="outlined"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        sx={{ minWidth: 180 }}
      />
      <FormControl size="small">
        <InputLabel>Filter by League</InputLabel>
        <Select
          value={selectedLeague}
          label="Filter by League"
          onChange={e => setSelectedLeague(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {leagues.map(l => (
            <MenuItem key={l} value={l}>{l}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Filter by Position</InputLabel>
        <Select
          value={selectedPosition}
          label="Filter by Position"
          onChange={e => setSelectedPosition(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {positions.map(p => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Sort by Scout Rank</InputLabel>
        <Select
          value={scoutFilter}
          label="Sort by Scout Rank"
          onChange={e => setScoutFilter(e.target.value)}
          sx={{ minWidth: 170 }}
        >
          <MenuItem value="">None</MenuItem>
          {scouts.map(s => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default BigBoardFilters;