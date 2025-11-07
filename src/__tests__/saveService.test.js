import { describe, it, expect, beforeEach, vi } from 'vitest'
import { saveService } from '../shared/services/saveService'
import { STORAGE_KEYS } from '../shared/utils/constants'

describe('saveService', () => {
  beforeEach(() => {
    // limpa tudo entre os testes
    localStorage.clear()
    vi.restoreAllMocks()
  })

  function snapshot(teamLen = 2, pcLen = 3) {
    const mk = (id, species, level = 10, nickname = species) => ({ id, species, level, nickname })
    return {
      team: Array.from({ length: teamLen }, (_, i) =>
        mk(`t${i + 1}`, ['Charizard', 'Eevee', 'Pikachu'][i % 3] || 'Pikachu', 30 + i)
      ),
      pc: Array.from({ length: pcLen }, (_, i) =>
        mk(`p${i + 1}`, ['Bulbasaur', 'Gastly', 'Geodude', 'Machop'][i % 4] || 'Bulbasaur', 12 + i)
      ),
    }
  }

  it('create() cria um save com snapshot e aparece no list() (recente primeiro)', () => {
    const s1 = saveService.create('Teste 1', snapshot(2, 1))

    const list = saveService.list()
    expect(list).toHaveLength(2)
    // mais recente primeiro
    expect(list[0].key).toBe(s1.key)
    // preview hidratado (tem level/nickname/species preservados)
    expect(list[0].teamPreview[0]).toHaveProperty('species')
    expect(list[0].teamPreview[0]).toHaveProperty('level')
  })

  it('load() grava nas chaves oficiais (TEAM/PC), define active e dispara evento', () => {
    const s = saveService.create('Jogada', snapshot(2, 2))
    const spyEvt = vi.spyOn(window, 'dispatchEvent')

    const loaded = saveService.load(s.key)

    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAM))).toHaveLength(2)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.PC))).toHaveLength(2)
    expect(saveService.getActiveKey()).toBe(s.key)
    expect(spyEvt).toHaveBeenCalled() // pm:team-updated
    // retorno hidratado
    expect(loaded.team[0]).toHaveProperty('species')
  })

  it('overwrite() atualiza o snapshot do save', () => {
    const s = saveService.create('Alpha', snapshot(1, 1))
    const before = saveService.list().find((x) => x.key === s.key).createdAt

    const ok = saveService.overwrite(s.key, snapshot(2, 3))
    expect(ok).toBe(true)

    const after = saveService.list().find((x) => x.key === s.key).createdAt
    expect(after).toBeGreaterThanOrEqual(before)

    // garante que o novo snapshot será carregado
    const res = saveService.load(s.key)
    expect(res.team).toHaveLength(2)
    expect(res.pc).toHaveLength(3)
  })

  it('remove() apaga somente o save indicado e limpa active quando necessário', () => {
    const a = saveService.create('A', snapshot())
    const b = saveService.create('B', snapshot())
    saveService.setActiveKey(a.key)

    saveService.remove(a.key)

    const list = saveService.list()
    expect(list).toHaveLength(1)
    expect(list[0].key).toBe(b.key)
    expect(saveService.getActiveKey()).toBeNull() // limpou active
  })
})
