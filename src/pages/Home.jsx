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
  'Liam McNeeley': 'SF',
  'Boogie Fland': 'PG',
  'Yves Missi': 'C',
  'Zoom Diallo': 'PG',
  'Jayden Quaintance': 'C',
  'Ian Jackson': 'SG',
  'Jakobe Walter': 'SG',
  'Carlton Carrington': 'PG',
  'Zacharie Perrin': 'PF',
  'Alex Toohey': 'SF',
  'Zvonimir Ivisic': 'C',
  'Isaiah Collier': 'PG',
  'Joan Beringer': 'C',
  'D.J. Wagner': 'SG',
  'Omaha Biliew': 'PF',
  'Nolan Traore': 'PG',
  'Kon Knueppel': 'PG',
  'Mouhamed Faye': 'PF',
  'Eric Dailey Jr.': 'SF',
  'Michael Ruzic': 'SF',
  'Sergio De Larrea': 'SG',
  'Bogoljub Markovic': 'PF',
  'Ben Saraf': 'PG',
  'Hugo Gonzalez': 'SF',
  'Ryan Kalkbrenner': 'C',
  'Danny Wolf': 'C',
  'Elmarko Jackson': 'PG',
  'Johann Grunloh': 'C',
  'Maxime Raynaud': 'C',
  'Cedric Coward': 'SF',
  'Yaxel Lendeborg': 'PF',
  'Joseph Tugler': 'PF',
  'Chaz Lanier': 'SG',
  'Kam Jones': 'SG',
  'Sion James': 'SG',
  'Tyrese Proctor': 'PG',
  'Nique Clifford': 'SF',
  'Tristan da Silva': 'PF',
  'Johni Broome': 'C',
  'Kel’el Ware': 'C',
  'Jaxson Robinson': 'SG',
  'PJ Hall': 'PF',
  'Kevin McCullar': 'SF',
  'DaRon Holmes': 'C',
  'Trevon Brazile': 'PF',
  'Mark Sears': 'PG',
  'Reece Beekman': 'PG',
  'Tamin Lipsey': 'PG',
  'Pop Isaacs': 'PG',
  'Tucker DeVries': 'SF',
  'Caleb Love': 'SG',
  'Kobe Brea': 'SG'
};

const positions = [...new Set(Object.values(positionMap))].sort();

function Home() {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [scoutFilter, setScoutFilter] = useState('');
  const [showTiers, setShowTiers] = useState(false);
  const [searchText, setSearchText] = useState('');

  const leagues = [...new Set(playerData.map(p => p.league).filter(Boolean))].sort();
  const scouts = ['ESPN', 'Sam Vecenie', 'Kevin O\'Connor', 'Kyle Boone', 'Gary Parrish'];

  const filteredPlayers = playerData
    .filter(player => selectedLeague ? player.league === selectedLeague : true)
    .filter(player => player.name.toLowerCase().includes(searchText.toLowerCase()))
    .filter(player => {
      const position = positionMap[player.name];
      return selectedPosition ? position === selectedPosition : true;
    });

  const sortedPlayers = scoutFilter
    ? [...filteredPlayers].sort((a, b) => {
        const aRank = a.rankings.find(r => r.scout.includes(scoutFilter))?.rank ?? Infinity;
        const bRank = b.rankings.find(r => r.scout.includes(scoutFilter))?.rank ?? Infinity;
        return aRank - bRank;
      })
    : [...filteredPlayers].sort((a, b) => {
        const avgRank = (p) => {
          const validRanks = p.rankings.map(r => r.rank).filter(r => typeof r === 'number');
          const sum = validRanks.reduce((acc, r) => acc + r, 0);
          return validRanks.length ? sum / validRanks.length : Infinity;
        };
        return avgRank(a) - avgRank(b);
      });

  const tiers = [
    { label: 'Tier 1', range: [0, 7] },
    { label: 'Tier 2', range: [8, 20] },
    { label: 'Tier 3', range: [21, 40] },
    { label: 'Tier 4', range: [41, 59] }
  ];

  const handleExport = () => {
    const exportData = sortedPlayers.map((p, i) => ({
      Rank: scoutFilter ? i + 1 : '',
      Name: p.name,
      Team: p.currentTeam,
      League: p.league,
      Position: positionMap[p.name] || 'N/A'
    }));

    const csv = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(obj => Object.values(obj).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'draft_board.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="big-board-wrapper">
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
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ minWidth: 180 }}
        />

        <FormControl size="small">
          <InputLabel>Filter by League</InputLabel>
          <Select
            value={selectedLeague}
            label="Filter by League"
            onChange={(e) => setSelectedLeague(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            {leagues.map(league => (
              <MenuItem key={league} value={league}>{league}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Filter by Position</InputLabel>
          <Select
            value={selectedPosition}
            label="Filter by Position"
            onChange={(e) => setSelectedPosition(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            {positions.map(pos => (
              <MenuItem key={pos} value={pos}>{pos}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Sort by Scout Rank</InputLabel>
          <Select
            value={scoutFilter}
            label="Sort by Scout Rank"
            onChange={(e) => setScoutFilter(e.target.value)}
            sx={{ minWidth: 170 }}
          >
            <MenuItem value="">None</MenuItem>
            {scouts.map(scout => (
              <MenuItem key={scout} value={scout}>{scout}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowTiers(!showTiers)}
        >
          {showTiers ? 'Show as Flat List' : 'Show by Tier'}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleExport}
        >
          Export CSV
        </Button>
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2, pl: 1, color: 'white' }}>
        Showing {sortedPlayers.length} Player{sortedPlayers.length !== 1 ? 's' : ''}
      </Typography>

      <div className="big-board-grid-wrapper">
        <Grid container spacing={2}>
          {showTiers
            ? tiers.map(({ label, range }) => {
                const tierPlayers = sortedPlayers.slice(range[0], range[1] + 1);
                if (tierPlayers.length === 0) return null;

                return (
                  <React.Fragment key={label}>
                    <Typography variant="h6" className="tier-label" sx={{ width: '100%', mt: 4, mb: 2 }}>
                      {label}
                    </Typography>

                    {tierPlayers.map((player, index) => (
                      <Grid
                        item
                        key={player.playerId}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2.4}
                        display="flex"
                        justifyContent="center"
                      >
                        <BigBoardCard
                          player={{ ...player, position: positionMap[player.name] || 'N/A' }}
                          rank={scoutFilter ? range[0] + index + 1 : index + 1}
                          isTop10={range[0] + index < 10}
                        />
                      </Grid>
                    ))}
                  </React.Fragment>
                );
              })
            : sortedPlayers.map((player, index) => (
                <Grid
                  item
                  key={player.playerId}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2.4}
                  display="flex"
                  justifyContent="center"
                >
                  <BigBoardCard
                    player={{ ...player, position: positionMap[player.name] || 'N/A' }}
                    rank={index + 1}
                    isTop10={index < 10}
                  />
                </Grid>
              ))}
        </Grid>
      </div>
    </div>
  );
}

export default Home;