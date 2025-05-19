import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button
} from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import BigBoardFilters from '../components/BigBoardFilters';
import { exportDraftBoardToCSV } from '../utils/exportCSV';
import positionMap from '../data/positionMap';
import HoverBioBox from '../components/HoverBioBox';

import playerData from '../data/playerData';
import BigBoardCard from '../components/BigBoardCard';
import './Home.css';

const positions = [...new Set(Object.values(positionMap))].sort();

const mavsFitPlayersMeta = [
  {
    id: 170531,
    reason:
      "Flagg is a do-it-all forward who hustles like a madman, makes his teammates better as a passer and has dialed in a knockdown jumper. He’s both the best offensive and defensive prospect in this draft class, making him the safest No. 1 pick in ages. It’s his growth as a shot creator that will decide if he reaches his All-Star floor or soars to his Hall of Fame ceiling."
  },
  {
    id: 161608,
    reason: "Harper is a big-bodied lefty combo guard with NBA blood in his veins, as the son of Ron Harper, who was a 20/5/5 guy before winning five titles as a role player. Like his father, Harper has a high-floor with the skill, poise, and playmaking instincts to dictate the game at his pace. But the fate of his jumper will determine whether he’s an All-Star or just one of the NBA's many solid guards."
  },
  {
    id: 161710,
    reason: "Bailey is a ridiculous shot-making machine, capable of splashing contested jumpers from every spot on the floor and with the swagger of a throwback bucket-getter. But his shooting consistency, plus his raw edges as a shot creator and defender, need sanding down to turn him into a full-on star."
  },
  {
    id: 181834,
    reason: "Edgecombe is an explosive, high-motor wing who flies out of nowhere for poster dunks and chase-down blocks. He pairs his elite athleticism with a knockdown spot-up jumper and fearless slashing, though he needs to improve his shot creation to become more of a primary creator."
  },
  {
    id: 162155,
    reason: "Johnson is a clutch shot-maker who can catch fire from all over the floor, drilling step-backs and off-screen jumpers with ease. But he needs to continue developing his point guard skills while also honing his shot selection and dramatically improving his defense."
  },
  {
    id: 183971,
    reason: "Fears is a dynamic guard with a twitchy attacking style and a knack for coming through as a clutch shooter. He was one of college basketball’s youngest freshmen, and it showed with his shaky decision-making as a shooter and passer. But he has a feel for shot creation and a handle that lets him get anywhere on the floor, so he may only need time to emerge as a star."
  },
  {
    id: 161852,
    reason: "Knueppel brings more than just a sharpshooter’s stroke, thanks to his brainy pick-and-roll playmaking and crafty scoring feel. He’s got a slick midrange bag and strength scoring inside, but to become a player who takes over games he’ll need to overcome his average athleticism."
  },
  {
    id: 158352,
      reason: "Queen is a burly big with guard-like handles who dazzles with spin moves and crafty finishes like his game-winning leaning jumper to send Maryland to the Sweet 16. If he translates his velvet touch to the perimeter he has offensive star upside, though his interior scoring, playmaking chops and magnetic rebounding give him tantalizing potential."
  },
  {
    id: 161742,
      reason: "Richardson is a skilled combo guard with a lethal midrange game and a poised pick-and-roll feel, looking like he downloaded the experience of his NBA veteran father, Jason Richardson. Jase didn’t inherit his father’s height or dunk contest athleticism though, so his smaller stature could cap his upside."
  },
  {
    id: 171552,
      reason: "Murray-Boyles operates like a defensive savant the way he locks down every position, uses his ninja-quick hands to swipe at the ball and inhales rebounds. He’s a special defensive presence, and offensively he’s a bulldozer finisher with a playmaking feel. Improving his jumper would move him out of tweener territory and into All-Star status."
  }
];

function Home() {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [scoutFilter, setScoutFilter] = useState('');
  const [showTiers, setShowTiers] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showMavsFits, setShowMavsFits] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const leagues = [...new Set(playerData.map(p => p.league).filter(Boolean))].sort();
  const scouts = ['ESPN', 'Sam Vecenie', "Kevin O'Connor", 'Kyle Boone', 'Gary Parrish'];

  const filteredPlayers = playerData
    .filter(p => (selectedLeague ? p.league === selectedLeague : true))
    .filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
    .filter(p => (selectedPosition ? positionMap[p.name] === selectedPosition : true));

  const sortedPlayers = scoutFilter
    ? [...filteredPlayers].sort((a, b) => {
        const aRank = a.rankings.find(r => r.scout.includes(scoutFilter))?.rank ?? Infinity;
        const bRank = b.rankings.find(r => r.scout.includes(scoutFilter))?.rank ?? Infinity;
        return aRank - bRank;
      })
    : [...filteredPlayers].sort((a, b) => {
        const avg = p => {
          const vals = p.rankings.map(r => r.rank).filter(n => typeof n === 'number');
          return vals.length ? vals.reduce((s, n) => s + n, 0) / vals.length : Infinity;
        };
        return avg(a) - avg(b);
      });

  const tiers = [
    { label: 'Tier 1', range: [0, 7] },
    { label: 'Tier 2', range: [8, 20] },
    { label: 'Tier 3', range: [21, 40] },
    { label: 'Tier 4', range: [41, 59] }
  ];

  const handleExport = () => {
    exportDraftBoardToCSV(sortedPlayers, scoutFilter, positionMap);
  };

  const mavsFitPlayers = sortedPlayers.filter(p =>
    mavsFitPlayersMeta.some(meta => meta.id === p.playerId)
  ).map(p => {
    const meta = mavsFitPlayersMeta.find(m => m.id === p.playerId);
    return { ...p, fitReason: meta?.reason };
  });

  const playersToShow = showMavsFits ? mavsFitPlayers : sortedPlayers;

  return (
    <>
      <div className="big-board-wrapper">
        <div className="big-board-inner">
          <div className="top-bar">
            <Box className="top-left">
              <Box className="title-bar">
                <SportsBasketballIcon fontSize="large" sx={{ color: 'orange', mr: 1 }} />
                <Typography variant="h4">Mavericks Draft Big Board</Typography>
              </Box>
              <Box className="filters-box">
                <BigBoardFilters
                  leagues={leagues}
                  positions={positions}
                  scouts={scouts}
                  selectedLeague={selectedLeague}
                  setSelectedLeague={setSelectedLeague}
                  selectedPosition={selectedPosition}
                  setSelectedPosition={setSelectedPosition}
                  scoutFilter={scoutFilter}
                  setScoutFilter={setScoutFilter}
                  searchText={searchText}
                  setSearchText={setSearchText}
                />
              </Box>
            </Box>

            <Box className="top-right">
              <Button variant="contained" color="success" onClick={() => setShowMavsFits(!showMavsFits)} sx={{ mr: 1 }}>
                {showMavsFits ? 'Show All Players' : 'Show Top Mavs Fits'}
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setShowTiers(!showTiers)} sx={{ mr: 1 }}>
                {showTiers ? 'Show as Flat List' : 'Show by Tier'}
              </Button>
              <Button variant="contained" color="primary" onClick={handleExport}>Export CSV</Button>
            </Box>
          </div>

          <Typography variant="subtitle1" sx={{ mb: 2, pl: 1, color: 'white' }}>
            {showMavsFits ? 'Showing Top Mavs Fits:' : `Showing ${playersToShow.length} Player${playersToShow.length !== 1 ? 's' : ''}`}
          </Typography>
        </div>

        <div className="big-board-grid-wrapper">
          <Grid container spacing={2} justifyContent="center">
            {(showTiers ? tiers.flatMap(({ label, range }) => {
              const tierPlayers = playersToShow.slice(range[0], range[1] + 1);
              if (!tierPlayers.length) return [];
              return [
                <Typography key={label} variant="h6" className="tier-label" sx={{ width: '100%', mt: 4, mb: 2 }}>{label}</Typography>,
                ...tierPlayers.map((player, idx) => (
                  <Grid item key={player.playerId} xs={12} sm={6} md={4} lg={3} xl={2.4} display="flex" justifyContent="center" position="relative"
                    onMouseEnter={() => setHoveredId(player.playerId)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <BigBoardCard player={{ ...player, position: positionMap[player.name] || 'N/A' }} rank={range[0] + idx + 1} isTop10={range[0] + idx < 10} />
                    {showMavsFits && player.fitReason && hoveredId === player.playerId && (
                      <HoverBioBox reason={player.fitReason} />
                    )}
                  </Grid>
                ))
              ];
            }) : playersToShow.map((player, index) => (
              <Grid item key={player.playerId} xs={12} sm={6} md={4} lg={3} xl={2.4} display="flex" justifyContent="center" position="relative"
                onMouseEnter={() => setHoveredId(player.playerId)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <BigBoardCard player={{ ...player, position: positionMap[player.name] || 'N/A' }} rank={index + 1} isTop10={index < 10} />
                {showMavsFits && player.fitReason && hoveredId === player.playerId && (
                  <HoverBioBox reason={player.fitReason} />
                )}
              </Grid>
            )))}
          </Grid>
        </div>
      </div>

      <Box className="app-footer">
        <Typography variant="body2" color="white" align="center" sx={{ py: 2 }}>
          © {new Date().getFullYear()} Nicolas Cuenca — Built for the Dallas Mavericks
        </Typography>
      </Box>
    </>
  );
}

export default Home;