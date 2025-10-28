import { useNavigate } from 'react-router-dom'
import '../../shared/styles/Saves.css'

export default function Saves() {
  const navigate = useNavigate()

  const handleMenu = () => {
    navigate('/Menu')
  }

  return (
    <main role="main" className="center-div">
      <section className="saves-section" aria-label="Selecione um save para continuar o jogo">
        <button
          type="button"
          className="center-field"
          onClick={handleMenu}
          aria-label="Carregar Save 1"
        >
          Save 1
        </button>

        <button
          type="button"
          className="center-field"
          onClick={handleMenu}
          aria-label="Carregar Save 2"
        >
          Save 2
        </button>

        <button
          type="button"
          className="center-field"
          onClick={handleMenu}
          aria-label="Carregar Save 3"
        >
          Save 3
        </button>
      </section>
    </main>
  )
}
