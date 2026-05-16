import { useState } from 'react';

export default function Druzyny({ teams, onAdd }) {
  const [form, setForm] = useState({ name: '', city: '' });

  const submit = () => {
    if (!form.name || !form.city) return;
    fetch('/api/teams/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(() => { onAdd(); setForm({ name: '', city: '' }); });
  };

  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#fff' }}>Druzyny</h2>

      <div style={{ background: '#13131f', border: '1px solid #2a2a3e', borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ color: '#8888aa', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Dodaj druzyne</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12 }}>
          <input placeholder="Nazwa druzyny" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Miasto" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
          <button onClick={submit} style={{ background: '#6c63ff', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700, whiteSpace: 'nowrap' }}>
            Dodaj
          </button>
        </div>
      </div>

      <div style={{ background: '#13131f', borderRadius: 16, border: '1px solid #2a2a3e', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1c1c2e' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Nazwa</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Miasto</th>
              <th style={{ padding: '16px 20px', textAlign: 'right', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Punkty</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(t => (
              <tr key={t.id} style={{ borderTop: '1px solid #2a2a3e' }}>
                <td style={{ padding: '16px 20px', fontWeight: 700, color: '#fff' }}>{t.name}</td>
                <td style={{ padding: '16px 20px', color: '#8888aa' }}>{t.city}</td>
                <td style={{ padding: '16px 20px', textAlign: 'right', color: '#6c63ff', fontWeight: 700 }}>{t.points}</td>
              </tr>
            ))}
            {teams.length === 0 && (
              <tr><td colSpan={3} style={{ padding: 40, textAlign: 'center', color: '#8888aa' }}>Brak druzyn</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}