import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProtectedRoute from '../app/Routes/ProtectedRoute'
import { authService } from '../shared/services/authService'

describe('ProtectedRoute', () => {
  beforeEach(() => localStorage.clear())

  it('permite acesso se o usuário estiver logado', () => {
    authService.login('ash', '123')
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Conteúdo protegido</div>
        </ProtectedRoute>
      </MemoryRouter>
    )
    expect(screen.getByText('Conteúdo protegido')).toBeInTheDocument()
  })

  it('bloqueia acesso se o usuário não estiver logado', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Conteúdo protegido</div>
        </ProtectedRoute>
      </MemoryRouter>
    )
    expect(screen.queryByText('Conteúdo protegido')).not.toBeInTheDocument()
  })
})
