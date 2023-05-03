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
          <p className="register__placeholder">Имя</p>
          <input
          className="register__input"
            type="text"
            name="name"
            required
          />
        </label>
        <label className="register__field">
          <p className="register__placeholder">E-mail</p>
          <input
          className="register__input"
            type="text"
            name="email"
            required
          />
        </label>
        <label className="register__field">
          <p className="register__placeholder">Пароль</p>
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
