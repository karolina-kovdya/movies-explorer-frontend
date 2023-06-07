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
        <MoviesCardList movies={props.movies} moreMovies={props.moreMovies} onSave={props.onSave}/>
      )}
    </div>
  );
}

export default Movies;
