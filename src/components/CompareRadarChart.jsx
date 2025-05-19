import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';

function CompareRadarChart({ player1, player2, statMode = 'perGame' }) {
  const keys = [
    ['PTS', 'pts'],
    ['AST', 'ast'],
    ['REB', 'treb'],
    ['STL', 'stl'],
    ['BLK', 'blk']
  ];

  const stats1 = player1.seasonStats?.[statMode] || {};
  const stats2 = player2.seasonStats?.[statMode] || {};

  const data = keys.map(([label, key]) => ({
    stat: label,
    p1: parseFloat(stats1[key] || 0),
    p2: parseFloat(stats2[key] || 0),
  }));

  return (
    <ResponsiveContainer width={400} height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="stat" />
        <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
        <Radar name={player1.name} dataKey="p1" stroke="#1976d2" fill="#1976d2" fillOpacity={0.4} />
        <Radar name={player2.name} dataKey="p2" stroke="#d32f2f" fill="#d32f2f" fillOpacity={0.3} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default CompareRadarChart;