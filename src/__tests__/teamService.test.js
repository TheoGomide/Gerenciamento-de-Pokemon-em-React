import { describe, it, expect, beforeEach } from 'vitest'
import { teamService } from '../shared/services/teamService'
import { STORAGE_KEYS } from '../shared/utils/constants'

const mk = (id, species, level = 10, nickname = species) => ({ id, species, level, nickname })

describe('teamService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('addToTeam() adiciona até 6; mover para PC e voltar funciona', () => {
    // enche o time
    for (let i = 0; i < 6; i++) {
      teamService.addToTeam(
        mk(`t${i + 1}`, ['Charizard', 'Pikachu', 'Eevee', 'Bulbasaur', 'Gastly', 'Geodude'][i])
      )
    }
    expect(teamService.getTeam()).toHaveLength(6)

    // itens extras devem ir para o PC (ou lançar erro, dependendo da sua regra)
    // aqui enviamos para o PC explicitamente:
    teamService.addToPc(mk('p1', 'Machop'))
    expect(teamService.getPc()).toHaveLength(1)

    // mover do PC -> Team (liberando antes uma vaga)
    teamService.moveTeamToPc('t6') // libera 1 slot
    expect(teamService.getTeam()).toHaveLength(5)
    teamService.movePcToTeam('p1')
    expect(teamService.getTeam()).toHaveLength(6)
    expect(teamService.getPc()).toHaveLength(1) // t6 foi para o PC
  })

  it('renameInTeam() e renameInPc() persistem no storage', () => {
    teamService.addToTeam(mk('a1', 'Pikachu', 12))
    teamService.addToPc(mk('b1', 'Eevee', 10))

    teamService.renameInTeam('a1', 'Sparky')
    teamService.renameInPc('b1', 'Foxy')

    const team = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAM))
    const pc = JSON.parse(localStorage.getItem(STORAGE_KEYS.PC))

    expect(team.find((x) => x.id === 'a1').nickname).toBe('Sparky')
    expect(pc.find((x) => x.id === 'b1').nickname).toBe('Foxy')
  })
})
