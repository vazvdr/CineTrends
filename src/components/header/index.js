import { BsSearch } from 'react-icons/bs';
import { TfiVideoCamera } from "react-icons/tfi";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './header.css';

const Header = () => {
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`, { replace: true });
    setSearch("");
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className={isDarkMode ? 'dark' : 'light'}>
      <Link className="logo" to="/">CineTrends <TfiVideoCamera /></Link>
      <form className="pesquisar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome de um filme"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit"><BsSearch /></button>
      </form>
      <Link className="favoritos" to="/favoritos">Meus filmes</Link>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀' : '☾'}
      </button>
    </header>
  );
}

export default Header;
