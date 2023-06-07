import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import { WINDOW_SIZE, CARD_QUANTITY, CARD_ADDED } from "../../utils/contants";

function MoviesCardList({movies, onSave}) {
  const [cardQuantity, setCardQuantity] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => {
      setTimeout(() => 
      setWidth(window.innerWidth), 200)
    }
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  },[])

  useEffect(() => {
    if(width > WINDOW_SIZE.MID) {
      setCardQuantity(CARD_QUANTITY.MAX)
    } else if (width > WINDOW_SIZE.MIN) {
      setCardQuantity(CARD_QUANTITY.MID)
    } else if (width <= WINDOW_SIZE.MIN) {
      setCardQuantity(CARD_QUANTITY.MIN)
    }
  }, [width])

  function adedMoreMovie () {
    let addedCard
    if(width > WINDOW_SIZE.MID) {
      addedCard = CARD_ADDED.MAX
    } else if (width > WINDOW_SIZE.MIN) {
      addedCard = CARD_ADDED.MIN
    } else if (width <= WINDOW_SIZE.MIN) {
      addedCard = CARD_ADDED.MIN
    }

    setCardQuantity(cardQuantity + addedCard)
  }

  return (
    <section className="moviesCards">
      <ul className="moviesCards__list">
        {movies.slice(0, cardQuantity).map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={movie.id}
              url={`https://api.nomoreparties.co/${movie.image.url}`}
              nameRu={movie.nameRU}
              duration={movie.duration}
              onSave={onSave}
              component="movies"
            />
          );
        })}
      </ul>
      {movies.length > cardQuantity && 
        <button type="button" className='moviesCards__button' onClick={(adedMoreMovie)} >Ещё</button>
      }
    </section>
  );
}

export default MoviesCardList;
