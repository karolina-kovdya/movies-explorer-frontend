import "./Register.css";
import EntryForm from "../EntryForm/EntryForm";

function Register() {
  return (
    <EntryForm
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      text="Уже зарегистрированы?"
      link='/signin'
      linkText="Войти"
    >
      <>
        <label className="register__field">
          <h3 className="register-placeholder">Имя</h3>
          <input
          className="register__input"
            type="text"
            name="name"
            required
          />
        </label>
        <label className="register__field">
          <h3 className="register-placeholder">E-mail</h3>
          <input
          className="register__input"
            type="text"
            name="email"
            required
          />
        </label>
        <label className="register__field">
          <h3 className="register-placeholder">Пароль</h3>
          <input
          className="register__input"
            type="text"
            name="password"
            required
          />
        </label>
      </>
    </EntryForm>
  );
}

export default Register;
