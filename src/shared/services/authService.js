const AUTH_KEY = 'pm.auth.user'

export const authService = {
  login(username, password) {
    const u = String(username || '').trim()
    const p = String(password || '').trim()
    const ok = !!(u && p)
    if (ok) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ username: u, password: p }))
      window.dispatchEvent(new Event('storage'))
    }
    return ok
  },

  logout() {
    localStorage.removeItem(AUTH_KEY)
    window.dispatchEvent(new Event('storage'))
  },

  isLogged() {
    try {
      return !!localStorage.getItem(AUTH_KEY)
    } catch {
      return false
    }
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY)) || null
    } catch {
      return null
    }
  },

  key: AUTH_KEY,
}
