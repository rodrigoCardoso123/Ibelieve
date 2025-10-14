import { usePedidos } from "../../componentes/contextoPedidos/contextoPedidos";
import estilos from "./AdminPedidos.module.css";

function AdminPedidos() {
  const { pedidos } = usePedidos();

  return (
    <div className={estilos.adminContainer}>
      <h1>📋 Pedidos Recebidos</h1>
      {pedidos.length === 0 ? (
        <p>Nenhum pedido recebido ainda.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className={estilos.card}>
            {!pedido.anonimo && <h3>🙍 {pedido.nome}</h3>}
            {pedido.anonimo && <h3>🙈 Pedido Anônimo</h3>}
            <p><strong>Assunto:</strong> {pedido.assunto}</p>
            <p><strong>Mensagem:</strong> {pedido.mensagem}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPedidos;
