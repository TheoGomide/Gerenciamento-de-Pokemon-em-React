import { useMemo } from 'react'
import { useRoster } from '../../shared/hooks/useRoster'
import '../../shared/styles/Computer.css'

export default function Computer() {
  const { team, pc, movePcToTeam, moveTeamToPc, error } = useRoster()

  const teamCount = team.length
  const pcCount = pc.length

  const pcSorted = useMemo(
    () => [...pc].sort((a, b) => String(a.species).localeCompare(String(b.species))),
    [pc]
  )

  const handlePickFromPc = (p) => {
    try {
      movePcToTeam(p.id)
    } catch (e) {
      alert(e.message || 'Não foi possível adicionar ao time.')
    }
  }

  const handleSendToPc = (id) => {
    moveTeamToPc(id)
  }

  return (
    <section className="pcScreen">
      <h2 className="pcTitle">Computer</h2>

      {error && <p className="pcError">{error}</p>}

      <div className="pcLayout">
        <aside className="teamPanel">
          <header className="panelHeader">
            <strong>Seu Time</strong>
            <small>({teamCount}/6)</small>
          </header>

          <ul className="teamList">
            {Array.from({ length: 6 }).map((_, idx) => {
              const p = team[idx]
              if (!p) {
                return (
                  <li key={idx} className="teamSlot isEmpty">
                    <div className="slotSprite placeholder" aria-hidden />
                    <div className="slotInfo">
                      <div className="slotName">[vaga livre]</div>
                      <div className="slotMeta">—</div>
                    </div>
                  </li>
                )
              }
              return (
                <li key={p.id} className="teamSlot">
                  <img
                    className="slotSprite"
                    src={p.image}
                    alt={p.species}
                    title={(p.nickname || p.species) + ` • Nv. ${p.level}`}
                  />
                  <div className="slotInfo">
                    <div className="slotName">{p.nickname || p.species}</div>
                    <div className="slotMeta">Nível: {p.level}</div>
                  </div>
                  <div className="slotActions">
                    <button
                      className="btnSmall"
                      onClick={() => handleSendToPc(p.id)}
                      aria-label={`Enviar ${p.nickname || p.species} para o PC`}
                    >
                      Enviar p/ PC
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </aside>

        <main className="pcPanel">
          <header className="panelHeader">
            <strong>BOX 01</strong>
            <small>{pcCount} armazenado(s)</small>
          </header>

          <div className="pcBox">
            {pcSorted.map((p) => (
              <button
                key={p.id}
                className="pcCell"
                title={`${p.nickname || p.species} • Nv. ${p.level} — clique para adicionar ao time`}
                onClick={() => handlePickFromPc(p)}
              >
                <img className="pcSprite" src={p.image} alt={p.species} />
              </button>
            ))}

            {Array.from({
              length: Math.max(0, Math.ceil((pcSorted.length || 1) / 8) * 8 - pcSorted.length),
            }).map((_, i) => (
              <div key={`empty-${i}`} className="pcCell empty" aria-hidden />
            ))}
          </div>

          <footer className="pcHint">
            <small>Dica: clique em um Pokémon do PC para movê-lo ao time.</small>
          </footer>
        </main>
      </div>
    </section>
  )
}
