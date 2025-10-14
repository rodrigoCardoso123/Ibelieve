import { useParams } from 'react-router-dom';
import estilos from './ierbSede.module.css';
import { useState } from 'react';
import IERB_SEDE from "./../../../../public/IERB-SEDE2.jpg"
import { isAdmin } from '../../../isadmin';

type Schedule = {
  [day: string]: string[];
};

const initialSchedule: Schedule = {
  Domingo: ['Escola Bíblica - 08:50',"Culto - 18:30"],
  segunda:["Geração ADORE - 19h (Encontro de Adolecentes)"],
  Terça: ['SARB - 19:00 (Encontro mulheres)'],
  Quarta: ['Varões Peniel 19:00 (Encontro de Homens)',"Jovens de Um Só - 20:00 (Encontro de Jovens)"],
  Quinta: ['Círculo de Oração - 15:00', "Departamento Infantil - 18:30 (Encontro de Crianças)" ],
  Sexta: ['Nenhuma Programação Até o Momento'],
  Sábado: ['Nenhuma Programação Até o Momento'],
};



function PaginaDetalhes() {
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

  const endereco = "R. Guaçu, 18 - Peixinhos, Recife - PE, 52125-100";
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
       <h1 className={estilos.titulo}>Detalhes do Polo/Igreja</h1>

       <div className={estilos.container_informacoes}>
      <img src={IERB_SEDE} alt="Imagem da Igreja" className={estilos.imagem} />

      <div className={estilos.info}>
        <span className={estilos.tag}>SEDE REGIONAL</span>

        <h2 className={estilos.nome_igreja}>Igreja Evangelica Renascer No Brasil</h2>
        <h1 className={estilos.nome_local}>Peixinhos-Recife/PE</h1>

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

export default PaginaDetalhes;