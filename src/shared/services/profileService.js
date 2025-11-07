import { readJSON, writeJSON } from '../utils/storage'
import { STORAGE_KEYS } from '../utils/constants'

const KEY = STORAGE_KEYS.PROFILE || 'pm.profile'

const DEFAULT_PROFILE = {
  region: 'Kanto',
  favoritePokemon: 'Pikachu',
}

export const profileService = {
  get() {
    return readJSON(KEY, DEFAULT_PROFILE)
  },
  update(patch) {
    const curr = this.get()
    const next = { ...curr, ...patch }
    writeJSON(KEY, next)
    return next
  },
  reset() {
    writeJSON(KEY, DEFAULT_PROFILE)
    return DEFAULT_PROFILE
  },
}
