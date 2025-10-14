import estilos from "./horario.module.css"
import { useEffect, useState } from 'react';
import Cards from "../../componentes/CardPolos/cardsPolos";
import axios from 'axios';
import logo from "./../../../public/logo2.png"
import IERB_SEDE from "./../../../public/IERB-SEDE2.jpg"
import IERB_DOIS_UNIDOS from "./../../../public/IERB-DOIS-UNIDOS.jpg"
import IERB_JATOBA from "./../../../public/IERB-JATOBA.jpeg"
import IERB_PASSARINHO from "./../../../public/IERB-PASSARINHO.jpeg"
import IERB_SITIO from "./../../../public/IERB-SITIO-FRAGOSO.jpg"
function Horario(){
  const [role, setRole] = useState(null);
  const [data, setData] = useState('');

  const [cards, setCards] = useState([
    { id: 1, image: IERB_SEDE, local: "Recife/PE", title: "IERB SEDE", text: "Rua Guaçu, 18-Chão de Estrela", rota:"/IERB SEDE/ierbSede.tsx" },
    { id: 2, image: IERB_DOIS_UNIDOS, local: "Recife/PE", title: "IERB DOIS UNIDOS", text: "Av.Hildebrando de vasconcelos, 739", rota:"/IERB DOIS UNIDOS/ierbDoisUnidps.tsx" },
    { id: 3, image: IERB_PASSARINHO, local: "Recife/PE", title: "IERB PASSARINHO", text: "Estrada do Passarinho, 3300", rota:"/IERB PASSARINHO/ierbPassarinho.tsx" },
    { id: 4, image: IERB_SITIO, local: "Paulista/PE", title: "IERB SITÍO FRAGOSO", text: "Rua São Pedro Paulista, 98", rota:"/IERB SITIO FRAGOSO/ierbSitioFragoso.tsx" },
    { id: 5, image: IERB_JATOBA, local: "Olinda/PE", title: "IERB JATOBÁ", text: "Rua Algodoeiro, 65", rota:"/IERB JATOBÁ/ierbJatobá.tsx" },
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    // Decodifica o payload do token (base64)
    const payload = JSON.parse(atob(token.split('.')[1]));
    setRole(payload.role);

    // Requisição baseada no papel
    const endpoint = payload.role === 'admin' ? '/api/admin' : '/api/user';

    axios.get(`http://localhost:5000${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setData(res.data))
    .catch(() => setData('Acesso negado'));
  }, []);

  const editarCard = (id: number, novosDados: Partial<typeof cards[0]>) => {
    const novosCards = cards.map(card => 
      card.id === id ? { ...card, ...novosDados } : card
    );
    setCards(novosCards);
  };

    return(
        <>
      <main className={estilos.main}>
        <div className={estilos.container_card}>
        {cards.map(card => (
        <Cards 
          key={card.id}
          image={card.image}
          local={card.local}
          title={card.title}
          text={card.text}
          buttonText={"Informações"}
          editable={role === 'admin'}
          rota={card.rota}
          onEdit={(novosDados) => editarCard(card.id, novosDados)}
        />
      ))}
        </div>
    </main>
        </>
    )
}
export default Horario;