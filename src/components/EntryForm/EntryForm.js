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
            <form className="entryForm__form" onSubmit={props.handleSubmit} noValidate>
              <fieldset className="entryForm__form-set">
                {props.children}
              </fieldset>
              <div className="entryForm__submit-container">
                <span className={`entryForm__error ${!props.isRegistred ? "entryForm__error_active" : ""}`}>{props.resMessage}</span>
                <button type="submit" className="entryForm__button" disabled={props.disabled}>{props.buttonText}</button>
              </div>
            </form>
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
  