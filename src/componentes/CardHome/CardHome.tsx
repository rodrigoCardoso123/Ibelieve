import estilos from "./CardHome.module.css";
import { Link } from "react-router-dom";

interface CardHomeProps {
  imagem: React.ReactNode; // Pode ser <img />, <Icon />, etc.
  titulo: string;
  descricao: string;
  link: string;
}

function CardHome({ imagem, titulo, descricao, link }: CardHomeProps) {
  return (
    <div className={estilos.card}>
      <figure className={estilos.img}> 
        <Link to={link}>{imagem}</Link>
      </figure>
      <h2 className={estilos.titulo}>{titulo}</h2>
      <p className={estilos.p}>{descricao}</p>
    </div>
  );
}

export default CardHome;
