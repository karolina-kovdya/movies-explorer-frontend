import "./SearchForm.css";
import CheckboxButton from "../CheckboxButton/CheckboxButton";
import { useState } from "react";

function SearchForm({ onSearch, disabled, isChecked, onChangeCheck}) {
  const [movieSearch, setMovieSearch] = useState('') 
  const [isNull, setIsNull] = useState(false)

  function search(e) {
    e.preventDefault();
    if(movieSearch === '') {
      setIsNull(true)
    } else {
      setIsNull(false)
      onSearch(movieSearch)

      setMovieSearch('')
    }
  }
  
  return (
    <section className="searchForm">
      <form className="searchForm__container" onSubmit={search}>
        <input 
          name="movie"
          placeholder={isNull ? "Нужно ввести ключевое слово" : "Фильм"} 
          className="searchForm__input" 
          value={movieSearch || ''}
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
