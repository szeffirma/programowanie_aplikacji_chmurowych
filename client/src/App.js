import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Tabela from './components/Tabela';
import Statystyki from './components/Statystyki';
import Druzyny from './components/Druzyny';
import Zawodnicy from './components/Zawodnicy';
import Mecze from './components/Mecze';
import './index.css';

export default function App() {
  const [tab, setTab] = useState('tabela');
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [bestTeam, setBestTeam] = useState({});
  const [bestPlayer, setBestPlayer] = useState({});

  const fetchAll = () => {
    fetch('/api/teams/').then(r => r.json()).then(setTeams);
    fetch('/api/players/').then(r => r.json()).then(setPlayers);
    fetch('/api/matches/').then(r => r.json()).then(setMatches);
    fetch('/api/stats/best-team/').then(r => r.json()).then(setBestTeam);
    fetch('/api/stats/best-player/').then(r => r.json()).then(setBestPlayer);
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar active={tab} setActive={setTab} />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        {tab === 'tabela' && <Tabela teams={teams} />}
        {tab === 'statystyki' && <Statystyki bestTeam={bestTeam} bestPlayer={bestPlayer} teams={teams} />}
        {tab === 'druzyny' && <Druzyny teams={teams} onAdd={fetchAll} />}
        {tab === 'zawodnicy' && <Zawodnicy players={players} teams={teams} onAdd={fetchAll} />}
        {tab === 'mecze' && <Mecze matches={matches} teams={teams} players={players} onAdd={fetchAll} />}
      </div>
    </div>
  );
}