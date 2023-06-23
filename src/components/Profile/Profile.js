import "./Profile.css";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { currentUserContext } from "../../context/CurrentUserContext";
import { useValidation } from "../../hooks/UseValidation";

function Profile({ onSignOut, onEdit, resMessage, setResMessage, isRegistred }) {
  const currentUser = useContext(currentUserContext);
  const { values, handleChange, errors, isValid } = useValidation({
    name: currentUser.name,
    email: currentUser.email,
  });

  const [isDisabled, SetIsDisabled] = useState(isValid);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    values.name = currentUser.name;
    values.email = currentUser.email;
  }, [])

  useEffect(() => {
    if(currentUser.name === values.name && currentUser.email === values.email) {
      SetIsDisabled(!isDisabled)
    } else {
      SetIsDisabled(isDisabled)
    }
  }, []);

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [currentUser.email, currentUser.name, values, values.email, values.name]);

  function editProfile() {
    setResMessage('')
    SetIsDisabled(!isDisabled);
    setDisabled(true)
  }

  function handleEdit(e) {
    e.preventDefault();

    onEdit({
      name: values.name,
      email: values.email,
    });
    setTimeout(() => {
      SetIsDisabled(isValid)
      setResMessage('')
    }, 1000)
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleEdit}>
        <label className="profile__field">
          Имя
          <input
            className={`profile__input ${
              errors.name ? "profile__input_active" : ""
            }`}
            type="text"
            name="name"
            placeholder="Имя"
            value={values.name || ''}
            pattern="[a-zA-Zа-яА-Я\-\s]*"
            minLength="2"
            maxLength="30"
            onChange={(evt) => handleChange(evt)}
            required
            disabled={isDisabled}
          />
        </label>
        <label className="profile__field">
          E-mail
          <input
            className="profile__input"
            type="text"
            name="email"
            placeholder="email"
            value={values.email || ''}
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$"
            minLength="2"
            maxLength="30"
            onChange={(evt) => handleChange(evt)}
            required
            disabled={isDisabled}
          />
        </label>
        {isDisabled ? (
          <div className="profile__link-container">
            <button
              className="profile__change"
              type="button"
              onClick={editProfile}
            >
              Редактировать
            </button>
            <Link to="/" className="profile__link" onClick={onSignOut}>
              Выйти из аккаунта
            </Link>
          </div>
        ) : (
          <div className="profile__submit-container">
            {!isValid ? (
              <span
                className={`profile__error ${
                  !isValid ? "profile__error_active" : ""
                }`}
              >
                {errors.name || errors.email}
              </span>
            ) : (
              <span
                className={`profile__error ${
                  !isRegistred ? "profile__error_active" : ""
                }`}
              >
                {resMessage}
              </span>
            )}

            <button
              type="submit"
              className="profile__button"
              disabled={!isValid || disabled || errors.name || errors.email}
            >
              Сохранить
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default Profile;
