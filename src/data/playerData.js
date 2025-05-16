import data from './intern_project_data.json';

const scoutRankings = data.scoutRankings;
const playerBios = data.bio;
const seasonLogs = data.seasonLogs;

// Step 1: Collect all playerIds from scoutRankings
const rankedPlayerIds = new Set(scoutRankings.map(entry => entry.playerId));

// Step 2: Filter bios to only include ranked players
const rankedPlayers = playerBios.filter(player => rankedPlayerIds.has(player.playerId));

// Step 3: Create a map of playerId -> list of scout ranks
const playerRankingsMap = {};
scoutRankings.forEach(entry => {
  const { playerId, ...ranks } = entry;
  const rankEntries = Object.entries(ranks);
  playerRankingsMap[playerId] = rankEntries.map(([scout, rank]) => ({ scout, rank }));
});

// Step 4: Create a map of playerId -> season stats (per game + total)
const seasonStatsMap = {};

seasonLogs.forEach(entry => {
  const {
    playerId,
    GP,
    ...stats
  } = entry;

  // Skip non-NCAA leagues
  if (entry.League !== 'NCAA') return;

  // Remove metadata keys
  const excludedKeys = ['Season', 'League', 'Team', 'w', 'l', 'GS', 'age'];
  const perGameStats = {};

  for (const [key, val] of Object.entries(stats)) {
    if (!excludedKeys.includes(key)) {
      perGameStats[key] = val;
    }
  }

  // Calculate season totals (very basic: stat × GP)
  const seasonTotals = {};
  for (const key in perGameStats) {
    const num = parseFloat(perGameStats[key]);
    if (!isNaN(num)) {
      seasonTotals[key] = (num * GP).toFixed(1);
    }
  }

  seasonStatsMap[playerId] = {
    perGame: perGameStats,
    season: seasonTotals
  };
});

// Step 5: Merge rankings and season stats with player bios
const playersWithRankings = rankedPlayers.map(player => ({
  ...player,
  rankings: playerRankingsMap[player.playerId] || [],
  seasonStats: seasonStatsMap[player.playerId] || null,
}));

// Debug check
console.log("✅ Loaded players:", playersWithRankings.length);
console.log("📊 Example season stats:", playersWithRankings[0]?.seasonStats);

export default playersWithRankings;