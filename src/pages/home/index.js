import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 18));
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-4 w-full">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="flex flex-wrap gap-6 justify-center max-w-6xl mx-auto py-12">
        {filmes.map((filme) => (
          <article
            key={filme.id}
            className="bg-black bg-opacity-80 mt-8 p-5 rounded-xl shadow-lg backdrop-blur-md transform transition-transform hover:-translate-y-3 hover:shadow-2xl w-11/12 sm:w-[calc(50%-24px)] md:w-[calc(33.333%-24px)] border-2 border-purple-900"
          >
            <strong className="block text-center text-white text-xl mb-4 font-semibold tracking-wide">
              {filme.title}
            </strong>
            <img
              src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
              alt={filme.title}
              className="w-full h-72 object-cover rounded-lg border-2 border-gray-700 shadow-md"
            />
            <Link
              to={`/filme/${filme.id}`}
              className="block text-center mt-4 py-2 text-lg font-semibold bg-gradient-to-r from-black via-purple-900 to-black text-white rounded-lg shadow-md transition-all hover:from-purple-500 hover:to-blue-500 hover:shadow-lg"
            >
              Acessar
            </Link>
          </article>

        ))}
      </div>
    </div>
  );
}

export default Home;
