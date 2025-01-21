import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
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
      <div className="flex flex-col items-left max-w-3xl mx-auto py-6">
        <h1 className="text-2xl text-center text-black">Carregando os detalhes...</h1>
      </div>
    )
  }

  return(
    <div className="flex flex-col items-left max-w-3xl mx-auto py-6 px-4">
      <h1 className="text-3xl text-center text-white mb-4">{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} className="rounded-xl w-full max-w-[800px] max-h-[340px] object-cover mb-4" />
      
      <h3 className="text-2xl text-black mt-6 mb-2">Sinopse</h3>
      <span className="text-lg text-black mb-4">{filme.overview}</span>
      <strong className="text-lg text-black">Avaliação: {filme.vote_average} / 10</strong>

      <div className="flex gap-4 mt-6">
        <button onClick={salvarFilme} className="px-6 py-3 text-xl bg-transparent text-black border border-purple-900 rounded-lg hover:bg-black hover:text-white transition duration-300">Salvar</button>
        <button className="px-6 py-3 text-xl bg-transparent text-black border border-black rounded-lg hover:bg-red-600 transition duration-300">
          <a target="_blank" rel="noopener noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`} className="w-full h-full text-center">Trailer</a>
        </button>
      </div>      
    </div>
  )
}

export default Filme;
