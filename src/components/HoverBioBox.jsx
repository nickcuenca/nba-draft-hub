import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

function HoverBioBox({ reason }) {
  const boxRef = useRef(null);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (box) {
      const rect = box.getBoundingClientRect();
      const overflowsRight = rect.right > window.innerWidth - 20;
      if (overflowsRight) {
        setFlip(true);
      }
    }
  }, []);

  return (
    <Box
      ref={boxRef}
      sx={{
        position: 'absolute',
        top: 0,
        left: flip ? 'auto' : '100%',
        right: flip ? '100%' : 'auto',
        transform: flip ? 'translateX(-10px)' : 'translateX(10px)',
        width: 280,
        maxWidth: 'calc(100vw - 40px)',
        p: 2,
        bgcolor: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        borderRadius: 2,
        boxShadow: 3,
        zIndex: 20,
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        overflowWrap: 'anywhere',
        pointerEvents: 'none'
      }}
    >
      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
        Why he's a Mavs fit:
      </Typography>
      <Typography variant="body2">{reason}</Typography>
    </Box>
  );
}

export default HoverBioBox;