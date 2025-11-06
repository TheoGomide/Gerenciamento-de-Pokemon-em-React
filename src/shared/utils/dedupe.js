export function dedupeById(arr = []) {
  const seen = new Set()
  return (arr || []).filter((p) => {
    const id = p?.id
    if (!id) return true
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })
}
