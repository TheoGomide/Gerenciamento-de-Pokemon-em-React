import '../../shared/styles/Computer.css'
import Abra from '../../shared/sprites/Abra.png'
import Bulbasaur from '../../shared/sprites/bubasaur.png'
import Charizard from '../../shared/sprites/charizard.jpeg'
import Eevee from '../../shared/sprites/Eevee.png'
import Gastly from '../../shared/sprites/Gastly.png'
import Geodude from '../../shared/sprites/Geodude.png'
import Machop from '../../shared/sprites/Machop.png'
import Magikarp from '../../shared/sprites/Magikarp.png'
import Meow from '../../shared/sprites/meow.png'
import Oddish from '../../shared/sprites/Oddish.png'
import Pikachu from '../../shared/sprites/pikachu.png'
import Psyduck from '../../shared/sprites/Psyduck.png'
import Snorlax from '../../shared/sprites/Snorlax.png'
import Squirtle from '../../shared/sprites/Squirtle.png'
import Vulpix from '../../shared/sprites/Vulpix.png'
import Zubat from '../../shared/sprites/Zubat.png'

const SPRITES = [
  { src: Charizard, name: 'Charizard' },
  { src: Pikachu, name: 'Pikachu' },
  { src: Bulbasaur, name: 'Bulbasaur' },
  { src: Squirtle, name: 'Squirtle' },
  { src: Meow, name: 'Meowth' },
  { src: Psyduck, name: 'Psyduck' },
  { src: Geodude, name: 'Geodude' },
  { src: Eevee, name: 'Eevee' },
  { src: Snorlax, name: 'Snorlax' },
  { src: Machop, name: 'Machop' },
  { src: Abra, name: 'Abra' },
  { src: Gastly, name: 'Gastly' },
  { src: Magikarp, name: 'Magikarp' },
  { src: Vulpix, name: 'Vulpix' },
  { src: Oddish, name: 'Oddish' },
  { src: Zubat, name: 'Zubat' },
]

export default function Computer() {
  return (
    <main className="main-div" role="main">
      <section className="left" aria-label="Área para montar o time">
        <p>Colocar os pokémon aqui</p>
      </section>

      <section className="right" aria-label="Caixa de pokémon">
        <h1 className="box">Box 1</h1>

        <ul className="sprite-grid">
          {SPRITES.map((p) => (
            <li key={p.name} className="sprite-item">
              <img src={p.src} width={50} height={50} alt={p.name} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
