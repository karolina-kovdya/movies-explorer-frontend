import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { movies } from "../../utils/contants";

function MoviesCardList() {
  return (
    <section className="moviesCards">
      <ul className="moviesCards__list">
        {movies.map((movie) => {
          return (
            <MoviesCard
              key={movie._id}
              url={movie.url}
              nameRu={movie.nameRu}
              duration={movie.duration}
              component="movies"
            />
          );
        })}
      </ul>
      <button type="button" className="moviesCards__button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
