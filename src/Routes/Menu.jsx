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
      const handleComputer = () => {
        navigate("/Computer");
      }

  return (
    <html>
      <body>

<div className="contenedor">
    <div className="menu-lateral">
        <ul>
          <a href="#">Profile</a>
          <a href="#" onClick={handleParty}>Party</a>
          <a href="#" onClick={handleComputer} >Computer</a>
          <a href="#" onClick={handleExit}>Exit</a>
        </ul>
    </div>

    <div className="conteudo-principal">
        <h1>Bem vindo</h1>
        <p>Esse é o menu do Sistema de Gerenciamento de pokemon, onde será possível você navegar por toda a aplicação!</p>
    </div>
</div>

</body>
    </html>
  );
}

export default Menu;
