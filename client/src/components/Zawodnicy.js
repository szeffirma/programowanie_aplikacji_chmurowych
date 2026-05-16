import { useState } from 'react';

export default function Zawodnicy({ players, teams, onAdd }) {
  const [form, setForm] = useState({ first_name: '', last_name: '', number: '', team: '' });

  const submit = () => {
    if (!form.first_name || !form.last_name || !form.team) return;
    fetch('/api/players/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(() => { onAdd(); setForm({ first_name: '', last_name: '', number: '', team: '' }); });
  };

  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#fff' }}>Zawodnicy</h2>

      <div style={{ background: '#13131f', border: '1px solid #2a2a3e', borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ color: '#8888aa', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Dodaj zawodnika</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 1fr auto', gap: 12 }}>
          <input placeholder="Imie" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} />
          <input placeholder="Nazwisko" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} />
          <input placeholder="Nr" type="number" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} />
          <select value={form.team} onChange={e => setForm({ ...form, team: e.target.value })}>
            <option value="">Wybierz druzyne...</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <button onClick={submit} style={{ background: '#6c63ff', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700, whiteSpace: 'nowrap' }}>
            Dodaj
          </button>
        </div>
      </div>

      <div style={{ background: '#13131f', borderRadius: 16, border: '1px solid #2a2a3e', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1c1c2e' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Imie</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Nazwisko</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Numer</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Druzyna</th>
            </tr>
          </thead>
          <tbody>
            {players.map(p => (
              <tr key={p.id} style={{ borderTop: '1px solid #2a2a3e' }}>
                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#fff' }}>{p.first_name}</td>
                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#fff' }}>{p.last_name}</td>
                <td style={{ padding: '16px 20px', color: '#6c63ff', fontWeight: 700 }}>#{p.number}</td>
                <td style={{ padding: '16px 20px', color: '#8888aa' }}>{p.team_name}</td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr><td colSpan={4} style={{ padding: 40, textAlign: 'center', color: '#8888aa' }}>Brak zawodnikow</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}