import { Link } from "react-router-dom"; 
import './BurgerMenu.css'

function BurgerMenu(props) {
  return (
    <section className={`${props.isOpen ? 'burgerMenu burgerMenu_opened' : 'burgerMenu'}`} >
        <div className="burgerMenu__container">
        <button className="burgerMenu__btn" type="button" onClick={props.onClose}></button>
          <ul className="burgerMenu__list">
            <li className="burgerMenu__links">
              <Link to="/" className="burgerMenu__link" onClick={props.onClose}>Главная</Link>
            </li>
            <li className="burgerMenu__links">
              <Link to="/movies" className="burgerMenu__link" onClick={props.onClose}>Фильмы</Link>
            </li>
            <li className="burgerMenu__links">
              <Link to="/saved-movies" className="burgerMenu__link" onClick={props.onClose}>Сохранённые фильмы</Link>
            </li>
          </ul>
          <Link to='/profile' className="burgerMenu__profile-link" onClick={props.onClose}></Link>
        </div>
    </section>
  );
}

export default BurgerMenu;