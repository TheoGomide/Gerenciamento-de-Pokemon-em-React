import { useState } from 'react'
import'../CSS/Login.css';

function Login() {
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
            <div class="center-div">
                   <div class="center-field" >
                       <input  type="text" id="username" name="username" placeholder="Digite aqui"/>.
                       <input  type="password" id="password" name="password" placeholder="Digite aqui"/>
                       <button type="submit">Login</button>
                   </div>
            </div>
    </body>
</html>
    );
}

export default Login;