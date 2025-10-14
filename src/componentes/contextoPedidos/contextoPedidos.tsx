import { createContext, useContext, useState} from "react";
import type { ReactNode } from 'react';

export type Pedido = {
  nome: string;
  assunto: string;
  mensagem: string;
  anonimo: boolean;
  id: number;
};

type PedidosContextType = {
  pedidos: Pedido[];
  adicionarPedido: (pedido: Omit<Pedido, "id">) => void;
};

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const adicionarPedido = (pedido: Omit<Pedido, "id">) => {
    const novoPedido = { ...pedido, id: Date.now() };
    setPedidos((prev) => [novoPedido, ...prev]);
  };

  return (
    <PedidosContext.Provider value={{ pedidos, adicionarPedido }}>
      {children}
    </PedidosContext.Provider>
  );
};

export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error("usePedidos deve ser usado dentro de PedidosProvider");
  }
  return context;
};