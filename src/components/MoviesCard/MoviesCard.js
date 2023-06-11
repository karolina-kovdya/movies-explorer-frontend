import "./MoviesCard.css";
import { useContext } from "react";
import { currentUserContext } from "../../context/CurrentUserContext";

function MoviesCard(props) {
  const currentUser = useContext(currentUserContext)

  function handleSave() {
    props.onSave(props.movie, currentUser)
  }

  function handleDelete() {
    props.onDelete(props.movie)
  }

  function handleClick () {
     if(!props.isSaved) {
        handleSave()
     } else {
      handleDelete()
     }
  }

  function convertDuration (duration) {
    if (duration > 60) {
      let hours, minutes;
      hours = Math.floor(duration / 60);
      minutes = duration - hours * 60;
      return `${hours}ч ${minutes}м`;
    }
    return `${duration}м`;
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__container">
        <img src={props.url} alt="Заставка фильма" className="moviesCard__image" />
        <div className="moviesCard__elements">
          <h2 className="moviesCard__title">{props.nameRu}</h2>
          {props.component === "movies" ? 
            (<button type="button" onClick={handleClick} className={`moviesCard__save ${!props.isSaved ? '' : "moviesCard__save_active"}`} disabled={props.disabled} ></button>) : 
            (<button type="button" className="moviesCard__delete" onClick={handleDelete}></button>)}
        </div>
        <p className="moviesCard__duration">{convertDuration(props.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
