import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Profile from '../app/Routes/Profile.jsx'

// mock do useNavigate para verificar navegação
let navMock = vi.fn()
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig()
  return { ...actual, useNavigate: () => navMock }
})

describe('Profile page', () => {
  beforeEach(() => {
    localStorage.clear()
    navMock.mockReset()
    // user salvo pelo authService (mesmo formato)
    localStorage.setItem('pm.auth.user', JSON.stringify({ username: 'ash', password: '123456' }))
  })

  it('renderiza username e senha mascarada e permite sair', () => {
    render(<Profile />)

    // pega o username apenas dentro da seção de informações
    const usernameFields = screen.getAllByText(/ash/i)
    expect(usernameFields.length).toBeGreaterThan(0)

    // valida máscara (• ou bullet)
    expect(screen.getByText(/•+/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /sair/i }))
    expect(navMock).toHaveBeenCalledWith('/', { replace: true })
  })
})
