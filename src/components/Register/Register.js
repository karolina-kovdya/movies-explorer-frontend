import "./Register.css";
import EntryForm from "../EntryForm/EntryForm";
import { useValidation } from "../../hooks/UseValidation";

function Register() {
  const { values, handleChange, errors, isValid} = useValidation({
    name: '',
    email: '',
    password: ''
  });

  return (
    <EntryForm
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      text="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      disabled={!isValid}
    >
      <>
        <label className="register">
          <p className="register__placeholder">Имя</p>
          <input 
            className="register__input" 
            type="text" 
            name="name" 
            value={values.name || ''}
            onChange={(evt) => handleChange(evt)}
            minLength='3'
            maxLength='30'
            required
          />
          <span className={`register__error ${!isValid ? "register__error_active" : ""}`}>{errors.name}</span>
        </label>
        <label className="register">
          <p className="register__placeholder">E-mail</p>
          <input
            className="register__input"
            type="text"
            name="email"
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
            value={values.email || ''}
            onChange={(evt) => handleChange(evt)}
            required
          />
          <span className={`register__error ${!isValid ? "register__error_active" : ""}`}>{errors.email}</span>
        </label>
        <label className="register">
          <p className="register__placeholder">Пароль</p>
          <input
            className="register__input"
            type="text"
            name="password"
            value={values.password}
            onChange={(evt) => handleChange(evt)}
            minLength='5'
            maxLength='30'
            required
          />
          <span className={`register__error ${!isValid ? "register__error_active" : ""}`}>{errors.password}</span>
        </label>
      </>
    </EntryForm>
  );
}

export default Register;
