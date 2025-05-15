import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import playerData from '../data/playerData';
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Divider
} from '@mui/material';

function PlayerPage() {
  const { id } = useParams();
  const player = playerData.find((p) => String(p.playerId) === id);

  const [scoutingReports, setScoutingReports] = useState([]);
  const [newReport, setNewReport] = useState('');

  if (!player) {
    return <Typography variant="h6">Player not found</Typography>;
  }

  const handleSubmit = () => {
    if (newReport.trim() !== '') {
      setScoutingReports(prev => [...prev, newReport.trim()]);
      setNewReport('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', marginBottom: '10px', display: 'inline-block' }}>
        ← Back to Big Board
      </Link>

      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
            <img
                src={player.photoUrl || 'https://wallpapersok.com/images/thumbnail/basic-default-pfp-pxi77qv5o0zuz8j3.webp'}
                alt={player.name}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://wallpapersok.com/images/thumbnail/basic-default-pfp-pxi77qv5o0zuz8j3.webp';
                }}
                style={{ width: '150px', borderRadius: '8px', marginBottom: '15px' }}
            />


          <Typography variant="h4" sx={{ mb: 1 }}>{player.name}</Typography>
          <Typography variant="subtitle1">Team: {player.currentTeam}</Typography>
          <Typography variant="subtitle1">League: {player.league}</Typography>
          <Typography variant="body2">Birth Date: {player.birthDate}</Typography>
          <Typography variant="body2">
            Hometown: {player.homeTown}, {player.homeCountry}
          </Typography>
          <Typography variant="body2">
            Height: {player.height}" • Weight: {player.weight} lbs
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Scout Rankings:</Typography>
          {player.rankings
            .sort((a, b) => a.rank - b.rank)
            .map((r, idx) => (
              <Typography key={idx} variant="body2">
                {r.scout}: #{r.rank}
              </Typography>
          ))}
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6">Scouting Reports</Typography>
        <TextField
          label="Write your report"
          multiline
          fullWidth
          variant="outlined"
          value={newReport}
          onChange={(e) => setNewReport(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{ style: { color: '#fff' } }}
          sx={{ mt: 1, backgroundColor: '#333' }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            bgcolor: '#2196f3',
            '&:hover': { bgcolor: '#1976d2' }
          }}
        >
          Submit
        </Button>

        {scoutingReports.length > 0 && (
          <Box mt={2}>
            {scoutingReports.map((report, i) => (
              <Card key={i} sx={{ my: 1 }}>
                <CardContent>{report}</CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
}

export default PlayerPage;