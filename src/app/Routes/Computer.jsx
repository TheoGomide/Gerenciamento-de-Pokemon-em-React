import { useNavigate } from 'react-router-dom';
import '../../shared/styles/Computer.css';

function Computer() {
    const navigate = useNavigate();
  

  
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="ABP" content="ABP"/>
          <title>ABP</title>
        </head>
  
        <body>
          <div className="main-div">
            <div className='left'>
              <p>Colocar os pokemon aqui </p>
            </div>
           <div className="right">
                <h1 className="box">Box 1</h1>
                <table border={1} >
                    <th><img src="../src/sprites/charizard.jpeg" width={50} alt="cha" /></th>
                    <th><img src="../src/sprites/pikachu.png" width={50} alt="cha" /></th>
                    <th><img src="../src/sprites/bubasaur.png" width={50} alt="cha" /></th>
                    <th><img src="../src/sprites/Squirtle.png" width={50} alt="cha" />
                    </th>

                    <tr>
                        <td><img src="../src/sprites/meow.png" width={50} alt="cha" /></td>
                        <td><img src="../src/sprites/Psyduck.png" width={50} alt="cha" /></td>
                        <td><img src="../src/sprites/Geodude.png" width={50} alt="cha" /></td>
                        <td><img src="../src/sprites/Eevee.png" width={50} alt="cha" /></td>
                
                    </tr>
                    <th><img src="../src/sprites/Snorlax.png" width={50} alt="cha" /></th>
                    <th><img src="../src/sprites/Machop.png" width={50} alt="cha" /></th>
                    <th><img src="../src/sprites/Abra.png" width={50} alt="cha" /></th>
                    <th><img src="../src/sprites/Gastly.png" width={50} alt="cha" />
                    </th>

                    <tr>
                        <td><img src="../src/sprites/Magikarp.png" width={50} alt="cha" /></td>
                        <td><img src="../src/sprites/Vulpix.png" width={50} alt="cha" /></td>
                        <td><img src="../src/sprites/Oddish.png" width={50} alt="cha" /></td>
                        <td><img src="../src/sprites/Zubat.png" width={50} alt="cha" /></td>
                
                    </tr>

                   

                </table>
           </div>
          </div>
        </body>
      </html>
    );
  }
  
  export default Computer;
