import { render, screen, fireEvent } from '@testing-library/react'
import Profile from '../app/Routes/Profile'
import { authService } from '../shared/services/authService'
import { profileService } from '../shared/services/profileService'
import { vi } from 'vitest'

const nav = vi.fn()

vi.mock('react-router-dom', async (orig) => {
  const actual = await orig()
  return { ...actual, useNavigate: () => nav }
})

describe('Profile - edição e logout', () => {
  const base = { region: 'Kanto', favoritePokemon: 'Pikachu', avatar: '/img.png' }

  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()

    vi.spyOn(authService, 'getUser').mockReturnValue({ username: 'ash', password: '123456' })
    // get() sempre devolve algo consistente
    vi.spyOn(profileService, 'get').mockReturnValue(base)
    // update() retorna o merge do "base" com o patch (o componente espera isso)
    vi.spyOn(profileService, 'update').mockImplementation((patch) => ({ ...base, ...patch }))
  })

  it('salva alterações e sai do modo edição', () => {
    render(<Profile />)
    fireEvent.click(screen.getByRole('button', { name: /editar/i }))
    fireEvent.change(screen.getByPlaceholderText(/kanto, johto/i), { target: { value: 'Johto' } })
    fireEvent.change(screen.getByPlaceholderText(/pikachu, charizard/i), {
      target: { value: 'Totodile' },
    })
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }))

    expect(profileService.update).toHaveBeenCalledWith(
      expect.objectContaining({ region: 'Johto', favoritePokemon: 'Totodile' })
    )
    expect(screen.queryByRole('button', { name: /salvar/i })).toBeNull()
  })

  it('cancelar restaura valores originais', () => {
    render(<Profile />)
    fireEvent.click(screen.getByRole('button', { name: /editar/i }))
    fireEvent.change(screen.getByPlaceholderText(/kanto, johto/i), { target: { value: 'Johto' } })
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
    expect(screen.getByText('Kanto')).toBeInTheDocument()
  })

  it('máscara de senha vazia quando usuário não tem password', () => {
    vi.spyOn(authService, 'getUser').mockReturnValueOnce({ username: 'misty' })
    render(<Profile />)
    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('logout chama authService.logout e navega para "/"', () => {
    const logoutSpy = vi.spyOn(authService, 'logout').mockImplementation(() => {})
    render(<Profile />)
    fireEvent.click(screen.getByRole('button', { name: /sair/i }))
    expect(logoutSpy).toHaveBeenCalled()
    expect(nav).toHaveBeenCalledWith('/', { replace: true })
  })

  it('mostra pelo menos 8 • na máscara de senha', () => {
    // senha curta para forçar pad pra 8
    vi.spyOn(authService, 'getUser').mockReturnValueOnce({ username: 'brock', password: '1' })
    render(<Profile />)
    expect(screen.getByText('••••••••')).toBeInTheDocument() // 8 bullets
  })

  it('fallback do avatar (onError) troca para default', () => {
    render(<Profile />)
    const img = screen.getByAltText(/avatar/i)
    // simula erro de carregamento
    fireEvent.error(img)
    expect(img.getAttribute('src')).toMatch(/charizard\.jpeg$/) // defaultTrainer
  })
})
