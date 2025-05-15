import data from './intern_project_data.json';

const scoutRankings = data.scoutRankings;
const playerBios = data.bio;

// Step 1: Extract all ranked player IDs
const rankedPlayerIds = new Set();
scoutRankings.forEach(scout => {
  scout.rankings.forEach(rank => {
    rankedPlayerIds.add(rank.playerId);
  });
});

// Step 2: Filter the bios
const rankedPlayers = playerBios.filter(player => rankedPlayerIds.has(player.playerId));

// Step 3: Attach scout rankings to each player
const playerRankingsMap = {};
scoutRankings.forEach(scout => {
  scout.rankings.forEach(rank => {
    if (!playerRankingsMap[rank.playerId]) playerRankingsMap[rank.playerId] = [];
    playerRankingsMap[rank.playerId].push({ scout: scout.name, rank: rank.rank });
  });
});

const playersWithRankings = rankedPlayers.map(player => ({
  ...player,
  rankings: playerRankingsMap[player.playerId] || [],
}));

export default playersWithRankings;
