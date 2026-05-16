export default function Tabela({ teams }) {
  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#fff' }}>
        Tabela Ligi
      </h2>
      <div style={{ background: '#13131f', borderRadius: 16, border: '1px solid #2a2a3e', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1c1c2e' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>#</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Druzyna</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Miasto</th>
              <th style={{ padding: '16px 20px', textAlign: 'right', color: '#8888aa', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Punkty</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, i) => (
              <tr key={team.id} style={{
                borderTop: '1px solid #2a2a3e',
                background: i === 0 ? 'rgba(108,99,255,0.08)' : 'transparent',
                transition: 'background 0.2s',
              }}>
                <td style={{ padding: '16px 20px', color: i === 0 ? '#ffd700' : '#8888aa', fontWeight: 700, fontSize: 18 }}>
                  {i === 0 ? '★' : i + 1}
                </td>
                <td style={{ padding: '16px 20px', fontWeight: 700, fontSize: 16, color: '#fff' }}>
                  {team.name}
                </td>
                <td style={{ padding: '16px 20px', color: '#8888aa' }}>
                  {team.city}
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <span style={{
                    background: i === 0 ? '#6c63ff' : '#1c1c2e',
                    color: '#fff',
                    padding: '6px 16px',
                    borderRadius: 20,
                    fontWeight: 700,
                    fontSize: 15,
                  }}>
                    {team.points} pkt
                  </span>
                </td>
              </tr>
            ))}
            {teams.length === 0 && (
              <tr><td colSpan={4} style={{ padding: 40, textAlign: 'center', color: '#8888aa' }}>Brak druzyn — dodaj pierwsza druzyne</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}