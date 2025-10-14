import estilos from "./CardHome.module.css"

function CardHome({imagem,titulo,descricao}){
    return(
        <>
            <div className={estilos.card}>
                <figure className={estilos.img}>{imagem}</figure>
                <h2 className={estilos.titulo}>{titulo}</h2>
                <p className={estilos.p}>{descricao}</p>
            </div>
        </>
    )
}
export default CardHome;