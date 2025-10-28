import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../shared/styles/Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSaves = (e) => {
    e.preventDefault()
    // lógica de autenticação (futura)
    navigate('/Saves')
  }

  return (
    <main role="main" className="center-div">
      <section className="center-field" aria-label="Tela de login">
        <h2>Login</h2>

        <form onSubmit={handleSaves}>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>
      </section>
    </main>
  )
}
