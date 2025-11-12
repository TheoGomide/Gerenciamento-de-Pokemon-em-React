import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRoster } from '../../shared/hooks/useRoster'
import { ROUTES } from '../../shared/utils/constants'
import '../../shared/styles/Party.css'

export default function Party() {
  const { team } = useRoster()
  const navigate = useNavigate()

  const goToStatus = (pokemonId) => {
    localStorage.setItem('pm.status.selectedId', pokemonId)
    navigate(ROUTES.STATUS, { state: { selId: pokemonId } })
  }

  const slots = useMemo(() => {
    const filled = team.map((p, i) => ({
      key: p.id,
      content: (
        <button
          type="button"
          className="party-card"
          onClick={() => goToStatus(p.id)}
          aria-label={`Abrir status de ${p.nickname || p.species}`}
        >
          {p.image && <img className="party-img" src={p.image} alt={p.species} />}
          <div>
            <div>
              #{i + 1} <strong>{p.nickname || p.species}</strong>
            </div>
            <small>Nível: {p.level ?? '-'}</small>
          </div>
        </button>
      ),
    }))

    const empties = Array.from({ length: Math.max(0, 6 - team.length) }).map((_, idx) => ({
      key: `empty-${idx}`,
      content: (
        <div className="party-card party-slot-empty" aria-label="Vaga livre">
          <div className="party-empty-box" />
          <div>[vaga livre]</div>
        </div>
      ),
    }))

    return [...filled, ...empties]
  }, [team, goToStatus])

  return (
    <section aria-labelledby="party-title">
      <h2 id="party-title" style={{ marginBottom: 16 }}>
        Seu Time (máx. 6)
      </h2>
      <ul className="party-grid">
        {slots.map((s) => (
          <li key={s.key}>{s.content}</li>
        ))}
      </ul>
    </section>
  )
}
