import { authService } from '../shared/services/authService'

describe('authService', () => {
  beforeEach(() => localStorage.clear())

  it('realiza login e grava o usuário no localStorage', () => {
    const ok = authService.login('ash', '123')
    expect(ok).toBe(true)
    const stored = JSON.parse(localStorage.getItem(authService.key))
    expect(stored.username).toBe('ash')
  })

  it('retorna falso se usuário ou senha estiverem vazios', () => {
    expect(authService.login('', '')).toBe(false)
  })

  it('faz logout e remove o item do localStorage', () => {
    authService.login('misty', '456')
    authService.logout()
    expect(localStorage.getItem(authService.key)).toBeNull()
  })

  it('isLogged() retorna true se usuário estiver logado', () => {
    authService.login('brock', '789')
    expect(authService.isLogged()).toBe(true)
  })

  it('isLogged() retorna false se não estiver logado', () => {
    expect(authService.isLogged()).toBe(false)
  })
})
