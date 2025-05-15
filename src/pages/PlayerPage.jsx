import React from 'react';
import { useParams } from 'react-router-dom';
import playerData from '../data/playerData';
import { Typography, Card, CardContent } from '@mui/material';

function PlayerPage() {
  const { id } = useParams();
  const player = playerData.find((p) => String(p.playerId) === id);

  if (!player) {
    return <Typography variant="h6">Player not found</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <CardContent>
          <Typography variant="h4">{player.name}</Typography>
          <Typography variant="subtitle1">Team: {player.currentTeam}</Typography>
          <Typography variant="subtitle1">League: {player.league}</Typography>
          <Typography variant="body2">
            Hometown: {player.homeTown}, {player.homeCountry}
          </Typography>
          {/* More info will be added later as needed */}
        </CardContent>
      </Card>
    </div>
  );
}

export default PlayerPage;
