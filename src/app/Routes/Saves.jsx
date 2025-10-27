
import {  useNavigate } from 'react-router-dom';
import '../../shared/styles/Saves.css';

function Saves() {
  const navigate = useNavigate();

  const handleMenu = () => {
    navigate("/Menu");
  }

  return (
    <div className="center-div">
      <div className="center-field" onClick={handleMenu}>
        <p>Save 1</p>
      </div>
      <div className="center-field" onClick={handleMenu}>
        <p>Save 2</p>
      </div>
      <div className="center-field" onClick={handleMenu}>
        <p>Save 3</p>
      </div>
    </div>
  );
}

export default Saves;
