import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Computer from '../app/Routes/Computer'
import * as useRosterHook from '../shared/hooks/useRoster'

describe('Computer.jsx', () => {
  const mockMovePcToTeam = vi.fn()
  const mockMoveTeamToPc = vi.fn()

  const basePokemon = (id, species = 'Pikachu') => ({
    id,
    species,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    level: 10,
  })

  beforeEach(() => {
    vi.spyOn(useRosterHook, 'useRoster').mockReturnValue({
      team: [basePokemon(1), basePokemon(2)],
      pc: [basePokemon(3), basePokemon(4), basePokemon(5)],
      movePcToTeam: mockMovePcToTeam,
      moveTeamToPc: mockMoveTeamToPc,
      error: null,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renderiza a tela do computador com o time e o PC', () => {
    render(<Computer />)
    expect(screen.getByText('Computer')).toBeInTheDocument()
    expect(screen.getByText('Seu Time')).toBeInTheDocument()
    expect(screen.getByText('BOX 01')).toBeInTheDocument()
  })

  it('exibe os pokémons do time', () => {
    render(<Computer />)
    const teamItems = screen.getAllByRole('listitem')
    expect(teamItems.length).toBeGreaterThan(0)
  })

  it('exibe os pokémons do PC como botões clicáveis', () => {
    render(<Computer />)
    const pcButtons = screen.getAllByRole('button', { name: /clique para adicionar ao time/i })
    expect(pcButtons.length).toBeGreaterThan(0)
  })

  it('chama movePcToTeam ao clicar em um Pokémon do PC', () => {
    render(<Computer />)
    const firstPc = screen.getAllByRole('button')[0]
    fireEvent.click(firstPc)
    expect(mockMovePcToTeam).toHaveBeenCalledTimes(1)
  })

  it('chama moveTeamToPc ao clicar no botão Enviar p/ PC', () => {
    render(<Computer />)
    const sendButtons = screen.getAllByRole('button', { name: /Enviar p\/ PC/i })
    fireEvent.click(sendButtons[0])
    expect(mockMoveTeamToPc).toHaveBeenCalledTimes(1)
  })

  it('exibe mensagem de erro se houver erro retornado pelo hook', () => {
    vi.spyOn(useRosterHook, 'useRoster').mockReturnValueOnce({
      team: [],
      pc: [],
      movePcToTeam: vi.fn(),
      moveTeamToPc: vi.fn(),
      error: 'Erro de teste',
    })

    render(<Computer />)
    expect(screen.getByText('Erro de teste')).toBeInTheDocument()
  })
})
