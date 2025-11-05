import { STORAGE_KEYS, LIMITS } from '../utils/constants'

const read = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.DECK) || '[]')
const write = (deck) => localStorage.setItem(STORAGE_KEYS.DECK, JSON.stringify(deck))

export const deckService = {
  get() {
    return read()
  },
  add(pokemon) {
    const deck = read()
    if (deck.length >= LIMITS.MAX_DECK_SIZE) {
      throw new Error('Deck cheio (máx. 6)')
    }
    write([...deck, pokemon])
  },
  remove(id) {
    write(read().filter((p) => p.id !== id))
  },
  clear() {
    write([])
  },
}
