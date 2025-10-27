import { useNavigate } from 'react-router-dom';
import '../../shared/styles/Party.css';
  

function Party() {
  const navigate = useNavigate();

  const handleStatus = () => {
    navigate("/Status");
  }

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="ABP" content="ABP"/>
        <title>ABP</title>
      </head>

      <body>
        <div className="main-div">
          <div>
            <div className="party-pokemon" onClick={handleStatus}>  
              <p>Charizard</p>
            </div>
            <div className="party-pokemon">
              <p>Pokemon 2</p>
            </div>
            <div className="party-pokemon">
              <p>Pokemon 3</p>
            </div>
          </div>
          <div className="right-div">
            <div className="party-pokemon">
              <p>Pokemon 4</p>
            </div>
            <div className="party-pokemon">
              <p>Pokemon 5</p>
            </div>
            <div className="party-pokemon">
              <p>Pokemon 6</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default Party;
