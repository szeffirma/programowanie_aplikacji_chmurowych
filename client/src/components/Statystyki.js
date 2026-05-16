import { useState } from 'react';

export default function Statystyki({ bestTeam, bestPlayer, teams }) {
  const [vsTeamId, setVsTeamId] = useState('');
  const [bestVs, setBestVs] = useState(null);

  const checkVs = () => {
    if (!vsTeamId) return;
    fetch(`/api/stats/best-player-vs/${vsTeamId}/`)
      .then(r => r.json())
      .then(setBestVs);
  };

  const Card = ({ label, value, sub }) => (
    <div style={{
      background: '#13131f',
      border: '1px solid #2a2a3e',
      borderRadius: 16,
      padding: 28,
      marginBottom: 16,
      borderLeft: '4px solid #6c63ff',
    }}>
      <div style={{ color: '#8888aa', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ color: '#6c63ff', fontWeight: 600 }}>{sub}</div>}
    </div>
  );

  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#fff' }}>Statystyki</h2>

      {bestTeam?.name
        ? <Card label="Najlepsza druzyna" value={bestTeam.name} sub={`${bestTeam.city} — ${bestTeam.points} punktow`} />
        : <Card label="Najlepsza druzyna" value="Brak danych" />
      }

      {bestPlayer?.first_name
        ? <Card label="Najlepszy zawodnik" value={`${bestPlayer.first_name} ${bestPlayer.last_name}`} sub={`${bestPlayer.team_name} — ${bestPlayer.total_goals} goli`} />
        : <Card label="Najlepszy zawodnik" value="Brak danych" />
      }

      <div style={{ background: '#13131f', border: '1px solid #2a2a3e', borderRadius: 16, padding: 28, marginBottom: 16 }}>
        <div style={{ color: '#8888aa', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
          Najlepszy zawodnik przeciwko druzynie
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <select value={vsTeamId} onChange={e => { setVsTeamId(e.target.value); setBestVs(null); }} style={{ flex: 1 }}>
            <option value="">Wybierz druzyne...</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <button onClick={checkVs} style={{ background: '#6c63ff', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700, whiteSpace: 'nowrap' }}>
            Sprawdz
          </button>
        </div>
        {bestVs?.first_name && (
          <div style={{ borderTop: '1px solid #2a2a3e', paddingTop: 16 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{bestVs.first_name} {bestVs.last_name}</div>
            <div style={{ color: '#6c63ff', fontWeight: 600, marginTop: 4 }}>{bestVs.team_name} — {bestVs.total_goals} goli</div>
          </div>
        )}
        {bestVs && !bestVs.first_name && (
          <div style={{ color: '#8888aa' }}>Brak danych dla tej druzyny</div>
        )}
      </div>
    </div>
  );
}