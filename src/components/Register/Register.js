import "./Register.css";
import EntryForm from "../EntryForm/EntryForm";
import { useValidation } from "../../hooks/UseValidation";

function Register({onSignUp, resMessage, isRegistred}) {
  const { values, handleChange, errors, isValid} = useValidation({
    name: '',
    email: '',
    password: ''
  });

  function handleRegister(e) {
    e.preventDefault();
      
      onSignUp({
        name: values.name,
        email: values.email,
        password: values.password,
      })
  }

  return (
    <EntryForm
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      text="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      disabled={!isValid}
      handleSubmit={handleRegister}
      isRegistred={isRegistred}
      resMessage={resMessage}
      
    >
      <>
        <label className="register">
          <p className="register__placeholder">Имя</p>
          <input 
            className="register__input" 
            type="text" 
            name="name" 
            pattern="[a-zA-Zа-яА-Я-\s]*"
            placeholder="поле содержит только латиницу, кириллицу, пробел или дефис"
            value={values.name || ''}
            onChange={(evt) => handleChange(evt)}
            minLength='2'
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
            pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$'
            placeholder="поле содержит адрес электронной почты"
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
            placeholder="поле содержит от 5 до 30 символов"
            value={values.password || ''}
            onChange={(evt) => handleChange(evt)}
            minLength='2'
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
