import {BrowserRouter,  Route,Routes} from "react-router-dom"
import './App.css'
import Topo from "./componentes/Topo/Topo"
import Home from "./pages/home/home.tsx"
import Login from "./pages/login/login"
import Horario from "./pages/horarios/horario"
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute.tsx"
import PaginaDetalhes from "./pages/detalhesPolos/IERB SEDE/ierbSede.tsx"
import AdminPage from "./pages/AreaAdmin/AdminPage.tsx"
import PedidosOração from "./pages/PedidosDeOração/PedidosOração.tsx"
import AdminPedidos from "./pages/Pedidos-de-Oração-Admin/AdminPedidos.tsx"
import { PedidosProvider } from "./componentes/contextoPedidos/contextoPedidos.tsx"
import PaginaDetalhesDoisUnidos from "./pages/detalhesPolos/IERB DOIS UNIDOS/ierbDoisUnidps.tsx"
import PaginaDetalhesPassarinho from "./pages/detalhesPolos/IERB PASSARINHO/ierbPassarinho.tsx"
import PaginaDetalhesSitio from "./pages/detalhesPolos/IERB SITIO FRAGOSO/ierbSitioFragoso.tsx"
import PaginaDetalhesJatoba from "./pages/detalhesPolos/IERB JATOBÁ/ierbJatobá.tsx"

function App() {
  return (
    <>
    <PedidosProvider>
          <BrowserRouter basename="/Ibelieve">
           <Topo/>
            <Routes>
              <Route path="/IERB JATOBÁ/:id" element={<PaginaDetalhesJatoba/>} />
              <Route path="/IERB SITIO FRAGOSO/:id" element={<PaginaDetalhesSitio/>} />
              <Route path="/IERB PASSARINHO/:id" element={<PaginaDetalhesPassarinho/>} />
              <Route path="/IERB DOIS UNIDOS/:id" element={<PaginaDetalhesDoisUnidos/>} />
              <Route path="/IERB SEDE/:id" element={<PaginaDetalhes />} />
              <Route path="/pedidosOração" element={<PedidosOração/>}></Route>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/horario" element={<Horario/>}></Route>

              <Route path="/relatorios" element={
                <ProtectedRoute role="admin">
                  <AdminPage/>
                </ProtectedRoute>
                }></Route>

                <Route path="admin/pedidos" element={
                <ProtectedRoute role="admin">
                  <AdminPedidos/>
                </ProtectedRoute>
                }></Route>

            </Routes>
          </BrowserRouter>
      </PedidosProvider>
    </>
  )
}

export default App
