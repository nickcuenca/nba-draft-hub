import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import playerData from '../data/playerData';
import {
  Typography,
  Button,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import './PlayerPage.css';

function PlayerPage() {
  const { id } = useParams();
  const player = playerData.find((p) => String(p.playerId) === id);

  const [flipped, setFlipped] = useState(false);
  const [statMode, setStatMode] = useState('perGame');
  const [scoutingReports, setScoutingReports] = useState([]);
  const [newReport, setNewReport] = useState('');

  if (!player) return <Typography variant="h6">Player not found</Typography>;

  const handleSubmit = () => {
    if (newReport.trim()) {
      setScoutingReports((prev) => [...prev, newReport.trim()]);
      setNewReport('');
    }
  };

  const statsObj = player.seasonStats?.[statMode];
  const stats = statsObj ? Object.entries(statsObj) : [];

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', marginBottom: '10px', display: 'inline-block' }}>
        ← Back to Big Board
      </Link>

      <Box className={`flip-container ${flipped ? 'flipped' : ''}`}>
        <Box className="flipper">

          {/* Front Face */}
          <Box className="front">
            <img
              src={player.photoUrl || 'https://wallpapersok.com/images/thumbnail/basic-default-pfp-pxi77qv5o0zuz8j3.webp'}
              alt={player.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://wallpapersok.com/images/thumbnail/basic-default-pfp-pxi77qv5o0zuz8j3.webp';
              }}
              style={{ width: '150px', borderRadius: '8px', marginBottom: '15px' }}
            />

            <Typography variant="h4">{player.name}</Typography>
            <Typography>Team: {player.currentTeam}</Typography>
            <Typography>League: {player.league}</Typography>
            <Typography>Birth Date: {player.birthDate}</Typography>
            <Typography>Hometown: {player.homeTown}, {player.homeCountry}</Typography>
            <Typography>Height: {player.height}" • Weight: {player.weight} lbs</Typography>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Scout Rankings:</Typography>
            {player.rankings?.map((r, i) => (
              <Typography key={i}>{r.scout}: #{r.rank}</Typography>
            ))}

            <Button variant="outlined" onClick={() => setFlipped(true)} sx={{ mt: 2 }}>
              View Stats
            </Button>
          </Box>

          {/* Back Face */}
          <Box className="back">
            <Typography variant="h5">Stats – {player.name}</Typography>

            <ToggleButtonGroup
              value={statMode}
              exclusive
              onChange={(e, newMode) => newMode && setStatMode(newMode)}
              sx={{ my: 2 }}
            >
              <ToggleButton value="perGame">Per Game</ToggleButton>
              <ToggleButton value="season">Total</ToggleButton>
            </ToggleButtonGroup>

            {stats.length > 0 ? (
              stats.map(([key, val], i) => (
                <Typography key={i}>{key}: {val}</Typography>
              ))
            ) : (
              <Typography>No stats available</Typography>
            )}

            <Button variant="outlined" onClick={() => setFlipped(false)} sx={{ mt: 2 }}>
              Back to Profile
            </Button>
          </Box>

        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6">Scouting Reports</Typography>
      <textarea
        rows={4}
        value={newReport}
        onChange={(e) => setNewReport(e.target.value)}
        placeholder="Write your report here..."
        style={{ width: '100%', backgroundColor: '#333', color: 'white', padding: '10px' }}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Submit</Button>

      {scoutingReports.map((r, i) => (
        <Box key={i} sx={{ my: 1, p: 2, backgroundColor: '#222', color: '#fff', borderRadius: '8px' }}>
          {r}
        </Box>
      ))}
    </div>
  );
}

export default PlayerPage;
