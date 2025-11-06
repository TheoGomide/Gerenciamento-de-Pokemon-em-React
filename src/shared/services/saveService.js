import { readJSON, writeJSON } from '../utils/storage'
import { STORAGE_KEYS } from '../utils/constants'
import { catalog } from '../data/pokemonCatalog'

// ==== helpers ====
const SAVES_KEY = STORAGE_KEYS.SAVES
const ACTIVE_KEY = 'pm.activeSave'

// índice por espécie para hidratar time/pc a partir do catálogo
const bySpecies = new Map(catalog.map((c) => [String(c.species).toLowerCase(), c]))

function hydrate(list = []) {
  return (list || []).map((p) => {
    const base = bySpecies.get(String(p?.species || '').toLowerCase())
    return base ? { ...base, ...p } : p
  })
}

function readAll() {
  return readJSON(SAVES_KEY, [])
}

function writeAll(arr) {
  writeJSON(SAVES_KEY, arr)
}

// ==== API ====
export const saveService = {
  // lista ordenada (recente primeiro) + time hidratado para preview
  list() {
    const all = readAll()
      .slice()
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      .map((s) => ({
        key: s.key,
        name: s.name,
        createdAt: s.createdAt,
        teamPreview: hydrate(s.snapshot?.team || []), // ícones do card
      }))
    return all
  },

  getActiveKey() {
    return localStorage.getItem(ACTIVE_KEY) || null
  },

  setActiveKey(key) {
    if (key) localStorage.setItem(ACTIVE_KEY, key)
    else localStorage.removeItem(ACTIVE_KEY)
  },

  // snapshot deve conter pelo menos { team, pc }
  create(name, snapshot) {
    const key = `${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const entry = {
      key,
      name: name || 'Save',
      createdAt: Date.now(), // número para evitar "Invalid Date"
      snapshot: {
        team: snapshot?.team || [],
        pc: snapshot?.pc || [],
      },
    }
    writeAll([entry, ...readAll()])
    return entry
  },

  // retorna snapshot hidratado; também grava em storage e emite eventos
  load(key) {
    const all = readAll()
    const found = all.find((s) => s.key === key)
    if (!found) return null

    // grava diretamente nas chaves oficiais
    writeJSON(STORAGE_KEYS.TEAM, found.snapshot.team || [])
    writeJSON(STORAGE_KEYS.PC, found.snapshot.pc || [])

    this.setActiveKey(key)

    // avisa páginas (Saves) que o save ativo mudou
    window.dispatchEvent(new CustomEvent('pm:save-active-changed', { detail: { key } }))

    // avisa hooks (useRoster) para reidratar time/pc
    window.dispatchEvent(new CustomEvent('pm:team-updated'))

    return {
      team: hydrate(found.snapshot.team || []),
      pc: hydrate(found.snapshot.pc || []),
    }
  },

  overwrite(key, snapshot) {
    const all = readAll()
    const idx = all.findIndex((s) => s.key === key)
    if (idx < 0) return false

    all[idx] = {
      ...all[idx],
      createdAt: Date.now(),
      snapshot: {
        team: snapshot?.team || [],
        pc: snapshot?.pc || [],
      },
    }
    writeAll(all)

    // se o sobrescrito é o ativo, notifica UI para atualizar card
    if (this.getActiveKey() === key) {
      window.dispatchEvent(new CustomEvent('pm:save-active-changed', { detail: { key } }))
    }
    return true
  },

  remove(key) {
    const all = readAll()
    const filtered = all.filter((s) => s.key !== key)
    writeAll(filtered)

    // se removeu o ativo, zera e notifica
    if (this.getActiveKey() === key) {
      this.setActiveKey(null)
      window.dispatchEvent(new CustomEvent('pm:save-active-changed', { detail: { key: null } }))
    }
  },
}
