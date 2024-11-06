import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista)?.reverse() || []);
    }, []);

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((filme) => {
            return (filme.id !== id);
        });
        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso");
    }

    return (
        <div className='meus-filmes'>
            <h1>MEUS FILMES</h1>
            {filmes.length === 0 && <span>Você não tem nenhum filme salvo! </span>}
            <ul>
                {filmes.map((filme) => {
                    return (
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}></img>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                            </div> 
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;
