import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import playerData from '../data/playerData';
import StatsTable from '../components/StatsTable';
import ScoutingForm from '../components/ScoutingForm';
import CombineCard from '../components/CombineCard';
import PlayerCompare from '../components/PlayerCompare';
import PlayerComparePicker from '../components/PlayerComparePicker';
import PlayerRadarChart from '../components/PlayerRadarChart';
import highlightMap from '../data/highlightMap';
import {
  Typography,
  Button,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import './PlayerPage.css';

function getAge(birthDateString) {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function PlayerPage() {
  const { id } = useParams();
  const player = playerData.find((p) => String(p.playerId) === id);
  const [flipped, setFlipped] = useState(false);
  const [statMode, setStatMode] = useState('perGame');
  const [scoutingReports, setScoutingReports] = useState([]);
  const [showComparePicker, setShowComparePicker] = useState(false);
  const [comparePlayer, setComparePlayer] = useState(null);
  const [showHighlights, setShowHighlights] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!player) navigate('/404');
  }, [player, navigate]);

  if (!player) return null;

  return (
    <Box className="page-wrapper">
      {!showHighlights && (
        <Box sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 2,
          background: 'white',
          borderRadius: '6px',
          padding: '6px 12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
        }}>
          <Link
            to="/"
            style={{ textDecoration: 'none', color: 'black', fontWeight: 600, fontSize: '14px' }}
          >
            ← Back to Big Board
          </Link>
        </Box>
      )}

      {showHighlights && highlightMap[player.name] ? (
        <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <iframe
            src={highlightMap[player.name]}
            title="Highlight Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              zIndex: 0
            }}
          />

          <Box sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 2,
            background: 'white',
            borderRadius: '6px',
            padding: '6px 12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
            <Link
              to="/"
              style={{ textDecoration: 'none', color: 'black', fontWeight: 600, fontSize: '14px' }}
            >
              ← Back to Big Board
            </Link>
          </Box>

          <Button
            variant="contained"
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 2,
              backgroundColor: '#ffffff',
              color: '#000',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}
            onClick={() => setShowHighlights(false)}
          >
            Back to Card
          </Button>
        </Box>
      ) : !comparePlayer ? (
        <div className="player-content-wrapper">
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

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, gap: 1, flexWrap: 'wrap' }}>
                    <Button variant="contained" color="secondary" onClick={() => setShowComparePicker(true)}>
                      Compare to Another Player
                    </Button>
                    {highlightMap[player.name] && (
                      <Button variant="contained" color="primary" onClick={() => setShowHighlights(true)}>
                        Watch Highlights
                      </Button>
                    )}
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography>Team: {player.currentTeam}</Typography>
                    <Typography>League: {player.league}</Typography>
                    {player.highSchool && <Typography>High School: {player.highSchool}</Typography>}
                    <Typography>Birth Date: {player.birthDate} (Age: {getAge(player.birthDate)})</Typography>
                    <Typography>Hometown: {player.homeTown}, {player.homeCountry}</Typography>
                    <Typography>Height: {player.height}" • Weight: {player.weight} lbs</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <PlayerRadarChart stats={player.seasonStats} />
                  </Box>

                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">Scout Rankings:</Typography>
                  {(() => {
                    const ranks = player.rankings.map(r => r.rank);
                    const min = Math.min(...ranks);
                    const max = Math.max(...ranks);

                    return player.rankings.map((r, i) => (
                      <Typography
                        key={i}
                        sx={{
                          fontWeight: r.rank === min ? 'bold' : r.rank === max ? 300 : 400,
                          color: r.rank === min ? 'green' : r.rank === max ? 'red' : 'inherit'
                        }}
                      >
                        {r.scout}: #{r.rank}
                      </Typography>
                    ));
                  })()}

                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button variant="outlined" onClick={() => setFlipped('stats')}>View Stats</Button>
                    <Button variant="outlined" onClick={() => setFlipped('combine')}>View Physicals</Button>
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
                        onChange={(e, mode) => mode && setStatMode(mode)}
                        sx={{
                          '& .MuiToggleButton-root': {
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            border: '1px solid #ccc',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': { backgroundColor: '#f5f5f5' },
                          },
                          '& .MuiToggleButton-root.Mui-selected': {
                            backgroundColor: '#1976d2 !important',
                            color: '#ffffff !important',
                            borderColor: '#1976d2',
                            '&:hover': { backgroundColor: '#1565c0 !important' },
                          },
                        }}
                      >
                        <ToggleButton value="perGame">PER&nbsp;GAME</ToggleButton>
                        <ToggleButton value="season">SEASON&nbsp;TOTALS</ToggleButton>
                      </ToggleButtonGroup>

                      <StatsTable stats={player.seasonStats} mode={statMode} />
                    </>
                  ) : (
                    <CombineCard player={player} />
                  )}


                  <Button variant="outlined" onClick={() => setFlipped(false)} sx={{ mt: 4 }}>
                    Back to Profile
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 2 } }}>
            <Box sx={{ width: { xs: '90%', md: '500px' } }}>
              <ScoutingForm
                scoutingReports={scoutingReports}
                setScoutingReports={setScoutingReports}
              />
            </Box>
          </Box>
        </div>
      ) : null}

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
        <Box className="app-footer">
          <Typography variant="body2" color="white" align="center" sx={{ py: 2 }}>
            © {new Date().getFullYear()} Nicolas Cuenca — Built for the Dallas Mavericks
          </Typography>
        </Box>
      </Box>
  );
}

export default PlayerPage;