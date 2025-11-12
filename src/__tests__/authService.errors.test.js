import { vi } from 'vitest'
import { authService } from '../shared/services/authService'

describe('authService - ramos de erro', () => {
  beforeEach(() => localStorage.clear())

  it('getUser retorna null quando JSON está corrompido', () => {
    localStorage.setItem(authService.key, '{invalid_json')
    expect(authService.getUser()).toBeNull()
  })

  it('isLogged retorna false se localStorage lança erro', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('x')
    })
    expect(authService.isLogged()).toBe(false)
    getItem.mockRestore()
  })
})
