import { profileService } from '../shared/services/profileService'
import { STORAGE_KEYS } from '../shared/utils/constants'

describe('profileService', () => {
  beforeEach(() => localStorage.removeItem(STORAGE_KEYS?.PROFILE ?? 'pm.profile'))

  it('get retorna default quando vazio', () => {
    const p = profileService.get()
    expect(p).toEqual(expect.objectContaining({ region: expect.any(String) }))
  })

  it('update (como set) e get persistem o perfil', () => {
    const novo = { region: 'Johto', favoritePokemon: 'Totodile', avatar: 'a.png' }
    profileService.update(novo) // usamos update para escrever tudo
    expect(profileService.get()).toEqual(novo)
  })

  it('update faz merge preservando campos não passados', () => {
    profileService.update({ region: 'Kanto', favoritePokemon: 'Pikachu', avatar: 'x.png' })
    profileService.update({ favoritePokemon: 'Eevee' })
    expect(profileService.get()).toEqual({
      region: 'Kanto',
      favoritePokemon: 'Eevee',
      avatar: 'x.png',
    })
  })

  it('get lida com JSON corrompido retornando default', () => {
    const key = STORAGE_KEYS?.PROFILE ?? 'pm.profile'
    localStorage.setItem(key, '{bad')
    const p = profileService.get()
    expect(p).toEqual(expect.objectContaining({ region: expect.any(String) }))
  })

  it('reset volta ao perfil padrão', () => {
    profileService.update({ region: 'Johto', favoritePokemon: 'Totodile', avatar: 'a.png' })
    const p1 = profileService.reset()
    expect(p1).toEqual(expect.objectContaining({ region: 'Kanto', favoritePokemon: 'Pikachu' }))
    const p2 = profileService.get()
    expect(p2).toEqual(expect.objectContaining({ region: 'Kanto', favoritePokemon: 'Pikachu' }))
  })
})
