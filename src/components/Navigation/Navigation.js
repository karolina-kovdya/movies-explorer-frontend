import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({ onBurgerMenu, loggedIn }) {
  const path = useLocation().pathname;

  function handleClick() {
    onBurgerMenu();
  }

  return (
    <div className="navTab">
      <ul className="navTab__list">
        <li className="navTab__links">
          {path === "/movies" ? (
            <Link to="/movies" className="navTab__link navTab__link_active">
              Фильмы
            </Link>
          ) : (
            <Link to="/movies" className={path === "/" ? "navTab__link navTab__link_dark" : "navTab__link"}>
              Фильмы
            </Link>
          )}
        </li>
        <li className="navTab__links">
          {path === "/saved-movies" ? (
            <Link to="/saved-movies" className="navTab__link navTab__link_active">
              Сохранённые фильмы
            </Link>
          ) : (
            <Link to="/saved-movies" className={path === "/" ? "navTab__link navTab__link_dark" : "navTab__link"}>
              Сохранённые фильмы
            </Link>
          )}
        </li>
      </ul>
      <Link to="/profile" className={path === "/" ? "navTab__profile-link navTab__profile-link_dark" : "navTab__profile-link navTab__profile-link_white"}></Link>
      <button className={!loggedIn ? "navTab__burger-btn navTab__burger-btn_white" : "navTab__burger-btn navTab__burger-btn_dark"} onClick={handleClick} />
    </div>
  );
}

export default Navigation;
