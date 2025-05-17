import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

function CombineCard({ player }) {
  const combine = player.combine || {};

  const fields = [
    ['Wingspan', combine.wingspan ? `${combine.wingspan}"` : null],
    ['Max Vertical', combine.maxVertical ? `${combine.maxVertical} inches` : null],
    ['No Step Vertical', combine.noStepVertical ? `${combine.noStepVertical} inches` : null],
    ['Sprint', combine.sprint ? `${combine.sprint} seconds` : null],
    ['Agility', combine.agility ? `${combine.agility} seconds` : null],
    ['Reach', combine.reach ? `${combine.reach}"` : null],
    ['Body Fat %', combine.bodyFat ? `${combine.bodyFat}%` : null],
    ['Hand Length', combine.handLength ? `${combine.handLength} inches` : null],
    ['Hand Width', combine.handWidth ? `${combine.handWidth} inches` : null]
  ];

  const hasData = fields.some(([, value]) => value);

  return (
    <Box>
      <Typography variant="h5">Physical Metrics</Typography>
      <Divider sx={{ my: 2 }} />
      {hasData ? (
        fields.map(([label, value], i) =>
          value ? (
            <Typography key={i} sx={{ mb: 1 }}>
              <strong>{label}:</strong> {value}
            </Typography>
          ) : null
        )
      ) : (
        <Typography variant="body1">No physical measurements available for this player.</Typography>
      )}
    </Box>
  );
}

export default CombineCard;