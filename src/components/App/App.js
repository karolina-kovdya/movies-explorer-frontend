import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import SavedMovies from "../SavedMovies/SavedMovies";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { currentUserContext } from "../../context/CurrentUserContext";
import * as mainApi from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerOpen, setisBurgerOpen] = useState(false);
  const [isRegistred, setIsRegistred] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [resMessage, setResMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    checkJwt()
  },[]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if(jwt) {
      Promise.all([mainApi.getUserInfo()])
      .then(([userInfo]) => {
        setCurrentUser(userInfo);
        console.log(userInfo)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },[loggedIn])

  function checkJwt() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getContent(jwt)
        .then(() => {
          setLoggedIn(true);
          navigate('/movies')
        })
        .catch((err) => {
          if (err === "Ошибка: 400") {
            console.log("400 Токен не передан или передан не в том формате");
          } else if (err === "Ошибка: 401") {
            console.log("401 Переданный токен некорректен");
          } else {
            setResMessage('500 На сервере произошла ошибка.')
          }
        });
    }
  }

  function handleRegister({ name, email, password }) {
    return mainApi
      .register(name, email, password)
      .then(() => {
        setIsRegistred(true);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 409") {
          setResMessage("Пользователь с таким email уже существует.");
        } else if (err === "Ошибка: 401") {
          setResMessage(
            `При регистрации пользователя произошла ошибка. ${err}`
          );
        } else {
          setResMessage('500 На сервере произошла ошибка.')
        }
      });
  }

  function handleLogin({ email, password }) {
    return mainApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistred(false);
        if (err === "Ошибка: 409") {
          setResMessage("Вы ввели неправильный логин или пароль.");
        } else if (err === "Ошибка: 400") {
          setResMessage(
            "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
          );
        } else if (err === "Ошибка: 401") {
          setResMessage(
            `При авторизации пользователя произошла ошибка. ${err}`
          );
        } else {
          setResMessage('500 На сервере произошла ошибка.')
        }
      });
  }

  function handleUpdateUser({name, email}) {
    return mainApi
      .editProfile(name, email)
      .then((res) => {
        console.log(res)
        setCurrentUser(res);
        setResMessage("Профиль обновлен");
      })
      .catch((err) => {
        setIsRegistred(false)
        console.log(err);
        if (err === "Ошибка: 409") {
          setResMessage("Пользователь с таким email уже существует.");
        } else if (err === "Ошибка: 401") {
          setResMessage(`При обновлении профиля произошла ошибка. ${err}`);
        } else if (err === "Ошибка: 400") {
          setResMessage(`При обновлении профиля произошла ошибка. ${err}`);
        } else {
          setResMessage('500 На сервере произошла ошибка.')
        }
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/");
  }

  function handleBurgerOpen() {
    setisBurgerOpen(!isBurgerOpen);
  }

  function closeBurgerMenu() {
    setisBurgerOpen(false);
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="app">
        <BurgerMenu isOpen={isBurgerOpen} onClose={closeBurgerMenu} />
        <Header onBurgerMenu={handleBurgerOpen} />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route
            path="/movies"
            element={
              <>
                <ProtectedRoute component={Movies} loggedIn={loggedIn} />
              </>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <>
                <ProtectedRoute component={SavedMovies} loggedIn={loggedIn} />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <ProtectedRoute
                  component={Profile}
                  loggedIn={loggedIn}
                  onEdit={handleUpdateUser}
                  onSignOut={handleSignOut}
                  resMessage={resMessage}
                />
              </>
            }
          />

          <Route
            path="/movies"
            element={
              loggedIn ? <Navigate to="/movies" /> : <Navigate to="/signup" />
            }
          />

          <Route
            path="/signin"
            element={
              <Login
                onSignIn={handleLogin}
                resMessage={resMessage}
                isRegistred={isRegistred}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Register
                onSignUp={handleRegister}
                resMessage={resMessage}
                isRegistred={isRegistred}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
