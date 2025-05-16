import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar
} from '@mui/material';
import '../pages/Home.css';

function BigBoardCard({ player, rank, isTop10 }) {
  const fallbackUrl = 'https://wallpapersok.com/images/thumbnail/basic-default-pfp-pxi77qv5o0zuz8j3.webp';
  const avatarSrc = player.photoUrl && player.photoUrl.includes('http') ? player.photoUrl : fallbackUrl;

  return (
    <Card
      className={`player-card ${isTop10 ? 'top-10' : ''}fade-in`}
      sx={{
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: '8px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
        {typeof rank === 'number' && (
            <Box
                className={`rank-badge ${rank <= 5 ? 'gold-badge' : ''}`}
            >
                #{rank}
            </Box>
        )}

        <Avatar
          src={avatarSrc}
          alt={player.name}
          className="player-avatar"
          sx={{
            width: 80,
            height: 80,
            mb: 1,
            mx: 'auto',
            border: '2px solid #ccc',
            backgroundColor: '#fff',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackUrl;
          }}
        />

        <Typography
          variant="h6"
          noWrap
          sx={{
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          component={Link}
          to={`/player/${player.playerId}`}
          style={{ textDecoration: 'none' }}
        >
          {player.name}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'center' }}>
          {player.currentTeam}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
          <Box className={`chip chip-position chip-position-${player.position?.toLowerCase()}`}>
            {player.position}
          </Box>
          <Box className={`chip chip-league ${player.league?.replace(/\s/g, '-').toLowerCase()}`}>
            {player.league}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default BigBoardCard;