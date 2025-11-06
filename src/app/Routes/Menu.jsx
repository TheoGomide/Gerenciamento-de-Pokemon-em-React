import { useNavigate } from 'react-router-dom'
import '../../shared/styles/Menu.css'

export default function Menu() {
  const navigate = useNavigate()

  const handleProfile = () => navigate('/Profile')
  const handleParty = () => navigate('/Party')
  const handleComputer = () => navigate('/Computer')

  return (
    <main role="main" className="contenedor">
      <aside className="menu-lateral" aria-label="Menu lateral">
        <nav>
          <ul>
            <li>
              <button type="button" onClick={handleProfile} className="menu-btn">
                Perfil
              </button>
            </li>
            <li>
              <button type="button" onClick={handleParty} className="menu-btn">
                Time (Party)
              </button>
            </li>
            <li>
              <button type="button" onClick={handleComputer} className="menu-btn">
                Computador (PC)
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <section className="conteudo-principal">
        <h1>Bem-vindo</h1>
        <p>
          Este é o menu do Sistema de Gerenciamento de Pokémon, onde é possível navegar por todas as
          funcionalidades da aplicação!
        </p>
      </section>
    </main>
  )
}
