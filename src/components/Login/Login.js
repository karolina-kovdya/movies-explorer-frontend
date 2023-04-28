import "./Login.css";
import EntryForm from "../EntryForm/EntryForm";

function Login() {
  return (
    <EntryForm
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      text="Ещё не зарегистрированы?"
      url='/signup'
      linkText="Регистрация"
    >
      <>
        <label className="login__field">
          <h3 className="login-placeholder">E-mail</h3>
          <input
          className="login__input"
            type="text"
            name="email"
            required
          />
        </label>
        <label className="login__field">
          <h3 className="login-placeholder">Пароль</h3>
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