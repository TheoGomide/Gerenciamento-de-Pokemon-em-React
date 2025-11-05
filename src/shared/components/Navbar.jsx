import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import '../styles/Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const isLogged = authService.isLogged()

  const handleLogout = () => {
    authService.logout()
    navigate('/', { replace: true })
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          <Link
            to="/Menu"
            className={`navbar-link ${!isLogged ? 'disabled' : ''}`}
            aria-disabled={!isLogged}
          >
            Menu
          </Link>
          <Link
            to="/Party"
            className={`navbar-link ${!isLogged ? 'disabled' : ''}`}
            aria-disabled={!isLogged}
          >
            Party
          </Link>
          <Link
            to="/Saves"
            className={`navbar-link ${!isLogged ? 'disabled' : ''}`}
            aria-disabled={!isLogged}
          >
            Saves
          </Link>
          <Link
            to="/Status"
            className={`navbar-link ${!isLogged ? 'disabled' : ''}`}
            aria-disabled={!isLogged}
          >
            Status
          </Link>
          <Link
            to="/Computer"
            className={`navbar-link ${!isLogged ? 'disabled' : ''}`}
            aria-disabled={!isLogged}
          >
            Computer
          </Link>
          <Link
            to="/Profile"
            className={`navbar-link ${!isLogged ? 'disabled' : ''}`}
            aria-disabled={!isLogged}
          >
            Profile
          </Link>
        </div>

        <div className="navbar-auth">
          {isLogged ? (
            <button className="navbar-button" onClick={handleLogout}>
              Sair
            </button>
          ) : (
            <Link to="/" className="navbar-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
