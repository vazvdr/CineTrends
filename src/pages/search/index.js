import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from '../../services/api';
import { Link } from 'react-router-dom';

const Search = () => {
  const searchURL = "https://api.themoviedb.org/3/search/movie";
  const api_key = "28fc232cc001c31e8a031f419d0a14ca";
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


  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen py-5 px-4">
      <h2 className="text-2xl text-center text-white mb-8">
      <div className="text-white mt-14">  Resultados para: </div><span className="text-white">{query}</span>
      </h2>
      <div className="flex flex-wrap gap-6 justify-center max-w-6xl mx-auto py-1">
        {filmes.length > 0 ? (
          filmes.map((filme) => (
            <article
              key={filme.id}
              className="bg-black bg-opacity-80 mt-10 p-5 rounded-xl shadow-lg backdrop-blur-md transform transition-transform hover:-translate-y-3 hover:shadow-2xl w-11/12 sm:w-[calc(50%-24px)] md:w-[calc(33.333%-24px)] border-2 border-purple-900"
            >
              <strong className="block text-center text-white text-xl mb-4 font-semibold tracking-wide">
                {filme.title}
              </strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
                className="w-full h-72 object-cover rounded-lg border-2 border-gray-700 shadow-md"
              />
              <p className="text-lg text-gray-300 mb-4">Nota: {filme.vote_average}</p>
              <Link
                to={`/filme/${filme.id}`}
                className="block text-center mt-4 py-2 text-lg font-semibold bg-gradient-to-r from-black via-purple-900 to-black text-white rounded-lg shadow-md transition-all hover:from-purple-500 hover:to-blue-500 hover:shadow-lg"
              >
                Acessar
              </Link>
            </article>
          ))
        ) : (
          <p className="text-center text-white">Nenhum filme encontrado.</p>
        )}
      </div>
    </div>

  );
};

export default Search;
