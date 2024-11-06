import { useEffect, useState } from "react";
import { useParams, useNavigate, replace } from "react-router-dom";
import api from "../../services/api";
import './filme.css';
import { toast } from "react-toastify";

function Filme(){

  const { id } = useParams();
  const navigation = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR" 
        }
      })
      .then((response)=>{
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("FILME NÃO ENCONTRADO!")
        navigation('/', {replace: true});
        return;
      })
    }

    loadFilme();

    return ()=>{
      console.log("COMPONENTE FOI DESMONTADO")

    }
  }, [navigation, id]);

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    const filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilmes = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id);

    if(hasFilmes){
      toast.warn("Esse filme já está na sua lista");
    } else {

            filmesSalvos.push(filme);
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
            toast.success("Filme salvo com sucesso");
          }
  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando os detalhes...</h1>
      </div>
    )
  }

  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
        </button>

      </div>      
    </div>
  )
}

export default Filme;