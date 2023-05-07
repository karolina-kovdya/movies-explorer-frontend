import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({onBurgerMenu}) {
  function handleClick () {
    onBurgerMenu()
  }

  return (
    <div className="navTab">
      <ul className="navTab__list">
        <li className="navTab__links">
          <Link to="/movies" className="navTab__link">Фильмы</Link>
        </li>
        <li className="navTab__links">
          <Link to="/saved-movies" className="navTab__link">Сохранённые фильмы</Link>
        </li>
      </ul>
      <Link to='/profile' className="navTab__profile-link"></Link>
      <button className="navTab__burger-btn" onClick={handleClick} />
    </div>
  );
}

export default Navigation;
