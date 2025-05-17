import { render, screen, fireEvent } from '@testing-library/react';
import PlayerCompare from '../src/components/PlayerCompare';

const player1 = {
  playerId: '1',
  name: 'Player One',
  currentTeam: 'Team A',
  league: 'League X',
  height: 80,
  weight: 220,
  photoUrl: '',
  seasonStats: {
    perGame: { points: 20.5 },
    season: { points: 615 }
  },
  combine: {
    wingspan: 85,
    maxVertical: 40,
    sprint: 3.2,
    agility: 4.5,
    reach: 105,
    handLength: 9.5,
    handWidth: 10
  }
};

const player2 = {
  playerId: '2',
  name: 'Player Two',
  currentTeam: 'Team B',
  league: 'League Y',
  height: 78,
  weight: 210,
  photoUrl: '',
  seasonStats: {
    perGame: { points: 18.3 },
    season: { points: 580 }
  },
  combine: {
    wingspan: 82,
    maxVertical: 38,
    sprint: 3.5,
    agility: 4.8,
    reach: 102,
    handLength: 9.3,
    handWidth: 9.8
  }
};

describe('PlayerCompare', () => {
  it('renders both players and their teams', () => {
    render(<PlayerCompare player1={player1} player2={player2} onBack={vi.fn()} />);
    expect(screen.getByText('Player One')).toBeInTheDocument();
    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Player Two')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
  });

  it('toggles stats view between per game and season', () => {
    render(<PlayerCompare player1={player1} player2={player2} onBack={vi.fn()} />);
    expect(screen.getByText('20.5')).toBeInTheDocument();
    fireEvent.click(screen.getByText('SEASON TOTALS'));
    expect(screen.getByText('615')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    const onBackMock = vi.fn();
    render(<PlayerCompare player1={player1} player2={player2} onBack={onBackMock} />);
    fireEvent.click(screen.getByText('Back to Player'));
    expect(onBackMock).toHaveBeenCalled();
  });

  it('highlights better physicals in green', () => {
    render(<PlayerCompare player1={player1} player2={player2} onBack={vi.fn()} />);
    const wingspan = screen.getAllByText(/Wingspan:/)[0];
    const computed = getComputedStyle(wingspan);
    expect(computed.color).toBe('rgb(0, 128, 0)');
    const sprint = screen.getAllByText(/Sprint:/)[1];
    const sprintStyle = getComputedStyle(sprint);
    expect(sprintStyle.color).toBe('rgb(255, 0, 0)');
  });
});