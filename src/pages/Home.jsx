import React, { useState } from 'react';
import {
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Button,
  TextField
} from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

import playerData from '../data/playerData';
import BigBoardCard from '../components/BigBoardCard';
import './Home.css';

const positionMap = {
  'Cooper Flagg': 'PF',
  'Dylan Harper': 'SG',
  'Ace Bailey': 'SF',
  'VJ Edgecombe': 'SG',
  'Tre Johnson': 'SG',
  'Kasparas Jakucionis': 'PG',
  'Kon Kneuppel': 'SF',
  'Derik Queen': 'C',
  'Jeremiah Fears': 'PG',
  'Khaman Maluach': 'C',
  'Collin Murray-Boyles ': 'PF',
  'Liam McNeeley': 'SF',
  'Egor Demin': 'SG',
  'Jase Richardson': 'PG',
  'Nolan Traore': 'PG',
  'Joan Beringer': 'C',
  'Noa Essengue': 'PF',
  'Asa Newell': 'PF',
  'Danny Wolf': 'C',
  'Rasheer Fleming': 'PF',
  'Nique Clifford': 'SF',
  'Carter Bryant': 'SF',
  'Thomas Sorber': 'C',
  'Hugo Gonzalez': 'SF',
  'Drake Powell': 'SG',
  'Ben Saraf': 'PG',
  'Will Riley': 'SF',
  'Noah Penda': 'PF',
  'Ryan Kalkbrenner': 'C',
  'Adou Thiero': 'SF',
  'Alex Condon': 'C',
  'Alex Karaban': 'SF',
  'Miles Byrd': 'SG',
  'Ian Jackson': 'SG',
  'Maxime Raynaud': 'C',
  'Johni Broome': 'C',
  'Sergio De Larrea': 'SG',
  'Alex Toohey': 'SF',
  'Tyrese Proctor': 'PG',
  'Kam Jones': 'SG',
  'Boogie Fland': 'PG',
  'Joseph Tugler': 'PF',
  'Yaxel Lendeborg': 'PF',
  'Darrion Williams': 'SF',
  'Chaz Lanier': 'SG',
  'Eric Dixon': 'C',
  'Michael Ruzic': 'SF',
  'Dink Pate': 'PG',
  'Bogoljub Markovic': 'PF',
  'Johann Grunloh': 'C',
  'Isaiah Evans': 'SF',
  'Rocco Zikarsky': 'C',
  'Cedric Coward': 'SF',
  'Sion James': 'SG',
  'Mouhamed Faye': 'PF',
  'Zvonimir Ivisic': 'C',
  'JT Toppin': 'PF',
  'Hunter Sallis': 'SG',
  'Koby Brea': 'SG',
  'Malique Lewis': 'SF'
};

const positions = [...new Set(Object.values(positionMap))].sort();

function Home() {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [scoutFilter, setScoutFilter] = useState('');
  const [showTiers, setShowTiers] = useState(false);
  const [searchText, setSearchText] = useState('');

  const leagues = [...new Set(playerData.map(p => p.league).filter(Boolean))].sort();
  const scouts = ['ESPN', 'Sam Vecenie', "Kevin O'Connor", 'Kyle Boone', 'Gary Parrish'];

  const filteredPlayers = playerData
    .filter(p => (selectedLeague ? p.league === selectedLeague : true))
    .filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
    .filter(p => (selectedPosition ? positionMap[p.name] === selectedPosition : true));

  const sortedPlayers = scoutFilter
    ? [...filteredPlayers].sort((a, b) => {
        const aRank = a.rankings.find(r => r.scout.includes(scoutFilter))?.rank ?? Infinity;
        const bRank = b.rankings.find(r => r.scout.includes(scoutFilter))?.rank ?? Infinity;
        return aRank - bRank;
      })
    : [...filteredPlayers].sort((a, b) => {
        const avg = p => {
          const vals = p.rankings.map(r => r.rank).filter(n => typeof n === 'number');
          return vals.length ? vals.reduce((s, n) => s + n, 0) / vals.length : Infinity;
        };
        return avg(a) - avg(b);
      });

  const tiers = [
    { label: 'Tier 1', range: [0, 7] },
    { label: 'Tier 2', range: [8, 20] },
    { label: 'Tier 3', range: [21, 40] },
    { label: 'Tier 4', range: [41, 59] }
  ];

  const handleExport = () => {
    const rows = sortedPlayers.map((p, i) => ({
      Rank: scoutFilter ? i + 1 : '',
      Name: p.name,
      Team: p.currentTeam,
      League: p.league,
      Position: positionMap[p.name] || 'N/A'
    }));
    const csv = [Object.keys(rows[0]).join(','), ...rows.map(r => Object.values(r).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'draft_board.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="big-board-wrapper">
        <div className="big-board-inner">
          <div className="top-bar">
            <Box className="top-left">
              <Box className="title-bar">
                <SportsBasketballIcon fontSize="large" sx={{ color: 'orange', mr: 1 }} />
                <Typography variant="h4">Mavericks Draft Big Board</Typography>
              </Box>
              <Box className="filters-box">
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
                  <Select value={selectedLeague} label="Filter by League" onChange={e => setSelectedLeague(e.target.value)} sx={{ minWidth: 150 }}>
                    <MenuItem value="">All</MenuItem>
                    {leagues.map(l => (
                      <MenuItem key={l} value={l}>{l}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small">
                  <InputLabel>Filter by Position</InputLabel>
                  <Select value={selectedPosition} label="Filter by Position" onChange={e => setSelectedPosition(e.target.value)} sx={{ minWidth: 150 }}>
                    <MenuItem value="">All</MenuItem>
                    {positions.map(p => (
                      <MenuItem key={p} value={p}>{p}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small">
                  <InputLabel>Sort by Scout Rank</InputLabel>
                  <Select value={scoutFilter} label="Sort by Scout Rank" onChange={e => setScoutFilter(e.target.value)} sx={{ minWidth: 170 }}>
                    <MenuItem value="">None</MenuItem>
                    {scouts.map(s => (
                      <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box className="top-right">
              <Button variant="contained" color="secondary" onClick={() => setShowTiers(!showTiers)} sx={{ marginRight: '10px' }}>
                {showTiers ? 'Show as Flat List' : 'Show by Tier'}
              </Button>
              <Button variant="contained" color="primary" onClick={handleExport}>Export CSV</Button>
            </Box>
          </div>

          <Typography variant="subtitle1" sx={{ mb: 2, pl: 1, color: 'white' }}>
            Showing {sortedPlayers.length} Player{sortedPlayers.length !== 1 ? 's' : ''}
          </Typography>
        </div>

        <div className="big-board-grid-wrapper">
          <Grid container spacing={2} justifyContent="center">
            {(showTiers ? tiers.flatMap(({ label, range }) => {
              const tierPlayers = sortedPlayers.slice(range[0], range[1] + 1);
              if (!tierPlayers.length) return [];
              return [
                <Typography key={label} variant="h6" className="tier-label" sx={{ width: '100%', mt: 4, mb: 2 }}>{label}</Typography>,
                ...tierPlayers.map((player, idx) => (
                  <Grid item key={player.playerId} xs={12} sm={6} md={4} lg={3} xl={2.4} display="flex" justifyContent="center">
                    <BigBoardCard player={{ ...player, position: positionMap[player.name] || 'N/A' }} rank={range[0] + idx + 1} isTop10={range[0] + idx < 10} />
                  </Grid>
                ))
              ];
            }) : sortedPlayers.map((player, index) => (
              <Grid item key={player.playerId} xs={12} sm={6} md={4} lg={3} xl={2.4} display="flex" justifyContent="center">
                <BigBoardCard player={{ ...player, position: positionMap[player.name] || 'N/A' }} rank={index + 1} isTop10={index < 10} />
              </Grid>
            )))}
          </Grid>
        </div>
      </div>

      <Box className="app-footer">
        <Typography variant="body2" color="white" align="center" sx={{ py: 2 }}>
          © {new Date().getFullYear()} Nicolas Cuenca — Built for the Dallas Mavericks
        </Typography>
      </Box>
    </>
  );
}

export default Home;