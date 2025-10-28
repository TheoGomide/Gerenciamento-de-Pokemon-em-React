import { useNavigate } from 'react-router-dom'
import '../../shared/styles/Party.css'

export default function Party() {
  const navigate = useNavigate()

  const handleStatus = () => {
    navigate('/Status')
  }

  return (
    <main className="main-div" role="main">
      <section className="left-div" aria-label="Pokémons principais">
        <button
          type="button"
          className="party-pokemon"
          onClick={handleStatus}
          aria-label="Abrir status do Charizard"
        >
          Charizard
        </button>

        <div className="party-pokemon">
          <p>Pokémon 2</p>
        </div>

        <div className="party-pokemon">
          <p>Pokémon 3</p>
        </div>
      </section>

      <section className="right-div" aria-label="Pokémons adicionais">
        <div className="party-pokemon">
          <p>Pokémon 4</p>
        </div>

        <div className="party-pokemon">
          <p>Pokémon 5</p>
        </div>

        <div className="party-pokemon">
          <p>Pokémon 6</p>
        </div>
      </section>
    </main>
  )
}
