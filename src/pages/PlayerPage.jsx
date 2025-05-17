import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

  const highlightMap = {
    'Cooper Flagg': 'https://www.youtube.com/embed/edzezIWDCUs?si=i8NJBdKBU5-kvEfK',
    'Dylan Harper': 'https://www.youtube.com/embed/Mrgn1JyqLoE?si=Pbh6aDxnESCN_Ixg',
    'Ace Bailey': 'https://www.youtube.com/embed/pYq_gKercEY?si=OyVkP71mdTGzfUpd',
    'VJ Edgecombe': 'https://www.youtube.com/embed/onYX7LHpVtI?si=js75mk9Y8I5ffFXi',
    'Tre Johnson': 'https://www.youtube.com/embed/fTq-mRYbKjE?si=ndhDbCt0UcUofdqq',
    'Kasparas Jakucionis': 'https://www.youtube.com/embed/eFLVR6MrS94?si=V6d0zDL9tIrjwJ07',
    'Kon Kneuppel': 'https://www.youtube.com/embed/ASq5zh6deJ4?si=Vrmn7qcHPk9IJXyB',
    'Derik Queen': 'https://www.youtube.com/embed/xhBSPZPdg4w?si=Qcx5SbMuzUPKVEW6',
    'Jeremiah Fears': 'https://www.youtube.com/embed/h5SFQdQLpy0?si=XwaiderSnDNtHXNN',
    'Khaman Maluach': 'https://www.youtube.com/embed/c6bBzX6A_eU?si=W7N-agIFa5zIXzuT',
    'Collin Murray-Boyles ': 'https://www.youtube.com/embed/GY9szNsoAwQ?si=eucHYrCsWPoCkRoI',
    'Liam McNeeley': 'https://www.youtube.com/embed/NnvX217_QGw?si=UYC5FL2bpz4FW_w1',
    'Egor Demin': 'https://www.youtube.com/embed/Lg4t4jWulz0?si=clB1QeZUI-qBr_3M',
    'Jase Richardson': 'https://www.youtube.com/embed/7W-eAtOR5dY?si=JhmUgWb5DSWUiCT6',
    'Nolan Traore': 'https://www.youtube.com/embed/1aaaDQgeZPw?si=SA_zZp_5w-VxWxFb',
    'Joan Beringer': 'https://www.youtube.com/embed/wTIycEHA9tg?si=tGLVqxqDCOOYmho-',
    'Noa Essengue': 'https://www.youtube.com/embed/7UR5h-KODjQ?si=syUVgfjwIvMvQgUL',
    'Asa Newell': 'https://www.youtube.com/embed/if7xs1GcGE0?si=oVQEdBxgS5e4FEf4',
    'Danny Wolf': 'https://www.youtube.com/embed/4ijcXuq_L-0?si=gyDIZ_54Mg-SmDQD',
    'Rasheer Fleming': 'https://www.youtube.com/embed/rNniMOctM4k?si=rjcOLH_bveKaiCBm',
    'Nique Clifford': 'https://www.youtube.com/embed/AApkD4uSCN4?si=I7JqwVW3iFfSQ_US',
    'Carter Bryant': 'https://www.youtube.com/embed/cRi-e47u6n8?si=HnBW7MwAqKQXd-8e',
    'Thomas Sorber': 'https://www.youtube.com/embed/S3h02rBx2KY?si=96Bu-_NU7CHnePUV',
    'Hugo Gonzalez': 'https://www.youtube.com/embed/heB-jqYUOEM?si=ww7NLbJ0spusa1lV',
    'Drake Powell': 'https://www.youtube.com/embed/Hlm95kJQz0I?si=B50I5jSykCQMgJBe',
    'Ben Saraf': 'https://www.youtube.com/embed/xRD0ROmTYwE?si=99008fTKO4DjpYgp',
    'Will Riley': 'https://www.youtube.com/embed/6eWDZJujS5s?si=THV2I-aVCCcMniMt',
    'Noah Penda': 'https://www.youtube.com/embed/QNRjp0MhOw4?si=QBoFOL5OOuZX1pFz',
    'Ryan Kalkbrenner': 'https://www.youtube.com/embed/pVZa8bMvsR4?si=jV9iBu386lJ9C4iQ',
    'Adou Thiero': 'https://www.youtube.com/embed/i0FNhvxJwrg?si=94m_FILxRxEvpxLV',
    'Alex Condon': 'https://www.youtube.com/embed/5xxhHkSI5QI?si=Zrpdb5KPTQsuY-Gb',
    'Alex Karaban': 'https://www.youtube.com/embed/Y2dKmGY8U0Q?si=MRpu6ippnziJ4XqB',
    'Miles Byrd': 'https://www.youtube.com/embed/R82irPuvVe0?si=8_TE5_bUjBKYR8Vm',
    'Ian Jackson': 'https://www.youtube.com/embed/GtLe9QmUwL8?si=4MtMS5ZYfyC5XaHs',
    'Maxime Raynaud': 'https://www.youtube.com/embed/NyD3duYYSFo?si=J7bK8a7O1DjFRzON',
    'Johni Broome': 'https://www.youtube.com/embed/LxeBTBoXGsw?si=-ofwbp2XtbyZ4Z3v',
    'Sergio De Larrea': 'https://www.youtube.com/embed/dDFLEOyb28E?si=XSvw-g7hN9Qy7hdw',
    'Alex Toohey': 'https://www.youtube.com/embed/ZnYYFJLI11o?si=HNJgXqqmZJGOhV8z',
    'Tyrese Proctor': 'https://www.youtube.com/embed/X0g55pN7e7c?si=tNBZqnZqGHrmMiWc',
    'Kam Jones': 'https://www.youtube.com/embed/uPm61YytFr0?si=-ymeC7Pyqc3JlWLq',
    'Boogie Fland': 'https://www.youtube.com/embed/ew1cLNHm0-g?si=Izy-AUbUL3Nev7qC',
    'Joseph Tugler': 'https://www.youtube.com/embed/zuQ55mUMQMw?si=tv6j1S-XoMVUHmfL',
    'Yaxel Lendeborg': 'https://www.youtube.com/embed/Zh4tC7qY8ng?si=rDs-bBfTMlSpXEvv',
    'Darrion Williams': 'https://www.youtube.com/embed/4BRc51l-tzw?si=gaoqpVnv-OxqLTKW',
    'Chaz Lanier': 'https://www.youtube.com/embed/Az58bttuJ0I?si=44e0HBnBC0Whryis',
    'Eric Dixon': 'https://www.youtube.com/embed/_-0KaDc_ZMk?si=WXHr9NIbMrkYGy8f',
    'Michael Ruzic': 'https://www.youtube.com/embed//Lx1KN1OYXGo?si=My1_NDtex0SxhB-0',
    'Dink Pate': 'https://www.youtube.com/embed/izPNI9n1QPs?si=rjl7bMxHaummV5Z6',
    'Bogoljub Markovic': 'https://www.youtube.com/embed/EG9vFRbvDrw?si=R8B20b6VukjrjeD0',
    'Johann Grunloh': 'https://www.youtube.com/embed/twwc9LZlv2k?si=q4eVfQPz05zY3_IY',
    'Isaiah Evans': 'https://www.youtube.com/embed/S2rOY5Vn-8w?si=obrew_7VfgRxx1Td',
    'Rocco Zikarsky': 'https://www.youtube.com/embed/QJknel-geU8?si=H0F43Li0kHIaUGAM',
    'Cedric Coward': 'https://www.youtube.com/embed/BdXv9h2Hr7Y?si=cnKcPbkZ6YdXHUf5',
    'Sion James': 'https://www.youtube.com/embed/dxckkZjTwkg?si=485EFGlnzVNGXnuB',
    'Mouhamed Faye': 'https://www.youtube.com/embed/m4S-dKbEjXM?si=tVTUylskep-vt9vO',
    'Zvonimir Ivisic': 'https://www.youtube.com/embed/d6oOE9cF-Ns?si=pRkRUHUIwy3n9Dv3',
    'JT Toppin': 'https://www.youtube.com/embed/P2-Q_Wxs2pg?si=Zfy1Nj-L0ZLkC3-T',
    'Hunter Sallis': 'https://www.youtube.com/embed/xILb0KtK-mc?si=_IXVo2Y3JTySX_Dg',
    'Koby Brea': 'https://www.youtube.com/embed/xYjE-m0UfCY?si=9bpUzDieiH3OKHNy',
    'Malique Lewis': 'https://www.youtube.com/embed/VPXOMbtf3g8?si=WPAvKFCbg8Lcfd3R'
  };

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