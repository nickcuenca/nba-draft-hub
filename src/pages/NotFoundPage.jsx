import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 4,
        color: '#fff',
      }}
    >
      <SportsBasketballIcon sx={{ fontSize: 64, color: 'orange', mb: 2 }} />

      <Typography variant="h2" gutterBottom>
        404 – Not Found
      </Typography>
      <Typography variant="h6" gutterBottom>
        Oops! This page doesn't exist.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
        You may have followed a bad link or typed the wrong URL.
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/"
        sx={{ fontWeight: 600 }}
      >
        Back to Big Board
      </Button>
    </Box>
  );
}

export default NotFoundPage;