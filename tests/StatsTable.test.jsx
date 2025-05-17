import { render, screen, fireEvent } from '@testing-library/react';
import StatsTable from '../src/components/StatsTable';

const mockStats = {
  perGame: {
    points: 20.5,
    assists: 5.2,
    rebounds: 7.1,
  },
  season: {
    points: 615,
    assists: 156,
    rebounds: 212,
  }
};

const mockCompare = {
  perGame: {
    points: 18.3,
    assists: 6.0,
    rebounds: 6.5,
  },
  season: {
    points: 600,
    assists: 180,
    rebounds: 200,
  }
};

describe('StatsTable', () => {
  it('renders per game stats correctly', () => {
    render(<StatsTable stats={mockStats} mode="perGame" />);
    expect(screen.getByText('points')).toBeInTheDocument();
    expect(screen.getByText('20.5')).toBeInTheDocument();
  });

  it('renders season totals if mode is "season"', () => {
    render(<StatsTable stats={mockStats} mode="season" />);
    expect(screen.getByText('615')).toBeInTheDocument();
  });

  it('highlights better stats in green', () => {
    render(<StatsTable stats={mockStats} mode="perGame" compareTo={{ seasonStats: mockCompare }} />);
    const pointsCell = screen.getByText('20.5');
    const computed = getComputedStyle(pointsCell);
    expect(computed.color).toBe('rgb(0, 128, 0)');
  });

  it('highlights worse stats in red', () => {
    render(<StatsTable stats={mockStats} mode="perGame" compareTo={{ seasonStats: mockCompare }} />);
    const assistsCell = screen.getByText('5.2');
    const computed = getComputedStyle(assistsCell);
    expect(computed.color).toBe('rgb(255, 0, 0)');
  });

  it('renders fallback when stats are missing', () => {
    render(<StatsTable stats={null} mode="perGame" />);
    expect(screen.getByText('No stats available.')).toBeInTheDocument();
  });

  it('renders "No stats found" when displayStats is empty', () => {
    render(<StatsTable stats={{ perGame: {} }} mode="perGame" />);
    expect(screen.getByText('No stats found.')).toBeInTheDocument();
  });
});