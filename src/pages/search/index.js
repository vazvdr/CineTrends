import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from '../../services/api';
const Search = () => {

    const searchURL = "https://api.themoviedb.org/3/search/movie";
    const api_key = "28fc232cc001c31e8a031f419d0a14ca"
    const [searchParams] = useSearchParams();

  const [filmes, setFilmes] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setFilmes(data.results);
  };

  useEffect(() => {
    async function loadFilmes(){
        const response = await api.get(
      'https://api.themoviedb.org/3/search/movie?&api_key=28fc232cc001c31e8a031f419d0a14ca', {
          params:{
           api_key: "28fc232cc001c31e8a031f419d0a14ca",
           language: "pt-BR",
           page: 1,
          }
        })
  
        setFilmes(response.data.results);
        
    }});


    
    

  return (
    <div className="result-search">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movie-card">
      <img src={filmes.poster_path} alt={filmes.title} />
      <h2>{filmes.title}</h2>
      <p>
        {filmes.vote_average}
      </p>
    </div>

    </div>
  )
}

export default Search;