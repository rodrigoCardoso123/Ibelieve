import { Link,useNavigate } from "react-router-dom";
import estilos from "./Topo.module.css";
import logo from "../../../public/logo2.png"

function Topo(){
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

    const logout = () => {
    localStorage.clear();
    navigate('/login');

  };
    return(
        <>
        <nav className={estilos.container_top}>
            <div>
                <img src={logo} className={estilos.img}></img>
            </div>
            <div>
                {role !== 'admin' && <Link to="/" className={estilos.link}>Inicio</Link>}
                <Link to="/horario" className={estilos.link}>Polos</Link>
                {role === 'admin' && <Link to="admin/pedidos" className={estilos.link}>Pedidos de Oração</Link>}
                {role !== 'admin' && <Link to="/pedidosOração" className={estilos.link}>Pedidos de Oração</Link>}
                {role === 'admin' && <Link to="/relatorios" className={estilos.link}>Relatorios</Link>}
                {role !== 'admin' && <Link to="/login" className={estilos.links_lc}>Login</Link>}
                {role === 'admin' && <button onClick={logout} className={estilos.links_lc}>Sair</button>}
            </div>
        </nav>
        </>
    )
}
export default Topo;