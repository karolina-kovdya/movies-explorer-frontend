import { Routes, Route, Link } from "react-router-dom";
import "./Header.css";
import NavigationMain from "../Navigation/NavigationMain";
import Navigation from "../Navigation/Navigation";

function Header({loggedIn, onBurgerMenu}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <header className="header header_notLogin">
              <div className="header__logo" alt="логотип"></div>
              {!loggedIn ? 
              <NavigationMain /> :
              <Navigation onBurgerMenu={onBurgerMenu} loggedIn={loggedIn}/>
              }
            </header>
          </>
        }
      ></Route>
      {["/movies", "/saved-movies", "/profile"].map((path, key) => (
        <Route
          key={key}
          path={path}
          element={
            <>
              <header className="header header_login">
                <Link to='/' className="header__logo-link"><div className="header__logo" alt="логотип"></div></Link>
                <Navigation onBurgerMenu={onBurgerMenu}/>
              </header>
            </>
          }
        />
      ))}
    </Routes>
  );
}

export default Header;
