import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav>
            <Link to="/">Login</Link>
            <Link to="/Menu">Menu</Link>
            <Link to="/Party">Party</Link>
            <Link to="/Saves">Saves</Link>
        </nav>
    )
}

export default Navbar;