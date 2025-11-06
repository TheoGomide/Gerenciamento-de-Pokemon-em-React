import { writeJSON } from '../utils/storage'
import { STORAGE_KEYS, LIMITS } from '../utils/constants'
import { ensureId } from './pokemonId'
import { dedupeById } from '../utils/dedupe'
import { catalog } from '../data/pokemonCatalog'

// mapa de espécies para acesso rápido
const bySpecies = new Map(catalog.map((c) => [String(c.species).toLowerCase(), c]))

// Regras:
// - storage guarda apenas: { id, species, nickname?, level? }
// - imagem/stats SEMPRE vêm do catálogo no momento da leitura (hidratação)
function hydrate(rawList = []) {
  return dedupeById(
    rawList.map((p0) => {
      const base = bySpecies.get(String(p0?.species || '').toLowerCase())
      const dyn = { id: p0.id, species: p0.species, nickname: p0.nickname, level: p0.level }
      const merged = base ? { ...base, ...dyn } : ensureId({ species: p0.species, ...dyn })
      return ensureId(merged)
    })
  )
}

function stripDynamic(p) {
  // o que vai para o storage (sem image/stats)
  return { id: p.id, species: p.species, nickname: p.nickname, level: p.level }
}

// Lê valor bruto do localStorage (para saber se a chave existe)
function getRaw(key) {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : null // null = chave não existe
}

// TEAM
function getTeamRaw() {
  const raw = getRaw(STORAGE_KEYS.TEAM)
  return Array.isArray(raw) ? raw : [] // se não existe, time inicial é []
}
function saveTeam(rawArr) {
  const minimized = dedupeById(rawArr.map(stripDynamic))
  writeJSON(STORAGE_KEYS.TEAM, minimized)
}

// PC
function getPcRaw() {
  const raw = getRaw(STORAGE_KEYS.PC)
  if (raw === null) {
    // chave não existe: 1ª execução -> semear com catálogo (uma vez)
    const seeded = catalog.map(ensureId).map(stripDynamic)
    writeJSON(STORAGE_KEYS.PC, seeded)
    return seeded
  }
  return Array.isArray(raw) ? raw : []
}
function savePc(rawArr) {
  const minimized = dedupeById(rawArr.map(stripDynamic))
  writeJSON(STORAGE_KEYS.PC, minimized)
}

export const teamService = {
  // leitura sempre hidratada a partir do catálogo
  getTeam() {
    return hydrate(getTeamRaw())
  },
  getPc() {
    return hydrate(getPcRaw())
  },

  addToTeam(pokemon) {
    const team = hydrate(getTeamRaw())
    if (team.length >= LIMITS.MAX_TEAM_SIZE) throw new Error('Time cheio (máx. 6).')
    const withId = ensureId({
      species: pokemon.species,
      nickname: pokemon.nickname,
      level: pokemon.level,
    })
    saveTeam([...team, withId])
    return withId
  },

  removeFromTeam(id) {
    const team = hydrate(getTeamRaw()).filter((p) => p.id !== id)
    saveTeam(team)
  },

  renameInTeam(id, nickname) {
    const team = hydrate(getTeamRaw()).map((p) => (p.id === id ? { ...p, nickname } : p))
    saveTeam(team)
  },

  swapTeam(aIdx, bIdx) {
    const team = hydrate(getTeamRaw())
    ;[team[aIdx], team[bIdx]] = [team[bIdx], team[aIdx]]
    saveTeam(team)
  },

  addToPc(pokemon) {
    const pc = hydrate(getPcRaw())
    const withId = ensureId({
      species: pokemon.species,
      nickname: pokemon.nickname,
      level: pokemon.level,
    })
    savePc([...pc, withId])
    return withId
  },

  removeFromPc(id) {
    const pc = hydrate(getPcRaw()).filter((p) => p.id !== id)
    savePc(pc)
  },

  renameInPc(id, nickname) {
    const pc = hydrate(getPcRaw()).map((p) => (p.id === id ? { ...p, nickname } : p))
    savePc(pc)
  },

  movePcToTeam(id) {
    const pc = hydrate(getPcRaw())
    const idx = pc.findIndex((p) => p.id === id)
    if (idx < 0) return

    const team = hydrate(getTeamRaw())
    if (team.length >= LIMITS.MAX_TEAM_SIZE) throw new Error('Time cheio (máx. 6).')

    const chosen = pc[idx]
    saveTeam([...team, chosen])
    pc.splice(idx, 1)
    savePc(pc)
  },

  moveTeamToPc(id) {
    const team = hydrate(getTeamRaw())
    const idx = team.findIndex((p) => p.id === id)
    if (idx < 0) return

    const chosen = team[idx]
    savePc([...hydrate(getPcRaw()), chosen])
    team.splice(idx, 1)
    saveTeam(team)
  },
}
