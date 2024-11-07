import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from '../../services/api';
import './search.css'
import { Link } from 'react-router-dom';

const Search = () => {
  const searchURL = "https://api.themoviedb.org/3/search/movie";
  const api_key = "Digite sua chave aqui";
  const [searchParams, setSearchParams] = useSearchParams();

  const [filmes, setFilmes] = useState([]);
  const query = searchParams.get("q") || "";

  const getSearchedMovies = async (query) => {
    try {
      const response = await api.get(searchURL, {
        params: {
          api_key,
          query,
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  useEffect(() => {
    if (query) {
      getSearchedMovies(query);
    }
  }, [query]);

  const handleSearchChange = (e) => {
    setSearchParams({ q: e.target.value });
  };

  return (
    <div className="result-search">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>


      <div className="movies-list">
        {filmes.length > 0 ? (
          filmes.map((filme) => (
            <div key={filme.id} className="movie-card">
              <img 
                src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`} 
                alt={filme.title} 
              />
              <h2>{filme.title}</h2>
              <p>Nota: {filme.vote_average}</p>
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </div>
          ))
        ) : (
          <p>Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
