import React, { useState } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import StatsTable from './StatsTable';

function PlayerCompare({ player1, player2, onBack }) {
  const [statMode, setStatMode] = useState('perGame');

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
            color: 'white',
            borderColor: 'gray',
          },
          '& .Mui-selected': {
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          },
        }}
        color="primary"
      >
        <ToggleButton value="perGame">PER GAME</ToggleButton>
        <ToggleButton value="season">SEASON TOTALS</ToggleButton>
      </ToggleButtonGroup>

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
            <Typography variant="body2">{player.height}" • {player.weight} lbs</Typography>

            <Box sx={{ mt: 2 }}>
              <StatsTable
                stats={player.seasonStats}
                mode={statMode}
                compareTo={index === 0 ? player2 : player1}
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <button onClick={onBack} style={{ marginTop: '20px' }}>Back to Player</button>
      </Box>
    </Box>
  );
}

export default PlayerCompare;