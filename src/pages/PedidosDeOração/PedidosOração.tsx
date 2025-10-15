import { useState } from "react";
import estilos from "./PedidosOração.module.css";
import { usePedidos } from "../../componentes/contextoPedidos/contextoPedidos"; 

function PedidosOração() {
  const { adicionarPedido } = usePedidos(); 

  const [formData, setFormData] = useState({
    nome: "",
    assunto: "Agradecimento",
    mensagem: "",
    anonimo: false,
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    adicionarPedido(formData); 
    
    setEnviado(true);
    setFormData({
      nome: "",
      assunto: "Agradecimento",
      mensagem: "",
      anonimo: false,
    });

    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <main className={estilos.main}>
      <h1 className={estilos.titulo}>Envie seu Pedido de Oração</h1>
      <p className={estilos.subtitulo}>
        Pois onde dois ou três se reúnem em meu nome, ali Eu estou no meio
        deles. <strong>Mateus 18:20</strong>
      </p>

      <section className={estilos.container_form}>
        <form className={estilos.card} onSubmit={handleSubmit}>
          {!formData.anonimo && (
            <div className={estilos.container_input}>
              <label className={estilos.label} htmlFor="nome">
                Nome completo
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className={estilos.container_input}>
            <label className={estilos.label} htmlFor="assunto">
              Assunto do Pedido
            </label>
            <select
              id="assunto"
              name="assunto"
              value={formData.assunto}
              onChange={handleChange}
            >
              <option value="Agradecimento">Agradecimento</option>
              <option value="Cura">Cura</option>
              <option value="Família">Família</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className={estilos.container_input}>
            <label className={estilos.label} htmlFor="mensagem">
              Sua mensagem / Pedido de Oração
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              placeholder="Escreva aqui seu Pedido ou motivo de Oração"
              className={estilos.input_Oração}
              value={formData.mensagem}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className={estilos.container_box}>
            <input
              type="checkbox"
              name="anonimo"
              id="anonimo"
              checked={formData.anonimo}
              onChange={handleChange}
              size={45}
              className={estilos.box}
            />
            <label htmlFor="anonimo" className={estilos.label_box}>
              Enviar anonimamente
            </label>
          </div>

          <button type="submit" className={estilos.button_form}>
            Enviar Pedido
          </button>

          {enviado && (
            <p className={estilos.success}>
              ✅ Seu pedido foi enviado com sucesso!
               <p className={estilos.success}>Nosa equipe de intercessores estará orando por você.</p>
            </p>
          )}
        </form>

        <p className={estilos.texto_fundo}>Todos os pedidos são confidenciais e tratados com amor</p>

      </section>
    </main>
  );
}

export default PedidosOração;
