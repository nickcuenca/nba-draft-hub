import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './ScoutingForm.css';

function ScoutingForm({ scoutingReports, setScoutingReports }) {
  const [newReport, setNewReport] = useState('');

  const handleSubmit = () => {
    if (newReport.trim()) {
      const timestamp = new Date().toLocaleString();
      const newEntry = { text: newReport.trim(), time: timestamp };
      setScoutingReports((prev) => [...prev, newEntry]);
      setNewReport('');
    }
  };

  const handleDelete = (index) => {
    setScoutingReports((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box className="scouting-box">
      <Typography variant="h6">Scouting Reports</Typography>
      <textarea
        rows={4}
        maxLength={300}
        value={newReport}
        onChange={(e) => setNewReport(e.target.value)}
        placeholder="Write your report here... (max 300 chars)"
        className="scouting-textarea"
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>

      {scoutingReports.map((report, i) => (
        <Box
          key={i}
          sx={{
            my: 2,
            p: 2,
            backgroundColor: '#222',
            color: '#fff',
            borderRadius: '8px',
            position: 'relative'
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            {report.text}
          </Typography>
          <Typography variant="caption" sx={{ color: '#aaa' }}>
            Submitted: {report.time}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleDelete(i)}
            sx={{ position: 'absolute', top: 4, right: 4, color: '#aaa' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}

export default ScoutingForm;