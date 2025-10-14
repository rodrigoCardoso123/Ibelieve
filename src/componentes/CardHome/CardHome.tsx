import estilos from "./CardHome.module.css";

interface CardHomeProps {
  imagem: React.ReactNode; // Pode ser <img />, <Icon />, etc.
  titulo: string;
  descricao: string;
}

function CardHome({ imagem, titulo, descricao }: CardHomeProps) {
  return (
    <div className={estilos.card}>
      <figure className={estilos.img}>{imagem}</figure>
      <h2 className={estilos.titulo}>{titulo}</h2>
      <p className={estilos.p}>{descricao}</p>
    </div>
  );
}

export default CardHome;
