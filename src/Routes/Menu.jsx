import React from 'react';
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
    <>
      <body>
        <div className="sidebar">
          <div>
            <button>Profile</button>
            <button onClick={handleParty}>Party</button>
            <button>Bag</button>
            <button>Computer</button>
            <button onClick={handleExit}>Exit</button>
          </div>
        </div>
        <div className="content">
          <h1>Conteúdo Principal</h1>
          <p>Este é o conteúdo principal da página.</p>
        </div>
      </body>
    </>
  );
}

export default Menu;
