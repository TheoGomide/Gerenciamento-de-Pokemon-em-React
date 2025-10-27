import { useNavigate } from 'react-router-dom';
import '../../shared/styles/Profile.css'; 

const Profile = () => {
    // simulação de dados do usuário
    const userData = {
      name: 'Nome do Usuário',
      email: 'usuario@example.com',
      password: '*********',
    };
  
    return (
      <div className="main-div">
        <div className="left-div">
          <div className="profile-info">
            <img src="caminho_para_a_imagem_do_usuario.jpg" alt="Foto de Perfil" width="200" />
            <h2>{userData.name}</h2>
            <p>Email: {userData.email}</p>
            <p>Senha: {userData.password}</p>
            {/* add */}
          </div>
        </div>
        <div className="right-div">
          {/* add */}
        </div>
      </div>
    );
  };
  
  export default Profile;
