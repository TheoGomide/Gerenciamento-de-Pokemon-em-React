import { useEffect, useMemo, useState } from 'react'
import { useRoster } from '../../shared/hooks/useRoster'
import { teamService } from '../../shared/services/teamService'
import { saveService } from '../../shared/services/saveService'

const wrap = { display: 'grid', gap: 14, maxWidth: 720 }
const row = { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }
const card = { background: 'rgba(0,0,0,.18)', padding: 12, borderRadius: 10 }
const img = { width: 36, height: 36, objectFit: 'contain' }
const limit = 8

export default function Saves() {
  const { setTeam } = useRoster()
  const [saves, setSaves] = useState([])
  const [name, setName] = useState('')
  const [activeKey, setActiveKey] = useState(null)
  const [active, setActive] = useState(null)

  const refresh = () => {
    const list = saveService.list()
    const key = saveService.getActiveKey()
    setSaves(list)
    setActiveKey(key)
    setActive(list.find((s) => s.key === key) || null)
  }

  useEffect(() => {
    refresh()
    const onActiveChanged = () => refresh()
    window.addEventListener('pm:save-active-changed', onActiveChanged)
    return () => window.removeEventListener('pm:save-active-changed', onActiveChanged)
  }, [])

  const others = useMemo(() => saves.filter((s) => s.key !== activeKey), [saves, activeKey])

  const buildSnapshotNow = () => ({
    team: teamService.getTeam().map((p) => ({
      id: p.id,
      species: p.species,
      nickname: p.nickname,
      level: p.level,
    })),
    pc: teamService.getPc().map((p) => ({
      id: p.id,
      species: p.species,
      nickname: p.nickname,
      level: p.level,
    })),
  })

  const handleCreate = () => {
    if (!name.trim()) return alert('Digite um nome para o save.')
    if (saves.length >= limit) return alert(`Limite de ${limit} saves atingido.`)
    saveService.create(name.trim(), buildSnapshotNow())
    setName('')
    refresh()
  }

  const handleLoad = (key) => {
    const loaded = saveService.load(key)
    if (!loaded) return
    setTeam(loaded.team)
  }

  const handleDelete = (key) => {
    if (!confirm('Excluir este save?')) return
    saveService.remove(key)
    if (saveService.getActiveKey() !== null) refresh()
  }

  const handleOverwrite = () => {
    if (!activeKey) return alert('Nenhum save atual. Carregue um save primeiro.')
    const snap = buildSnapshotNow()
    const ok = saveService.overwrite(activeKey, snap)
    if (!ok) return
    alert('Save atual sobrescrito com sucesso!')
    refresh()
  }

  return (
    <section>
      <h2>Saves</h2>

      <div style={wrap}>
        {/* Ações */}
        <div style={row}>
          <input
            placeholder="Nome do save"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleCreate}>Criar save</button>
          <button onClick={handleOverwrite}>Sobrescrever atual</button>
          <small style={{ opacity: 0.8 }}>
            ({saves.length}/{limit})
          </small>
        </div>

        <div style={card}>
          <strong>Save atual:</strong>{' '}
          {active ? (
            <>
              <span style={{ marginLeft: 6 }}>{active.name}</span>{' '}
              <small>— {new Date(active.createdAt).toLocaleString()}</small>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                {active.teamPreview?.map((p) => (
                  <img
                    key={p.id}
                    src={p.image}
                    alt={p.species}
                    title={p.nickname || p.species}
                    style={img}
                  />
                ))}
              </div>
            </>
          ) : (
            <em>nenhum (carregue um save)</em>
          )}
        </div>

        <div>
          <h3 style={{ margin: '8px 0' }}>Outros saves</h3>
          {others.length === 0 ? (
            <p>Nenhum outro save.</p>
          ) : (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gap: 8,
              }}
            >
              {others.map((s) => (
                <li key={s.key} style={card}>
                  <div style={{ ...row, justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <strong>{s.name}</strong>{' '}
                      <small>— {new Date(s.createdAt).toLocaleString()}</small>
                      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                        {s.teamPreview?.map((p) => (
                          <img
                            key={p.id}
                            src={p.image}
                            alt={p.species}
                            title={p.nickname || p.species}
                            style={img}
                          />
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleLoad(s.key)}>Carregar</button>
                      <button onClick={() => handleDelete(s.key)}>Excluir</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
