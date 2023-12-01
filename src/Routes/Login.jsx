import React, { useState } from 'react';
import '../CSS/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSaves = () => {
    navigate("/Saves");
  }

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="ABP" content="ABP"/>
        <title>
          ABP
        </title>
      </head>
      <body>
        <div className="center-div">
          <div className="center-field" >
            <input type="text" id="username" name="username" placeholder="Digite aqui" />
            <input type="password" id="password" name="password" placeholder="Digite aqui" />
            <button onClick={handleSaves}>Login</button>
          </div>
        </div>
      </body>
    </html>
  );
}

export default Login;
