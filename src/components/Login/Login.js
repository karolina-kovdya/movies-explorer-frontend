import "./Login.css";
import EntryForm from "../EntryForm/EntryForm";

function Login() {
  return (
    <EntryForm
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      text="Ещё не зарегистрированы?"
      link='/signup'
      linkText="Регистрация"
    >
      <>
        <label className="login">
          <p className="login__placeholder">E-mail</p>
          <input
          className="login__input"
            type="text"
            name="email"
            required
          />
        </label>
        <label className="login">
          <p className="login__placeholder">Пароль</p>
          <input
          className="login__input"
            type="text"
            name="password"
            required
          />
        </label>
      </>
    </EntryForm>
  );
}

export default Login;