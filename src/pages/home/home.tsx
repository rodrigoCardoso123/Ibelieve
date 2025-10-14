import estilos from "./home.module.css"
import CardHome from "../../componentes/CardHome/CardHome";
import { FaCalendarAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaChurch } from 'react-icons/fa';

function Home(){
    return(
        <>
    <div className={estilos.container_principal}>
        <main className={estilos.main_container}>
            <h1 className={estilos.titulo}>Bem-vindo à IBelieve</h1>
            <p className={estilos.p}>Um lugar de fé,amor e esperança</p>
        </main>
        <section className={estilos.container_card}>
     <CardHome
            imagem={<FaCalendarAlt size={60} color="#D2691E"/>}
            titulo="Programações"
            descricao="Veja nossa agenda de eventos"
        />
        <CardHome
            imagem={<FaClock size={60} color="#D2691E"/>}
            titulo="Horário dos Cultos"
            descricao="Confira horários dos cultos"
        />
        <CardHome
            imagem={<FaMapMarkerAlt size={60} color="#D2691E"/>}
            titulo="Polos da Igreja"
            descricao="Encontre os nossos polos"
        />
        <CardHome
            imagem={<FaChurch size={60} color="#D2691E"/>}
            titulo="Pedido de Oração"
            descricao="Envie seu pedido de oração"
        />
        </section>
    </div>
        </>
    )
}
export default Home;