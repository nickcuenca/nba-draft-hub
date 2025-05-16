import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import playerData from '../data/playerData';
import StatsTable from '../components/StatsTable';
import ScoutingForm from '../components/ScoutingForm';
import CombineCard from '../components/CombineCard';
import PlayerCompare from '../components/PlayerCompare';
import PlayerComparePicker from '../components/PlayerComparePicker';

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

  const [flipped, setFlipped] = useState(false); // 'stats' | 'combine' | false
  const [statMode, setStatMode] = useState('perGame');
  const [scoutingReports, setScoutingReports] = useState([]);
  const [showComparePicker, setShowComparePicker] = useState(false);
  const [comparePlayer, setComparePlayer] = useState(null);

  if (!player) return <Typography variant="h6">Player not found</Typography>;

  return (
    <div className="page-wrapper">
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>← Back to Big Board</Link>
      </Box>

      {!comparePlayer && (
        <Box className={`flip-container ${flipped ? 'flipped' : ''}`}>
          <Box className="flip-wrapper">
            <Box className="flipper">
              <Box className="front">
                <img
                  src={player.photoUrl || 'https://wallpapersok.com/images/thumbnail/basic-default-pfp-pxi77qv5o0zuz8j3.webp'}
                  alt={player.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://wallpapersok.com/images/thumbnail/basic-default-pfp-pxi77qv5o0zuz8j3.webp';
                  }}
                  className="player-image"
                />
                <Typography variant="h4" align="center">{player.name}</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setShowComparePicker(true)}
                  >
                    Compare to Another Player
                  </Button>
                </Box>

                <Typography>Team: {player.currentTeam}</Typography>
                <Typography>League: {player.league}</Typography>
                <Typography>Birth Date: {player.birthDate}</Typography>
                <Typography>Hometown: {player.homeTown}, {player.homeCountry}</Typography>
                <Typography>Height: {player.height}" • Weight: {player.weight} lbs</Typography>

                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Scout Rankings:</Typography>
                {(() => {
                  const ranks = player.rankings.map(r => r.rank);
                  const min = Math.min(...ranks);
                  const max = Math.max(...ranks);

                  return player.rankings.map((r, i) => {
                    const isHigh = r.rank === min;
                    const isLow = r.rank === max;
                    return (
                      <Typography
                        key={i}
                        sx={{
                          fontWeight: isHigh ? 'bold' : isLow ? 300 : 400,
                          color: isHigh ? 'green' : isLow ? 'red' : 'inherit'
                        }}
                      >
                        {r.scout}: #{r.rank}
                      </Typography>
                    );
                  });
                })()}

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button variant="outlined" onClick={() => setFlipped('stats')}>
                    View Stats
                  </Button>
                  <Button variant="outlined" onClick={() => setFlipped('combine')}>
                    View Physicals
                  </Button>
                </Box>
              </Box>

              <Box className="back">
                <Typography variant="h5">
                  {flipped === 'stats' ? `Stats – ${player.name}` : `Physicals – ${player.name}`}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {flipped === 'stats' ? (
                  <>
                    <ToggleButtonGroup
                      value={statMode}
                      exclusive
                      onChange={(e, newMode) => newMode && setStatMode(newMode)}
                      sx={{ my: 2 }}
                    >
                      <ToggleButton value="perGame">Per Game</ToggleButton>
                      <ToggleButton value="season">Total</ToggleButton>
                    </ToggleButtonGroup>
                    <StatsTable stats={player.seasonStats} mode={statMode} />
                  </>
                ) : (
                  <CombineCard player={player} />
                )}

                <Button variant="outlined" onClick={() => setFlipped(false)} sx={{ mt: 4, mb: 4 }}>
                  Back to Profile
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {comparePlayer && (
        <PlayerCompare
          player1={player}
          player2={comparePlayer}
          onBack={() => setComparePlayer(null)}
        />
      )}

      <PlayerComparePicker
        open={showComparePicker}
        onClose={() => setShowComparePicker(false)}
        onSelect={(player) => {
          setComparePlayer(player);
          setShowComparePicker(false);
        }}
        players={playerData}
        excludeId={player.playerId}
      />

      <ScoutingForm
        scoutingReports={scoutingReports}
        setScoutingReports={setScoutingReports}
      />
    </div>
  );
}

export default PlayerPage;