import { useState } from "react";
import "./MoviesCard.css";

function MoviesCard({ url, nameRu, duration, component, onSave, movie}) {
  const [isSaved, setIsSaved] = useState(false);

  function handleMovieSave() {
    setIsSaved(!isSaved);
    onSave(movie);
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__container">
        <img src={url} alt="Заставка фильма" className="moviesCard__image" />
        <div className="moviesCard__elements">
          <h2 className="moviesCard__title">{nameRu}</h2>
          {component === "movies" ? 
            (<button type="button" onClick={handleMovieSave} className={`moviesCard__save ${isSaved && "moviesCard__save_active"}`}></button>) : 
            (<button type="button" className="moviesCard__delete"></button>)}
        </div>
        <p className="moviesCard__duration">{duration}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
