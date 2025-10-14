import estilos from './caedsPolos.module.css';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface CardProps {
  image: string;
  local: string;
  title: string;
  text: string;
  buttonText: string;
  rota?: string;
  editable?: boolean;
  onEdit?: (novosDados: { title: string; text: string }) => void;
}

function Cards({
  image,
  local,
  title,
  text,
  buttonText, 
  rota,
  editable = false,
  onEdit,
}: CardProps) {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(title);
  const [novoTexto, setNovoTexto] = useState(text);

  const salvarEdicao = () => {
    if (onEdit) {
      onEdit({ title: novoTitulo, text: novoTexto });
    }
    setEditando(false);
  };
  const irParaDetalhes = () => {
    if (rota) navigate(rota);
  }
  return (
    <div className={estilos.card}>
      <img src={image} alt={local} className={estilos.img} />

      {editable && editando ? (
        <div className={estilos.edicao}>
          <input
            type="text"
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
            className={estilos.input}
          />
          <textarea
            value={novoTexto}
            onChange={(e) => setNovoTexto(e.target.value)}
            className={estilos.textarea}
          />
          <button onClick={salvarEdicao} className={estilos.botaoSalvar}>
            Salvar
          </button>
        </div>
      ) : (
        <div className={estilos.conteudo}>
          <p className={estilos.card_local} >{local}</p>
          <h2 className={estilos.card_title}>{title}</h2>
          <p className={estilos.card_text}>{text}</p>
        </div>
      )}

      <button className={estilos.card_button} onClick={irParaDetalhes}>{buttonText}</button>

      {editable && !editando && (
        <button
          onClick={() => setEditando(true)}
          className={estilos.botaoEditar}
        >
          Editar
        </button>
      )}
    </div>
  );
}

export default Cards;
