import '../CSS/Menu.css';
import { useNavigate } from 'react-router-dom';
function Menu() {

    const navigate = useNavigate();

    const handleParty = () => {
      navigate("/Party");
    }
    const handleExit = () => {
        navigate("/");
      }

  return (
    <html>
      <body>

<div className="contenedor">
    <div className="menu-lateral">
        <ul>
          <a href="#">Profile</a>
          <a href="#" onClick={handleParty}>Party</a>
          <a href="#">Bag</a>
          <a href="#">Computer</a>
          <a href="#" onClick={handleExit}>Exit</a>
        </ul>
    </div>

    <div className="contenido-principal">
        <h1>Bienvenido</h1>
        <p>Contenido principal de la página.</p>
    </div>
</div>

</body>
    </html>
  );
}

export default Menu;
