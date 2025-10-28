import '../../shared/styles/Status.css'
import Charizard from '../../shared/sprites/charizard.jpeg'

export default function Status() {
  return (
    <main className="main-div" role="main" aria-label="Status do Pokémon">
      <section className="left-div" aria-label="Resumo">
        <div className="party-pokemon">
          <figure className="pokemon-figure">
            <img
              src={Charizard}
              width={200}
              height={200}
              alt="Charizard"
              className="pokemon-image"
            />
            <figcaption className="sr-only">Charizard</figcaption>
          </figure>

          <div className="pokemon-header">
            <h1 className="pokemon-name">Charizard ♂</h1>
            <p>
              <strong>Lv.</strong> 36 <br /> <strong>DEX Nº</strong> 6
            </p>
          </div>
          <ul className="left-list" aria-label="Atributos adicionais"></ul>
        </div>
      </section>

      <section className="right-div" aria-label="Estatísticas e golpes">
        <h2>Stats</h2>
        <ul className="stats-list">
          <li>HP: 78</li>
          <li>Attack: 84</li>
          <li>Defense: 78</li>
          <li>Sp. Atk: 109</li>
          <li>Sp. Def: 85</li>
          <li>Speed: 100</li>
        </ul>

        <h2>Moves learned</h2>
        <ul className="moves-list">
          <li>Flame Burst</li>
          <li>Fire Fang</li>
          <li>Inferno</li>
          <li>Slash</li>
        </ul>
      </section>
    </main>
  )
}
