const AUTH_KEY = 'pm.auth.user'

export const authService = {
  login(username, password) {
    const ok = !!(username?.trim() && password?.trim())
    if (ok) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ username: String(username).trim() }))
    }
    return ok
  },
  logout() {
    localStorage.removeItem(AUTH_KEY)
  },
  isLogged() {
    return !!localStorage.getItem(AUTH_KEY)
  },
  key: AUTH_KEY,
}
