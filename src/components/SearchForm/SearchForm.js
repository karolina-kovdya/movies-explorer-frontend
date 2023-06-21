import "./SearchForm.css";
import CheckboxButton from "../CheckboxButton/CheckboxButton";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ onSearch, disabled, isChecked, onChangeCheck}) {
  const localParam = localStorage.getItem('movieParam');
  const query = localParam ? localParam : ''
  const [movieSearch, setMovieSearch] = useState(query || '') 
  const [isNull, setIsNull] = useState(false);

  const path = useLocation().pathname

  function search(e) {
    e.preventDefault();
    if(movieSearch === '') {
      setIsNull(true)
    } else {
      setIsNull(false)
      onSearch(movieSearch)
    }
  }
  
  return (
    <section className="searchForm">
      <form className="searchForm__container" onSubmit={search}>
        <input 
          name="movie"
          type="text"
          placeholder={isNull ? "Нужно ввести ключевое слово" : "Фильм"} 
          className="searchForm__input" 
          defaultValue={path === '/movies' ? movieSearch : ''}
          onChange={e => setMovieSearch(e.target.value)}
        />
        <button type="submit" className="searchForm__button" disabled={disabled}>
          Поиск
        </button>
      </form>
      <CheckboxButton isChecked={isChecked} onChangeCheck={onChangeCheck}/>
    </section>
  );
}

export default SearchForm;
