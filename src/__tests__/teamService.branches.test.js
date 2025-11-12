import { teamService } from '../shared/services/teamService'
import { STORAGE_KEYS } from '../shared/utils/constants'

const mk = (id, species) => ({ id, species, level: 10, nickname: species })

describe('teamService - ramos e limites', () => {
  beforeEach(() => {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify([]))
    localStorage.setItem(STORAGE_KEYS.PC, JSON.stringify([]))
  })

  it('addToTeam com time cheio lança erro controlado', () => {
    for (let i = 0; i < 6; i++)
      teamService.addToTeam({ id: `t${i}`, species: 'Pikachu', level: 10, nickname: 'Pikachu' })
    expect(() =>
      teamService.addToTeam({ id: 'tx', species: 'Eevee', level: 10, nickname: 'Eevee' })
    ).toThrow(/Time cheio/i)
  })

  it('moveTeamToPc com id inexistente não altera estado', () => {
    teamService.addToTeam(mk('a1', 'Pikachu'))
    const teamBefore = teamService.getTeam()
    const pcBefore = teamService.getPc()
    const res = teamService.moveTeamToPc('id-que-nao-existe')
    expect(teamService.getTeam()).toEqual(teamBefore)
    expect(teamService.getPc()).toEqual(pcBefore)
    if (typeof res === 'boolean') expect(res).toBe(false)
  })

  it('movePcToTeam com id inexistente não altera estado', () => {
    teamService.addToPc(mk('b1', 'Eevee'))
    const teamBefore = teamService.getTeam()
    const pcBefore = teamService.getPc()
    const res = teamService.movePcToTeam('id-que-nao-existe')
    expect(teamService.getTeam()).toEqual(teamBefore)
    expect(teamService.getPc()).toEqual(pcBefore)
    if (typeof res === 'boolean') expect(res).toBe(false)
  })

  it('renameInTeam/renameInPc com id inexistente falham controladamente', () => {
    teamService.addToTeam(mk('a1', 'Pikachu'))
    teamService.addToPc(mk('b1', 'Eevee'))
    const r1 = teamService.renameInTeam('nope', 'X')
    const r2 = teamService.renameInPc('nope', 'Y')
    if (typeof r1 === 'boolean') expect(r1).toBe(false)
    if (typeof r2 === 'boolean') expect(r2).toBe(false)
  })
})
