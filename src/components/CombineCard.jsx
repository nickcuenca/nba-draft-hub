import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

function CombineCard({ player }) {
  const fields = [
    ['Wingspan', player.combine?.wingspan],
    ['Max Vertical', player.combine?.maxVertical],
    ['No Step Vertical', player.combine?.noStepVertical],
    ['Sprint', player.combine?.sprint],
    ['Agility', player.combine?.agility],
    ['Reach', player.combine?.reach],
    ['Body Fat %', player.combine?.bodyFat],
    ['Hand Length', player.combine?.handLength],
    ['Hand Width', player.combine?.handWidth]
  ];

  const hasData = fields.some(([, value]) => value);

  console.log("🧬 player.combine =", player.combine);

  console.log("🧬 full player =", player);

  return (
    <Box>
      <Typography variant="h5">Physical Metrics</Typography>
      <Divider sx={{ my: 2 }} />
      {hasData ? (
        fields.map(([label, value], i) => (
          value ? (
            <Typography key={i} sx={{ mb: 1 }}>
              <strong>{label}:</strong> {value}
            </Typography>
          ) : null
        ))
      ) : (
        <Typography variant="body1">No physical measurements available for this player.</Typography>
      )}
    </Box>
  );
}

export default CombineCard;