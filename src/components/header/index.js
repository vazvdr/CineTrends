import { BsSearch } from 'react-icons/bs';
import './header.css';
import { Link, useNavigate } from 'react-router-dom'
import { TfiVideoCamera } from "react-icons/tfi";
import { useState } from 'react';

const Header = () => {

  const[search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!search) return;

    navigate(`/search?q=${search}`, { replace: true });    
    setSearch("");
  };

  

  return(
    <header>
      <Link className="logo" to="/" >CineTrends <TfiVideoCamera/></Link>
      <form className='pesquisar' onSubmit={handleSubmit}>
            <input type="text" placeholder='Digite o nome de um filme'
            onChange={e => setSearch(e.target.value)}
            value={search}
           />
            <button type='submit'><BsSearch/></button>
      </form>
      <Link className="favoritos" to="/favoritos">Meus filmes</Link>
    </header>
  )
}

export default Header;