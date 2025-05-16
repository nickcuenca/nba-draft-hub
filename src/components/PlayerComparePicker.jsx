import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function PlayerComparePicker({ players, onSelect, open, onClose, excludeId }) {
  const filteredPlayers = players.filter(p => String(p.playerId) !== String(excludeId));

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Select a Player to Compare
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <List>
        {filteredPlayers.map((player) => (
          <ListItem key={player.playerId} disablePadding>
            <ListItemButton onClick={() => onSelect(player)}>
              <ListItemText primary={player.name} secondary={player.currentTeam} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default PlayerComparePicker;