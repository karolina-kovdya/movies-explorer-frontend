import "./Profile.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [userName, setUserName] = useState("Каролина");
  const [email, setEmail] = useState("karolinochka-89@mail.ru");

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {userName}!</h2>
      <label className="profile__field">
        <p className="profile__placeholder">Имя</p>
        <p className="profile__placeholder">{userName}</p>
      </label>
        <input className="profile__input profile__input_border" type="text" name="name" required />
      <label className="profile__field">
        <p className="profile__placeholder">E-mail</p>
        <p className="profile__placeholder">{email}</p>
      </label>
        <input className="profile__input" type="text" name="email" required />
      <div className="profile__link-container">
        <button className="profile__change" type="submit">Редактировать</button>
        <Link to="/" className="profile__link">
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

export default Profile;
