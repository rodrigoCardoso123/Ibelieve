import estilos from "./AdminPage.module.css"
import { BsArrowUpCircleFill,BsArrowDownCircleFill } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { useState } from "react";

interface Lancamento {
  data: string;
  tipo: "Entrada" | "Saída";
  valor: number;
  descricao: string;
}


function AdminPage(){
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([
    { id: 1, data: "01/10/2025", tipo: "Entrada", valor: 2000, descricao: "Dízimos e ofertas" },
    { id: 2, data: "03/10/2025", tipo: "Saída", valor: 2400, descricao: "Compra de materiais para o culto" },
    { id: 3, data: "05/10/2025", tipo: "Entrada", valor: 120, descricao: "Ministério" },
    { id: 4, data: "07/10/2025", tipo: "Saída", valor: 1500, descricao: "Doação" },
    { id: 5, data: "09/10/2025", tipo: "Entrada", valor: 340, descricao: "Manutenção de som" },
    { id: 6, data: "10/10/2025", tipo: "Saída", valor: 800, descricao: "Pagamento de contas" },
    { id: 7, data: "17/10/2025", tipo: "Entrada", valor: 1500, descricao: "Arrecadação" },
  ]);

  const [form, setForm] = useState<Omit<Lancamento, 'id'>>({
    data: "",
    tipo: "Entrada",
    valor: 0,
    descricao: "",
  });

  const formatarData = (data: string) => {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "valor" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const dataFormatada = formatarData(form.data);

  if (editandoId !== null) {
    setLancamentos(prev =>
      prev.map(l => (l.id === editandoId ? { ...l, ...form, data: dataFormatada } : l))
    );
    setEditandoId(null);
  } else {
    const novo: Lancamento = {
      id: Date.now(),
      ...form,
      data: dataFormatada
    };
    setLancamentos(prev => [...prev, novo]);
  }

  setForm({ data: "", tipo: "Entrada", valor: 0, descricao: "" });
};

  const handleEditar = (lanc: Lancamento) => {
    setForm({
      data: lanc.data,
      tipo: lanc.tipo,
      valor: lanc.valor,
      descricao: lanc.descricao,
    });
    setEditandoId(lanc.id);
  };


  const handleExcluir = (id: number) => {
    setLancamentos(prev => prev.filter(l => l.id !== id));
  };

  const totalEntradas = lancamentos
    .filter(l => l.tipo === "Entrada")
    .reduce((acc, l) => acc + l.valor, 0);

  const totalSaidas = lancamentos
    .filter(l => l.tipo === "Saída")
    .reduce((acc, l) => acc + l.valor, 0);

  const saldo = totalEntradas - totalSaidas;

  return(
    <>
      <main className={estilos.container_principal}> 
          <h1 className={estilos.h1}>Relatório Financeiro</h1>
        <section className={estilos.container_card}>
          <div className={estilos.informarcao_card} >
            <p className={estilos.titulo_card}>Resumo Geral</p>
            <div className={estilos.container_ess}>
                <div className={estilos.ess_container}>
                  <div className={estilos.contaier_ess_colum}>
                    <BsArrowUpCircleFill size={40} color="#e8b537" />
                    <p className={estilos.p_ess}>Total De Entradas</p>
                  </div>
                  <strong className={estilos.dinheiro}> R$ {totalEntradas.toFixed(2)}</strong>
                </div>
                
                <div className={estilos.ess_container}>
                  <div className={estilos.contaier_ess_colum}>
                    <BsArrowDownCircleFill size={40} color="#e8b537"  />
                    <p className={estilos.p_ess}>Total de Saídas</p>
                  </div>
                  <strong className={estilos.dinheiro}> R$ {totalSaidas.toFixed(2)}</strong>
                </div>

                <div className={estilos.ess_container}>
                  <div className={estilos.contaier_ess_colum}>
                    <BsCoin size={40} color="#e8b537" />
                    <p className={estilos.p_ess}>Saldo Do Mês</p>
                  </div>
                  <strong className={estilos.dinheiro}> R$ {saldo.toFixed(2)}</strong>
                </div>
              </div>
          </div>
        </section>

    <div className={estilos.relatorios}>

        <section className={estilos.container_card}>
        <h2 className={estilos.titulo_card}>{editandoId ? "Editar Lançamento" : "Novo Lançamento"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleInputChange}
            required
          />
          <select name="tipo" value={form.tipo} onChange={handleInputChange}>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
          <input
            type="number"
            name="valor"
            value={form.valor}
            onChange={handleInputChange}
            placeholder="Valor"
            required
          />
          <input
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleInputChange}
            placeholder="Descrição"
            required
          />
          <button type="submit">{editandoId ? "Salvar Alterações" : "Adicionar"}</button>
        </form>
      </section>

        <section className={estilos.container_lista}>
        <h2 className={estilos.titulo_lista}>Lançamentos do Mês</h2>
        <table className={estilos.tabela}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Valor (R$)</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {lancamentos.map((lanc, index) => (
              <tr key={index}>
                <td>{lanc.data}</td>
                <td>{lanc.tipo}</td>
                <td>{lanc.valor.toFixed(2)}</td>
                <td>{lanc.descricao}</td>
                <td><button onClick={() => handleEditar(lanc)}>Editar</button> <button onClick={() => handleExcluir(lanc.id)}>Excluir</button> </td>
              </tr>
            ))}
          </tbody>
        </table>
     </section>

    </div>        
      </main>
    </>
  )
}
export default AdminPage;