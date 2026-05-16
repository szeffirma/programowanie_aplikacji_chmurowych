import { useState } from 'react';

export default function Mecze({ matches, teams, players, onAdd }) {
  const [form, setForm] = useState({ home_team: '', away_team: '', home_score: '', away_score: '', match_date: '' });
  const [goalStats, setGoalStats] = useState({});

  const updateGoal = (playerId, goals) => {
    setGoalStats(prev => ({ ...prev, [playerId]: Number(goals) }));
  };

    const submit = () => {
        if (!form.home_team || !form.away_team) return;
        const goal_stats = Object.entries(goalStats)
            .filter(([, g]) => g > 0)
            .map(([player_id, goals]) => ({ player_id: Number(player_id), goals }));

        fetch('/api/matches/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                home_team: Number(form.home_team),
                away_team: Number(form.away_team),
                home_score: Number(form.home_score) || 0,
                away_score: Number(form.away_score) || 0,
                match_date: form.match_date,
                goal_stats,
            }),
        }).then(() => {
            onAdd();
            setForm({ home_team: '', away_team: '', home_score: '', away_score: '', match_date: '' });
            setGoalStats({});
        });
};

  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#fff' }}>Mecze</h2>

      <div style={{ background: '#13131f', border: '1px solid #2a2a3e', borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ color: '#8888aa', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Dodaj mecz</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <select value={form.home_team} onChange={e => setForm({ ...form, home_team: e.target.value })}>
            <option value="">Gospodarz...</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <div style={{ textAlign: 'center', display: 'grid', gridTemplateColumns: '60px auto 60px', gap: 8, alignItems: 'center' }}>
            <input type="number" min="0" placeholder="0" value={form.home_score} onChange={e => setForm({ ...form, home_score: e.target.value })} style={{ textAlign: 'center', fontSize: 20, fontWeight: 800 }} />
            <span style={{ color: '#8888aa', fontWeight: 800 }}>:</span>
            <input type="number" min="0" placeholder="0" value={form.away_score} onChange={e => setForm({ ...form, away_score: e.target.value })} style={{ textAlign: 'center', fontSize: 20, fontWeight: 800 }} />
          </div>
          <select value={form.away_team} onChange={e => setForm({ ...form, away_team: e.target.value })}>
            <option value="">Gosc...</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        <input type="date" value={form.match_date} onChange={e => setForm({ ...form, match_date: e.target.value })} style={{ marginBottom: 16 }} />

        {players.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#8888aa', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Gole zawodnikow</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
              {players.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#1c1c2e', padding: '10px 14px', borderRadius: 8 }}>
                  <span style={{ flex: 1, fontSize: 14, color: '#fff' }}>{p.first_name} {p.last_name}</span>
                  <span style={{ color: '#8888aa', fontSize: 12 }}>{p.team_name}</span>
                  <input type="number" min="0" defaultValue="0"
                    onChange={e => updateGoal(p.id, e.target.value)}
                    style={{ width: 52, textAlign: 'center', padding: '6px 8px' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={submit} style={{ background: '#6c63ff', color: '#fff', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15 }}>
          Zapisz mecz
        </button>
      </div>

      <div style={{ background: '#13131f', borderRadius: 16, border: '1px solid #2a2a3e', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1c1c2e' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Data</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Gospodarz</th>
              <th style={{ padding: '16px 20px', textAlign: 'center', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Wynik</th>
              <th style={{ padding: '16px 20px', textAlign: 'right', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Gosc</th>
            </tr>
          </thead>
          <tbody>
            {matches.map(m => (
              <tr key={m.id} style={{ borderTop: '1px solid #2a2a3e' }}>
                <td style={{ padding: '16px 20px', color: '#8888aa', fontSize: 14 }}>{m.match_date}</td>
                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#fff' }}>{m.home_team_name}</td>
                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <span style={{ background: '#1c1c2e', padding: '6px 16px', borderRadius: 20, fontWeight: 800, fontSize: 16, color: '#fff' }}>
                    {m.home_score} : {m.away_score}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#fff', textAlign: 'right' }}>{m.away_team_name}</td>
              </tr>
            ))}
            {matches.length === 0 && (
              <tr><td colSpan={4} style={{ padding: 40, textAlign: 'center', color: '#8888aa' }}>Brak meczy</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}