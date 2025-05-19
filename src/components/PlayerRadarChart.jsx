import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';
import { Typography, Box } from '@mui/material';

function PlayerRadarChart({ stats, color = '#1976d2' }) {
  if (!stats?.perGame) return null;

  const keys = [
    ['PTS', 'pts'],
    ['AST', 'ast'],
    ['REB', 'treb'],
    ['STL', 'stl'],
    ['BLK', 'blk']
  ];

  const data = keys.map(([label, key]) => ({
    stat: label,
    value: parseFloat(stats.perGame[key] || 0),
  }));

  return (
    <Box>
      <Typography variant="h6" align="center" sx={{ mb: 1 }}>
        Per Game Radar
      </Typography>
      <ResponsiveContainer width={300} height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
          <Radar name="Player" dataKey="value" stroke={color} fill={color} fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PlayerRadarChart;