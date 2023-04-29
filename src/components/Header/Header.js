import { Routes, Route, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <header className="header header_main">
              <div className="header__logo" alt="логотип"></div>
              <div className="header__auth">
                <Link to="/signup" className="header__link">
                  Регистрация
                </Link>
                <button type="button" className="header__button">
                  <Link to="/signin" className="header__button-link">
                    Войти
                  </Link>
                </button>
              </div>
            </header>
          </>
        }
      ></Route>
    </Routes>
  );
}

export default Header;
