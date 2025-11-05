import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../shared/components/Navbar'
import { authService } from '../shared/services/authService'

describe('Navbar', () => {
  beforeEach(() => localStorage.clear())

  it('mostra o botão de Login quando não logado', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('mostra o botão de Sair quando logado', () => {
    authService.login('ash', '123')
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByText('Sair')).toBeInTheDocument()
  })

  it('chama logout ao clicar em Sair', () => {
    authService.login('ash', '123')
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    const btn = screen.getByText('Sair')
    fireEvent.click(btn)
    expect(localStorage.getItem(authService.key)).toBeNull()
  })
})
