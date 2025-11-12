import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Profile from '../app/Routes/Profile.jsx'

let navMock = vi.fn()
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig()
  return { ...actual, useNavigate: () => navMock }
})

describe('Profile page', () => {
  beforeEach(() => {
    localStorage.clear()
    navMock.mockReset()
    localStorage.setItem('pm.auth.user', JSON.stringify({ username: 'ash', password: '123456' }))
  })

  it('renderiza username e senha mascarada e permite sair', () => {
    render(<Profile />)

    const usernameFields = screen.getAllByText(/ash/i)
    expect(usernameFields.length).toBeGreaterThan(0)

    expect(screen.getByText(/•+/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /sair/i }))
    expect(navMock).toHaveBeenCalledWith('/', { replace: true })
  })
})
