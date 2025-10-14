import { useParams } from 'react-router-dom';
import estilos from './ierbSitioFragoso.module.css';
import { useState } from 'react';
import IERB from "./../../../../public/IERB-SITIO-FRAGOSO.jpg"
import { isAdmin } from '../../../isadmin';

type Schedule = {
  [day: string]: string[];
};

const initialSchedule: Schedule = {
  Domingo: ["Culto - 18:00"],
  segunda:['Departamento Infantil - 19:00 (Econtro Crianças)'],
  Terça: ['Escola bíblica - 19:30'],
  Quarta: ['Culto de Doutrina - 19:30'],
  Quinta: ['Círculo de Oração - 15:00','SARB - 18:00 (Encontro de Mulheres)' ],
  Sexta: ['Nenhuma Programação Até o Momento'],
  Sábado: ['Nenhuma Programação Até o Momento'],
};



function PaginaDetalhesSitio() {
  const { id } = useParams();
  id
  const [schedule, setSchedule] = useState<Schedule>(initialSchedule);

 const admin = isAdmin();

  const handleTimeChange = (day: string, index: number, value: string) => {
    const updated = { ...schedule };
    updated[day][index] = value;
    setSchedule(updated);
  };
  const addEvent = (day: string) => {
    const updated = { ...schedule };
    if (!updated[day]) updated[day] = [];
    updated[day].push(""); // Adiciona campo vazio
    setSchedule(updated);
  };

  const removeEvent = (day: string, index: number) => {
  const updated = { ...schedule };
  updated[day].splice(index, 1);
  setSchedule(updated);
};

  const endereco = "R. São Pedro Paulista, 98-184 - Fragoso, Paulista - PE, 53402-029";

   const copiarEndereco = () => {
    navigator.clipboard.writeText(endereco)
      .then(() => alert("Endereço copiado com sucesso!"))
      .catch(() => alert("Erro ao copiar o endereço."));
  };

  const abrirGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={estilos.main}>
       <h1>Detalhes do Polo/Igreja</h1>

       <div className={estilos.container_informacoes}>
      <img src={IERB} alt="Imagem da Igreja" className={estilos.imagem} />

      <div className={estilos.info}>
        <span className={estilos.tag}>SEDE REGIONAL</span>

        <h2 className={estilos.nome_igreja}>Igreja Evangélica Renascer no Brasil</h2>
        <h1 className={estilos.nome_local}>Fragoso, Paulista</h1>

        <p className={estilos.endereco}>
        {endereco}
        </p>

        <button className={estilos.botaoCopiar} onClick={copiarEndereco}>Copiar endereço da Igreja</button>

        <div className={estilos.acoes}>
          <button className={estilos.botaoAcao} onClick={abrirGoogleMaps}>Traçar rota</button>
          <button className={estilos.botaoAcao}>Ligar</button>
        </div>
      </div>
    </div>

      <h2 className={estilos.h2}>Reunião <strong>Horários</strong></h2>

      <div className={estilos.tabelaContainer}>
        {Object.entries(schedule).map(([day, times]) => (
          <div className={estilos.colunaDia} key={day}>
            <h3>{day}</h3>
            <div className={estilos.underline}></div>
            {times.map((time, idx) => (
  <div key={idx} className={estilos.linhaEvento}>
    <input
      value={time}
      className={estilos.hora}
      onChange={(e) => handleTimeChange(day, idx, e.target.value)}
      disabled={!admin}
    />
    {admin && (
      <button
        className={estilos.botaoRemover}
        onClick={() => removeEvent(day, idx)}
      >
        🗑️
      </button>
    )}
  </div>
))}
                {admin && (
              <button
                className={estilos.botaoAdicionar}
                onClick={() => addEvent(day)}
              >
                + Adicionar evento
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaginaDetalhesSitio;