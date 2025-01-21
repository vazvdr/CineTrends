import { BsSearch } from 'react-icons/bs';
import { TfiVideoCamera } from "react-icons/tfi";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Estado para controle da visibilidade do botão
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`, { replace: true });
    setSearch("");
  };

  // Função para verificar a posição de rolagem e exibir o botão
  const checkScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hook para adicionar o listener de rolagem
  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  // Função para voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed to top z-10 flex items-center justify-between h-16 px-4 bg-black text-white w-screen">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black via-blue-500 to-purple-900"></div>

      <Link
        className="text-xl font-bold flex items-center gap-1 md:text-2xl hover:text-purple-800"
        to="/"
      >
        CineTrends <TfiVideoCamera />
      </Link>

      <form
        className="flex items-center mx-4 flex-grow justify-center md:flex-grow-0"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Digite o nome de um filme"
          className="w-full sm:w-3/5 h-8 px-2 rounded-md border bg-transparent text-white placeholder-white border-purple-800 md:w-40 lg:w-72"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          type="submit"
          className="h-8 w-8 flex items-center justify-center rounded-md ml-[3px] border bg-transparent hover:bg-purple-800 text-white border-purple-800"
        >
          <BsSearch />
        </button>
      </form>

      <div className="flex items-center gap-3">
        <Link
          className="px-1 py-2 mr-2 rounded-md font-bold transition bg-transparent text-white hover:bg-purple-800 border border-purple-800 whitespace-nowrap"
          to="/favoritos"
        >
          Meus filmes
        </Link>
      </div>

      {/* Botão de Voltar ao Topo */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-4 bg-purple-900 text-white p-3 rounded-full shadow-lg transition-all hover:bg-purple-800"
        >
          ↑
        </button>
      )}
    </header>
  );
};

export default Header;
