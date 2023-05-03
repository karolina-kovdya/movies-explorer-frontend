import { Routes, Route } from "react-router-dom";
import "./Header.css";
import NavigationMain from "../Navigation/NavigationMain";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <header className="header header_notLogin">
              <div className="header__logo" alt="логотип"></div>
              <NavigationMain />
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
                <div className="header__logo" alt="логотип"></div>
                <Navigation />
              </header>
            </>
          }
        />
      ))}
    </Routes>
  );
}

export default Header;
