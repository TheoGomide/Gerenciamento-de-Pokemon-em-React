import { useMemo } from 'react'
import { useRoster } from '../../shared/hooks/useRoster'

const row = { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }
const imgStyle = { width: 56, height: 56, objectFit: 'contain' }

export default function Party() {
  const { team } = useRoster()

  // completa com "vagas livres" só para visual (máx. 6)
  const slots = useMemo(() => {
    const filled = team.map((p, i) => ({
      key: p.id,
      content: (
        <div style={row}>
          {p.image && <img src={p.image} alt={p.species} style={imgStyle} />}
          <div>
            <div>
              #{i + 1} <strong>{p.nickname || p.species}</strong>
            </div>
            <small>Nível: {p.level ?? '-'}</small>
          </div>
        </div>
      ),
    }))

    const empties = Array.from({ length: Math.max(0, 6 - team.length) }).map((_, idx) => ({
      key: 'empty-' + idx,
      content: (
        <div style={{ ...row, opacity: 0.6 }}>
          <div style={{ width: 56, height: 56, background: '#eee', borderRadius: 6 }} />
          <div>[vaga livre]</div>
        </div>
      ),
    }))

    return [...filled, ...empties]
  }, [team])

  return (
    <section aria-labelledby="party-title">
      <h2 id="party-title">Seu Time (máx. 6)</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {slots.map((s) => (
          <li key={s.key}>{s.content}</li>
        ))}
      </ul>
    </section>
  )
}
