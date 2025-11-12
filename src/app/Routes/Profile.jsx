import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../shared/services/authService'
import { profileService } from '../../shared/services/profileService'
import '../../shared/styles/Profile.css'
import defaultTrainer from '../../shared/images/charizard.jpeg'

export default function Profile() {
  const navigate = useNavigate()

  const user = authService.getUser() || { username: 'Usuário' }
  const baseProfile = profileService.get()

  const [editing, setEditing] = useState(false)
  const [region, setRegion] = useState(baseProfile.region || 'Kanto')
  const [favorite, setFavorite] = useState(baseProfile.favoritePokemon || 'Pikachu')
  const [avatar, setAvatar] = useState(baseProfile.avatar || defaultTrainer)

  const userPassword = user?.password ? String(user.password) : ''

  const maskedPassword = useMemo(() => {
    if (!userPassword) return '—'
    const n = Math.max(8, userPassword.length)
    return '•'.repeat(n)
  }, [userPassword])

  useEffect(() => {
    const handler = () => {
      const p = profileService.get()
      setRegion(p.region || 'Kanto')
      setFavorite(p.favoritePokemon || 'Pikachu')
      setAvatar(p.avatar || defaultTrainer)
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  useEffect(() => {
    if (avatar && /^https?:\/\//i.test(avatar)) {
      const img = new Image()
      img.src = avatar
    }
  }, [avatar])

  const save = () => {
    const next = profileService.update({
      region,
      favoritePokemon: favorite,
      avatar: avatar || defaultTrainer,
    })
    setRegion(next.region)
    setFavorite(next.favoritePokemon)
    setAvatar(next.avatar || defaultTrainer)
    setEditing(false)
  }

  const cancel = () => {
    setEditing(false)
    const p = profileService.get()
    setRegion(p.region || 'Kanto')
    setFavorite(p.favoritePokemon || 'Pikachu')
    setAvatar(p.avatar || defaultTrainer)
  }

  const doLogout = () => {
    authService.logout()
    navigate('/', { replace: true })
  }

  return (
    <section className="profileScreen">
      <div className="profileCard">
        <header className="profileHeader">
          <img
            src={avatar || defaultTrainer}
            alt="Avatar"
            className="profileAvatar"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = defaultTrainer
            }}
          />
          <div className="profileHeaderInfo">
            <h2>{user.username}</h2>
            <p className="profileLevel">Treinador Pokémon</p>
          </div>
        </header>

        <div className="profileBody">
          <div className="profileField">
            <strong>Usuário:</strong>
            <span>{user.username}</span>
          </div>
          <div className="profileField">
            <strong>Senha:</strong>
            <span>{maskedPassword}</span>
          </div>

          {!editing ? (
            <>
              <div className="profileField">
                <strong>Região:</strong>
                <span>{region}</span>
              </div>
              <div className="profileField">
                <strong>Pokémon Favorito:</strong>
                <span>{favorite}</span>
              </div>
            </>
          ) : (
            <>
              <div className="profileField">
                <strong>Região:</strong>
                <input
                  className="profileInput"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Kanto, Johto..."
                />
              </div>
              <div className="profileField">
                <strong>Pokémon Favorito:</strong>
                <input
                  className="profileInput"
                  value={favorite}
                  onChange={(e) => setFavorite(e.target.value)}
                  placeholder="Pikachu, Charizard..."
                />
              </div>
              <div className="profileField">
                <strong>Avatar (URL):</strong>
                <input
                  className="profileInput"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://i.imgur.com/xxxxx.png"
                />
              </div>
            </>
          )}
        </div>

        <footer className="profileFooter">
          {!editing ? (
            <>
              <button className="btnEdit" onClick={() => setEditing(true)}>
                Editar Perfil
              </button>
              <button className="btnLogout" onClick={doLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <button className="btnEdit" onClick={save}>
                Salvar
              </button>
              <button className="btnLogout" onClick={cancel}>
                Cancelar
              </button>
            </>
          )}
        </footer>
      </div>
    </section>
  )
}
