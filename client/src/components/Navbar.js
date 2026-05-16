export default function Navbar({ active, setActive }) {
  const tabs = [
    { id: 'tabela', label: 'Tabela' },
    { id: 'statystyki', label: 'Statystyki' },
    { id: 'druzyny', label: 'Druzyny' },
    { id: 'zawodnicy', label: 'Zawodnicy' },
    { id: 'mecze', label: 'Mecze' },
  ];

  return (
    <nav style={{
      background: '#13131f',
      borderBottom: '1px solid #2a2a3e',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ marginRight: 32, fontWeight: 800, fontSize: 20, color: '#6c63ff', letterSpacing: 2, padding: '18px 0' }}>
        LIGA
      </div>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setActive(t.id)} style={{
          background: active === t.id ? '#6c63ff' : 'transparent',
          color: active === t.id ? '#fff' : '#8888aa',
          padding: '8px 20px',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 14,
          border: 'none',
          transition: 'all 0.2s',
        }}>
          {t.label}
        </button>
      ))}
    </nav>
  );
}