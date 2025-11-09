import { describe, it, expect, beforeEach } from 'vitest'
import { teamService } from '../shared/services/teamService'
import { STORAGE_KEYS } from '../shared/utils/constants'

const mk = (id, species, level = 10, nickname = species) => ({ id, species, level, nickname })

describe('teamService', () => {
  beforeEach(() => {
    // evita seed automático
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify([]))
    localStorage.setItem(STORAGE_KEYS.PC, JSON.stringify([]))
  })

  it('addToTeam() adiciona até 6; mover para PC e voltar funciona', () => {
    for (let i = 0; i < 6; i++) {
      teamService.addToTeam(
        mk(`t${i + 1}`, ['Charizard', 'Pikachu', 'Eevee', 'Bulbasaur', 'Gastly', 'Geodude'][i])
      )
    }
    expect(teamService.getTeam()).toHaveLength(6)

    teamService.addToPc(mk('p1', 'Machop'))
    expect(teamService.getPc()).toHaveLength(1)

    const sixthId = teamService.getTeam()[5].id
    teamService.moveTeamToPc(sixthId)
    expect(teamService.getTeam()).toHaveLength(5)

    const pcFirstId = teamService.getPc()[0].id
    teamService.movePcToTeam(pcFirstId)

    expect(teamService.getTeam()).toHaveLength(6)
    expect(teamService.getPc()).toHaveLength(1)
  })

  it('renameInTeam() e renameInPc() persistem no storage', () => {
    teamService.addToTeam(mk('a1', 'Pikachu', 12))
    teamService.addToPc(mk('b1', 'Eevee', 10))

    const realTeamId = teamService.getTeam()[0].id
    const realPcId = teamService.getPc()[0].id

    teamService.renameInTeam(realTeamId, 'Sparky')
    teamService.renameInPc(realPcId, 'Foxy')

    const team = teamService.getTeam()
    const pc = teamService.getPc()

    const renamedTeam = team.find((x) => x.id === realTeamId)
    const renamedPc = pc.find((x) => x.id === realPcId)

    expect(renamedTeam).toBeDefined()
    expect(renamedTeam.nickname).toBe('Sparky')
    expect(renamedPc).toBeDefined()
    expect(renamedPc.nickname).toBe('Foxy')
  })
})
