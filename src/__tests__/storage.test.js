import { readJSON } from '../shared/utils/storage'

describe('storage util', () => {
  beforeEach(() => localStorage.clear())

  it('get com default quando não existe', () => {
    expect(readJSON('x', ['default'])).toEqual(['default'])
  })

  it('get com JSON inválido retorna default', () => {
    localStorage.setItem('x', '{bad')
    expect(readJSON('x', { ok: true })).toEqual({ ok: true })
  })
})
