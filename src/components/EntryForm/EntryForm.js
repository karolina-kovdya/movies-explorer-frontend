import './EntryForm.css'
import { Link } from "react-router-dom";
import logo from '../../images/headerLogo.svg'

function EntryForm (props) {

    return (
      <div>
        <section className='entryForm'>
          <div className="entryForm__header">
            <Link to='/'><img className="entryForm__logo" src={logo} alt="логотип" /></Link>
            <h2 className="entryForm__title">{props.title}</h2>
            <form className="entryForm__form" noValidate>
              <fieldset className="entryForm__form-set">
                {props.children}
              </fieldset>
            </form>
            <button type="submit" className="entryForm__button">{props.buttonText}</button>
          </div>
          <div className="entryForm__link-container">
            <p className="entryForm__text">{props.text}</p>
            <Link to={props.link} className="entryForm__link">{props.linkText}</Link>
          </div>
        </section>
      </div>
    );
  }
  
  export default EntryForm;
  