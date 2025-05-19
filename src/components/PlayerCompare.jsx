import React, { useState } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import StatsTable from './StatsTable';
import positionMap from '../data/positionMap';
import PlayerRadarChart from '../components/PlayerRadarChart';
import CompareRadarChart from './CompareRadarChart';

function PlayerCompare({ player1, player2, onBack }) {
  const [statMode, setStatMode] = useState('perGame');

  const format = (label, val, unit) => val ? `${val}${unit}` : 'N/A';

  const comparePhysicals = [
    ['Wingspan', 'wingspan', '"', true],
    ['Max Vertical', 'maxVertical', ' in', true],
    ['Sprint', 'sprint', ' s', false], // Lower is better
    ['Agility', 'agility', ' s', false],
    ['Reach', 'reach', '"', true],
    ['Hand Length', 'handLength', ' in', true],
    ['Hand Width', 'handWidth', ' in', true]
  ];

  const getColor = (v1, v2, higherIsBetter) => {
    if (v1 == null || v2 == null) return 'inherit';
    const better = higherIsBetter ? v1 > v2 : v1 < v2;
    return better ? 'green' : 'red';
  };

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Player Comparison
      </Typography>

      <ToggleButtonGroup
          value={statMode}
          exclusive
          onChange={(e, newMode) => newMode && setStatMode(newMode)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4,
            '& .MuiToggleButton-root': {
              backgroundColor: 'white',
              color: '#000',
              border: '1px solid #ccc',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            },
            '& .MuiToggleButton-root.Mui-selected': {
              backgroundColor: '#1976d2 !important',
              color: '#fff !important',
              borderColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0 !important',
              },
            },
          }}
        >
        <ToggleButton value="perGame">PER GAME</ToggleButton>
        <ToggleButton value="season">SEASON TOTALS</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <CompareRadarChart player1={player1} player2={player2} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
        {[player1, player2].map((player, index) => (
          <Box
            key={player.playerId}
            sx={{
              width: 350,
              background: 'white',
              color: 'black',
              borderRadius: 2,
              padding: 3,
              boxShadow: 3,
              position: 'relative'
            }}
          >
            <Typography variant="subtitle2" sx={{ position: 'absolute', top: 10, left: 10, fontWeight: 'bold' }}>
              {index === 0 ? 'Selected Player' : 'Compared Player'}
            </Typography>

            <img
              src={player.photoUrl || 'https://wallpapersok.com/images/thumbnail/basic-default-pfp-pxi77qv5o0zuz8j3.webp'}
              alt={player.name}
              className="player-image"
              style={{ marginTop: '20px' }}
            />

            <Typography variant="h5">{player.name}</Typography>
            <Typography variant="body2">{player.currentTeam}</Typography>
            <Typography variant="body2">{player.league}</Typography>
            <Typography variant="body2">
              Position: {positionMap[player.name?.trim()] || 'N/A'}
            </Typography>
            <Typography variant="body2">{player.height}" • {player.weight} lbs</Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Stat Overview</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PlayerRadarChart stats={player.seasonStats} color={index === 0 ? '#1976d2' : '#d32f2f'} />
              </Box>
              <StatsTable
                stats={player.seasonStats}
                mode={statMode}
                compareTo={index === 0 ? player2 : player1}
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Physicals</Typography>
              {comparePhysicals.map(([label, key, unit, higherIsBetter]) => {
                const val = player.combine?.[key];
                const other = (index === 0 ? player2 : player1).combine?.[key];
                const color = getColor(val, other, higherIsBetter);
                return (
                  <Typography key={key} sx={{ color, fontSize: '0.95rem' }}>
                    <strong>{label}:</strong> {val ? `${val}${unit}` : 'N/A'}
                  </Typography>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#fff',
            color: '#000',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#f0f0f0'
            }
          }}
          onClick={onBack}
        >
          Back to Player
        </Button>
      </Box>
    </Box>
  );
}

export default PlayerCompare;