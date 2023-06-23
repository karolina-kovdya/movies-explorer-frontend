import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

function Movies(props) {
  return (
    <div className="movies">
      <SearchForm onSearch={props.onSearchMovies} disabled={props.disabled} isChecked={props.checked} onChangeCheck={props.onCheck}/>
      {props.isLoading && <Preloader />}
      {props.notFound ? (
        <div className="movies__notFound">Ничего не найдено</div>
      ) : (
        <MoviesCardList movies={props.movies} moreMovies={props.moreMovies} onSave={props.onSave} onDelete={props.onDelete} savedMovie={props.savedMovie} disabled={props.disabled}/>
      )}
      {props.serverError && <div className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</div> }
    </div>
  );
}

export default Movies;
