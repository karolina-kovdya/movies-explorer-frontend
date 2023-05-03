import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
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
    </div>
  );
}

export default Navigation;
