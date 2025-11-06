import { useCallback, useEffect, useState } from 'react'
import { teamService } from '../services/teamService'
import { saveService } from '../services/saveService'

export function useRoster() {
  const [team, setTeam] = useState([])
  const [pc, setPc] = useState([])
  const [error, setError] = useState(null)

  const refresh = useCallback(() => {
    setTeam(teamService.getTeam())
    setPc(teamService.getPc())
    setError(null)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    const handler = () => {
      refresh()
    }
    window.addEventListener('pm:team-updated', handler)
    return () => window.removeEventListener('pm:team-updated', handler)
  }, [refresh])

  // ações
  const addToTeam = (p) => {
    try {
      teamService.addToTeam(p)
      refresh()
    } catch (e) {
      setError(e.message)
    }
  }
  const addToPc = (p) => {
    teamService.addToPc(p)
    refresh()
  }
  const movePcToTeam = (id) => {
    try {
      teamService.movePcToTeam(id)
      refresh()
    } catch (e) {
      setError(e.message)
    }
  }
  const moveTeamToPc = (id) => {
    teamService.moveTeamToPc(id)
    refresh()
  }

  const rename = (source, id, nickname) => {
    if (source === 'team') teamService.renameInTeam(id, nickname)
    else teamService.renameInPc(id, nickname)
    refresh()
  }

  // saves
  const createSave = (name) => {
    const snapshot = { team: teamService.getTeam(), pc: teamService.getPc() }
    return saveService.create(name, snapshot)
  }
  const listSaves = () => saveService.list()
  const loadSave = (key) => {
    const data = saveService.load(key)
    if (data) {
      setTeam(data.team)
      setPc(data.pc)
    }
  }
  const removeSave = (id) => {
    saveService.remove(id)
  }

  return {
    team,
    pc,
    error,
    addToTeam,
    addToPc,
    movePcToTeam,
    moveTeamToPc,
    rename,
    createSave,
    listSaves,
    loadSave,
    removeSave,
  }
}
