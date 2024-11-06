import { Link } from "react-router-dom";
import './erro.css'

function Erro(){
    return(
        <div className="not-found">
            <h1>Erro... 404</h1>
            <h1>Page not found</h1>
            <Link to="/">Veja todos os nossos filmes</Link>
        </div>
    )
}

export default Erro;