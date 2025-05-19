export function exportDraftBoardToCSV(players, scoutFilter, positionMap) {
  const rows = players.map((p, i) => ({
    Rank: scoutFilter ? i + 1 : '',
    Name: p.name,
    Team: p.currentTeam,
    League: p.league,
    Position: positionMap[p.name] || 'N/A'
  }));

  const csv = [
    Object.keys(rows[0]).join(','),
    ...rows.map(r => Object.values(r).join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'draft_board.csv';
  a.click();
  URL.revokeObjectURL(url);
}