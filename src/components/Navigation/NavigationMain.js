import { Link } from "react-router-dom";
import "./NavigationMain.css";

function NavigationMain() {
  return (
    <div className="navMain">
      <Link to="/signup" className="navMain__link">
        Регистрация
      </Link>
      <button type="button" className="navMain__button">
        <Link to="/signin" className="navMain__button-link">
          Войти
        </Link>
      </button>
    </div>
  );
}

export default NavigationMain;
