import "./Login.css";
import EntryForm from "../EntryForm/EntryForm";
import { useValidation } from "../../hooks/UseValidation";

function Login() {
  const { values, handleChange, errors, isValid} = useValidation({
    email: '',
    password: ''
  });

  return (
    <EntryForm
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      text="Ещё не зарегистрированы?"
      link='/signup'
      linkText="Регистрация"
      disabled={!isValid}
    >
      <>
        <label className="login">
          <p className="login__placeholder">E-mail</p>
          <input
            className="login__input"
            type="text"
            name="email"
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
            value={values.email || ''}
            onChange={(evt) => handleChange(evt)}
            required
          />
          <span className={`login__error ${!isValid ? "login__error_active" : ""}`}>{errors.email}</span>
        </label>
        <label className="login">
          <p className="login__placeholder">Пароль</p>
          <input
          className="login__input"
            type="text"
            name="password"
            value={values.password}
            onChange={(evt) => handleChange(evt)}
            minLength='5'
            maxLength='30'
            required
          />
          <span className={`login__error ${!isValid ? "login__error_active" : ""}`}>{errors.password}</span>
        </label>
      </>
    </EntryForm>
  );
}

export default Login;