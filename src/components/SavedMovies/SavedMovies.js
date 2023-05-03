import "./SavedMovies.css";
import { savedMovies } from "../../utils/contants";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies() {
  return (
    <div className="savedMovies">
      <SearchForm />
      <section className="savedMovies__cards">
        <ul className="savedMovies__list">
          {savedMovies.map((movie) => {
            return (
              <MoviesCard
                key={movie._id}
                url={movie.url}
                nameRu={movie.nameRu}
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
