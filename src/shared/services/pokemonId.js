export function ensureId(p) {
  if (p?.id) return p
  const id = `${p?.species || 'poke'}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  return { ...p, id }
}
