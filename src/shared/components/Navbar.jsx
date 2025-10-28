import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
const Navbar = () => {
  return (
    <nav>
      <Link className="link" to="/">
        Login
      </Link>
      <Link className="link" to="/Menu">
        Menu
      </Link>
      <Link className="link" to="/Party">
        Party
      </Link>
      <Link className="link" to="/Saves">
        Saves
      </Link>
      <Link className="link" to="/Status">
        Status
      </Link>
      <Link className="link" to="/Computer">
        Computer
      </Link>
    </nav>
  )
}

export default Navbar
