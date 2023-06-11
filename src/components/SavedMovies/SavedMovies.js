import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {

  return (
    <div className="savedMovies">
      <SearchForm onSearch={props.onSearchMovies} disabled={props.disabled} isChecked={props.checked} onChangeCheck={props.onCheck}/>
      {props.isLoading && <Preloader />}
      {props.notFound ? (
        <div className="movies__notFound">Ничего не найдено</div>
      ) : (
        <MoviesCardList movies={props.movies} onDelete={props.onDelete} disabled={props.disabled}/>
      )}
    </div>
  );
}

export default SavedMovies;
