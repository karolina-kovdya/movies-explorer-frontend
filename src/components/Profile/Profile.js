import "./Profile.css";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { currentUserContext } from "../../context/CurrentUserContext";
import { useValidation } from "../../hooks/UseValidation";

function Profile({onSignOut, onEdit, resMessage, isRegistred}) {
  const currentUser = useContext(currentUserContext)
  const [isDisabled, SetIsDisabled] = useState(true)
  const { values, handleChange, errors, isValid} = useValidation({
    name: currentUser.name,
    email: currentUser.email
  });

  function editProfile () {
    SetIsDisabled(false)
  }

  function handleEdit(e) {
    e.preventDefault();
      
      onEdit({
        name: values.name,
        email: values.email
      })

    console.log(values.name)
  }


  return (
    <form className="profile" onSubmit={handleEdit}>
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <label className="profile__field profile__field_border">
        Имя
        <input 
          className="profile__input" 
          type="text" 
          name="name" 
          placeholder="Имя"
          defaultValue={currentUser.name || ''}
          pattern="[a-zA-Zа-яА-Я-\s]*"
          minLength='2'
          maxLength='30'
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
          defaultValue={currentUser.email || ''}
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          minLength='2'
          maxLength='30'
          onChange={(evt) => handleChange(evt)}
          required 
          disabled={isDisabled}
        />  
      </label>
      {isDisabled ? 
        <div className="profile__link-container">
          <button className="profile__change" type="button" onClick={editProfile}>Редактировать</button>
          <Link to="/" className="profile__link" onClick={onSignOut}>Выйти из аккаунта</Link>
        </div> : 
        <div className="profile__submit-container">
          {!isValid ?
          <span className={`profile__error ${!isValid ? "profile__error_active" : ""}`}>{errors.name || errors.email}</span>
          :
          <span className={`profile__error ${!isRegistred ? "profile__error_active" : ""}`}>{resMessage}</span>
          }

        <button type="submit" className="profile__button" disabled={!isValid || errors.name || errors.email}>Сохранить</button>
      </div>
      }
    </form>
  );
}

export default Profile;
