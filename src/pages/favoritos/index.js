import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista)?.reverse() || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((filme) => filme.id !== id);
    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    toast.success("Filme removido com sucesso");
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-gray-800">
      {/* Título */}
      <h1 className="w-full text-center py-5 bg-black bg-opacity-85 text-orange-900 text-3xl">
        MEUS FILMES
      </h1>

      {/* Mensagem caso não tenha filmes */}
      {filmes.length === 0 && <span className="text-lg text-gray-600">Você não tem nenhum filme salvo!</span>}

      {/* Lista de filmes */}
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-5 py-10 max-w-6xl w-full">
        {filmes.map((filme) => {
          return (
            <li key={filme.id} className="flex flex-col items-center bg-transparent border border-purple-900 text-white rounded-xl p-4 shadow-lg backdrop-blur-md transition-transform transform hover:translate-y-[-10px]">
              <span className="text-xl font-bold mb-3">{filme.title}</span>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
                className="w-full max-h-44 object-cover rounded-md mb-3"
              />
              <div className="flex flex-col items-center gap-2">
                <Link to={`/filme/${filme.id}`} className="text-white font-bold">
                  Ver detalhes
                </Link>
                <button
                  onClick={() => excluirFilme(filme.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
