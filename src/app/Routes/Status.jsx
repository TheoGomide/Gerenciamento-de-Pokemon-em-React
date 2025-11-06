import { useEffect, useMemo, useState } from 'react'
import { useRoster } from '../../shared/hooks/useRoster'

const wrap = { display: 'grid', gap: 12, maxWidth: 520 }
const head = { display: 'flex', alignItems: 'center', gap: 12 }
const imgStyle = { width: 72, height: 72, objectFit: 'contain' }
const statsBox = { background: 'rgba(0,0,0,.25)', padding: 12, borderRadius: 8 }

export default function Status() {
  const { team, rename } = useRoster()

  // lista só do time, já ordenado por slot
  const teamList = useMemo(() => team, [team])

  // id selecionado (sempre alguém do time)
  const [selId, setSelId] = useState(teamList[0]?.id || '')
  const selected = useMemo(() => teamList.find((p) => p.id === selId), [teamList, selId])

  // apelido editável
  const [nick, setNick] = useState(selected?.nickname || '')

  // quando o time muda (ou o selecionado sai), ressincroniza
  useEffect(() => {
    const firstId = teamList[0]?.id || ''
    setSelId((prev) => (teamList.some((p) => p.id === prev) ? prev : firstId))
  }, [teamList])

  useEffect(() => {
    setNick(selected?.nickname || '')
  }, [selected])

  const handleSave = () => {
    if (!selected) return
    rename('team', selected.id, nick.trim())
  }

  return (
    <section aria-labelledby="status-title">
      <h2 id="status-title">Status e Apelido</h2>

      {teamList.length === 0 ? (
        <p>
          Seu time está vazio. Adicione pokémon no menu <strong>Computer</strong>.
        </p>
      ) : (
        <div style={wrap}>
          {/* seletor só com pokémon do time */}
          <label htmlFor="poke-select">Selecione um pokémon do time:</label>
          <select id="poke-select" value={selId} onChange={(e) => setSelId(e.target.value)}>
            {teamList.map((p, i) => (
              <option key={p.id} value={p.id}>
                #{i + 1} {p.nickname ? `${p.nickname} (${p.species})` : p.species}
              </option>
            ))}
          </select>

          {/* cabeçalho com sprite + nome */}
          {selected && (
            <>
              <div style={head}>
                {selected.image && (
                  <img src={selected.image} alt={selected.species} style={imgStyle} />
                )}
                <div>
                  <div>
                    <strong>{selected.nickname || selected.species}</strong>
                  </div>
                  <small>Espécie: {selected.species}</small>
                  <br />
                  <small>Nível: {selected.level ?? '-'}</small>
                </div>
              </div>

              {/* stats */}
              <div style={statsBox} aria-label="Estatísticas">
                <strong>Stats</strong>
                <ul style={{ margin: '8px 0 0 16px' }}>
                  <li>HP: {selected.stats?.hp ?? '-'}</li>
                  <li>ATK: {selected.stats?.atk ?? '-'}</li>
                  <li>DEF: {selected.stats?.def ?? '-'}</li>
                  <li>SpA: {selected.stats?.spA ?? '-'}</li>
                  <li>SpD: {selected.stats?.spD ?? '-'}</li>
                  <li>SPE: {selected.stats?.spe ?? '-'}</li>
                </ul>
              </div>

              {/* renomear */}
              <div>
                <label htmlFor="nick">Apelido</label>{' '}
                <input
                  id="nick"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  placeholder="Novo apelido"
                />
                <button onClick={handleSave} style={{ marginLeft: 8 }}>
                  Salvar apelido
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  )
}
