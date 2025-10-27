import '../../shared/styles/Login.css';
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
            <h2>Login</h2>
            <label>Username:</label>
            <input type="text" id="username" name="username" placeholder="username" />
            <label>Password:</label>
            <input type="password" id="password" name="password" placeholder="password" />
            <button onClick={handleSaves}>Login</button>
          </div>
        </div>
      </body>
    </html>
  );
}

export default Login;
