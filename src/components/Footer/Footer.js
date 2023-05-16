import { Routes, Route } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <Routes>
      {["/", "/movies", "/saved-movies"].map((path, key) => (
        <Route
          key={key}
          path={path}
          element={
            <>
              <footer className="footer">
                <div className="footer__conteiner">
                  <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                </div>
                <div className="footer__info">
                  <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                  <ul className="footer__link-list">
                    <li className="footer__link">
                      <a href="https://practicum.yandex.ru" className="footer__link-element" rel="noreferrer" target="_blank">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__link">
                      <a href="https://github.com/karolina-kovdya" className="footer__link-element" rel="noreferrer" target="_blank">Github</a>
                    </li>
                  </ul>
                </div>
              </footer>
            </>
          }
        />
      ))}
    </Routes>
  );
}

export default Footer;
