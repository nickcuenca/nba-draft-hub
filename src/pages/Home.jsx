import React from 'react';
import playerData from '../data/playerData';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function Home() {
    console.log(playerData);
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        🏀 Mavericks Draft Big Board
      </Typography>
      <Grid container spacing={2}>
        {playerData.map((player) => (
          <Grid item xs={12} sm={6} md={4} key={player.playerId}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  <Link to={`/player/${player.playerId}`}>{player.name}</Link>
                </Typography>
                <Typography variant="body2">{player.currentTeam}</Typography>
                <Typography variant="body2">{player.league}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;