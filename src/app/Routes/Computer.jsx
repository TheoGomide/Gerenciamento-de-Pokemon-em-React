import { useRoster } from '../../shared/hooks/useRoster'

const col = { width: '50%', padding: 12, boxSizing: 'border-box' }
const row = { display: 'flex', gap: 12, marginBottom: 8, alignItems: 'center' }
const imgStyle = { width: 56, height: 56, objectFit: 'contain' }
const layout = { display: 'flex', gap: 16, alignItems: 'flex-start' }

export default function Computer() {
  const { pc, team, movePcToTeam, moveTeamToPc, error } = useRoster()

  return (
    <section>
      <h2>Computador</h2>
      {error && <p style={{ color: 'tomato' }}>{error}</p>}

      <div style={layout}>
        {/* Coluna esquerda: PC */}
        <div style={col}>
          <h3>PC (Pokémon disponíveis)</h3>
          {pc.length === 0 && <p>(PC vazio)</p>}
          {pc.map((p) => (
            <div key={p.id} style={row}>
              {p.image && <img src={p.image} alt={p.species} style={imgStyle} />}
              <div style={{ flex: 1 }}>
                <div>
                  <strong>{p.nickname || p.species}</strong>
                </div>
                <small>Nível: {p.level ?? '-'}</small>
              </div>
              <button onClick={() => movePcToTeam(p.id)}>Adicionar ao Time</button>
            </div>
          ))}
        </div>

        {/* Coluna direita: Time */}
        <div style={col}>
          <h3>Seu Time (máx. 6)</h3>
          {team.length === 0 && <p>(sem pokémon no time)</p>}
          {team.map((p, i) => (
            <div key={p.id} style={row}>
              {p.image && <img src={p.image} alt={p.species} style={imgStyle} />}
              <div style={{ flex: 1 }}>
                <div>
                  #{i + 1} <strong>{p.nickname || p.species}</strong>
                </div>
                <small>Nível: {p.level ?? '-'}</small>
              </div>
              <button onClick={() => moveTeamToPc(p.id)}>Enviar para PC</button>
            </div>
          ))}

          {/* slots vazios, apenas para visual */}
          {Array.from({ length: Math.max(0, 6 - team.length) }).map((_, i) => (
            <div key={'slot-' + i} style={{ ...row, opacity: 0.6 }}>
              <div style={{ width: 56, height: 56, background: '#eee' }} />
              <div style={{ flex: 1 }}>[vaga livre]</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
