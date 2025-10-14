import estilos from "./login.module.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Tentando login com:", username, password);
      const res = await axios.post('https://ibelieve-back-and.onrender.com/api/login', {
        username,
        password
      });
      console.log("Resposta do backend:", res.data);

      const token = res.data.token;
      if (!token) {
        alert("Não veio token no retorno");
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Payload do token:", payload);

      localStorage.setItem('token', token);
      localStorage.setItem('role', payload.role);

      if (payload.role === 'admin') {
        navigate('/relatorios');
      } else {
        navigate('/');  // talvez queira uma rota de usuário específica
      }
    } catch (err: any) {
      console.error("Erro no login:", err.response?.data ?? err.message);
      alert('Login falhou: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <main className={estilos.main_container}>
      <h2 className={estilos.titulo_main}>Área do Administrador</h2>
    <div className={estilos.container_form}>
        <div className={estilos.container_login}>
          <div className={estilos.texto_login}>
            <label className={estilos.label}>Login</label>
            <input type="email" placeholder="E-mail" className={estilos.input_login} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Senha" className={estilos.input_login} onChange={e => setPassword(e.target.value)}  />
            <Link to="/" className={estilos.link_login}>Esqueceu a senha?</Link>
          </div>
            <button type="submit" className={estilos.butao_login} onClick={handleLogin}>Entrar</button>
        </div>
    </div>
    </main>
  );
}

export default Login;