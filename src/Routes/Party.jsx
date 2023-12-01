import React from 'react';
import '../CSS/Party.css';

function Party() {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="ABP" content="ABP"/>
        <title>ABP</title>
      </head>

      <body>
        <div className="main-div">
          <div className="left-div">
            <div className="party-pokemon">
              <img src="../sprites/charizard.jpeg" width="300" alt="Charizard" />
              <p>Charizard</p>
            </div>
            <div className="party-pokemon">
              <img width="300" alt="Pokemon 2" />
              <p>Pokemon 2</p>
            </div>
            <div className="party-pokemon">
              <img width="300" alt="Pokemon 3" />
              <p>Pokemon 3</p>
            </div>
          </div>
          <div className="right-div">
            <div className="party-pokemon">
              <img width="300" alt="Pokemon 4" />
              <p>Pokemon 4</p>
            </div>
            <div className="party-pokemon">
              <img width="300" alt="Pokemon 5" />
              <p>Pokemon 5</p>
            </div>
            <div className="party-pokemon">
              <img width="300" alt="Pokemon 6" />
              <p>Pokemon 6</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default Party;
