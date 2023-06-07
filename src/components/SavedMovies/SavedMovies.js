import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies({movies, onSearchSavedMovies}) {
  return (
    <div className="savedMovies">
      <SearchForm onSearch={onSearchSavedMovies}/>
      <section className="savedMovies__cards">
        <ul className="savedMovies__list">
          {movies.map((movie) => {
            return (
              <MoviesCard
                key={movie._id}
                url={movie.image}
                nameRu={movie.nameRU}
                duration={movie.duration}
                component="savedMovies"
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default SavedMovies;
