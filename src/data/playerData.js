import data from './intern_project_data.json';

const scoutRankings = data.scoutRankings;
const playerBios = data.bio;

// Step 1: Collect all playerIds from scoutRankings
const rankedPlayerIds = new Set(scoutRankings.map(entry => entry.playerId));

// Step 2: Filter bios to only include ranked players
const rankedPlayers = playerBios.filter(player => rankedPlayerIds.has(player.playerId));

// Step 3: Create a map of playerId -> list of scout ranks
const playerRankingsMap = {};
scoutRankings.forEach(entry => {
  const { playerId, ...ranks } = entry;
  const rankEntries = Object.entries(ranks); // turns { "ESPN Rank": 1, ... } into [["ESPN Rank", 1], ...]

  playerRankingsMap[playerId] = rankEntries.map(([scout, rank]) => ({
    scout,
    rank
  }));
});

// Step 4: Merge rankings with player bios
const playersWithRankings = rankedPlayers.map(player => ({
  ...player,
  rankings: playerRankingsMap[player.playerId] || [],
}));

// Debug output
console.log("✅ Loaded players:", playersWithRankings.length);
console.log("📊 Example rankings:", playersWithRankings[0]?.rankings);

export default playersWithRankings;