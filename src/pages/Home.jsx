import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button
} from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import BigBoardFilters from '../components/BigBoardFilters';
import { exportDraftBoardToCSV } from '../utils/exportCSV';
import positionMap from '../data/positionMap';

import playerData from '../data/playerData';
import BigBoardCard from '../components/BigBoardCard';
import './Home.css';

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
    exportDraftBoardToCSV(sortedPlayers, scoutFilter, positionMap);
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
                <BigBoardFilters
                  leagues={leagues}
                  positions={positions}
                  scouts={scouts}
                  selectedLeague={selectedLeague}
                  setSelectedLeague={setSelectedLeague}
                  selectedPosition={selectedPosition}
                  setSelectedPosition={setSelectedPosition}
                  scoutFilter={scoutFilter}
                  setScoutFilter={setScoutFilter}
                  searchText={searchText}
                  setSearchText={setSearchText}
                />
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