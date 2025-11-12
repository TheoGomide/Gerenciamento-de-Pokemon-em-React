import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRoster } from '../../shared/hooks/useRoster'
import '../../shared/styles/Status.css'

const wrap = { display: 'grid', gap: 12, maxWidth: 520 }
const head = { display: 'flex', alignItems: 'center', gap: 12 }
const imgStyle = { width: 72, height: 72, objectFit: 'contain' }
const statsBox = { background: 'rgba(0,0,0,.25)', padding: 12, borderRadius: 8 }

const STATUS_SEL_KEY = 'pm.status.selectedId'

export default function Status() {
  const { team, rename } = useRoster()
  const location = useLocation()

  const teamList = useMemo(() => team, [team])

  const preferredIdRef = useRef(
    (location.state && location.state.selId) ||
      new URLSearchParams(location.search).get('sel') ||
      (typeof localStorage !== 'undefined' ? localStorage.getItem(STATUS_SEL_KEY) : '') ||
      ''
  )

  const [selId, setSelId] = useState('')

  useEffect(() => {
    if (teamList.length === 0) return

    const preferred = preferredIdRef.current
    const hasPreferred = preferred && teamList.some((p) => p.id === preferred)
    const hasCurrent = selId && teamList.some((p) => p.id === selId)

    if (!hasCurrent) {
      setSelId(hasPreferred ? preferred : teamList[0].id)
    }
  }, [teamList, selId])

  useEffect(() => {
    if (!selId) return
    try {
      localStorage.setItem(STATUS_SEL_KEY, selId)
    } catch (err) {
      void err
    }
  }, [selId])

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STATUS_SEL_KEY) return
      const next = e.newValue
      if (next && teamList.some((p) => p.id === next)) setSelId(next)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [teamList])

  const selected = useMemo(() => teamList.find((p) => p.id === selId), [teamList, selId])

  const [nick, setNick] = useState('')
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
          <label htmlFor="poke-select">Selecione um pokémon do time:</label>
          <select id="poke-select" value={selId} onChange={(e) => setSelId(e.target.value)}>
            {teamList.map((p, i) => (
              <option key={p.id} value={p.id}>
                #{i + 1} {p.nickname ? `${p.nickname} (${p.species})` : p.species}
              </option>
            ))}
          </select>

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
