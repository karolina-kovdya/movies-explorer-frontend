import { Routes, Route, Navigate, useNavigate, json } from "react-router-dom";
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
import * as movieApi from "../../utils/MovieApi";
import { SHORT_MOVIE } from "../../utils/contants";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [isBurgerOpen, setisBurgerOpen] = useState(false);

  const [isRegistred, setIsRegistred] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [resMessage, setResMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem("checkbox")) || false
  );

  const [localMovies, setLocalMovies] = useState(
    JSON.parse(localStorage.getItem("allMovies")) || []
  );
  const [searchedMovies, setSearchedMovie] = useState([]);
  const [savedMovie, setSavedMovie] = useState([]);

  useEffect(() => {
    checkJwt();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([userInfo, movies]) => {
          setCurrentUser(userInfo);
          const savedMovies = movies.filter((movie) => movie.owner === userInfo._id);
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
          setSavedMovie(savedMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function checkJwt() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getContent(jwt)
        .then(() => {
          setLoggedIn(true);
          navigate("/movies");
        })
        .catch((err) => {
          if (err === "Ошибка: 400") {
            console.log("400 Токен не передан или передан не в том формате");
          } else if (err === "Ошибка: 401") {
            console.log("401 Переданный токен некорректен");
          } else {
            setResMessage("500 На сервере произошла ошибка.");
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
          setResMessage("500 На сервере произошла ошибка.");
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
          setResMessage("500 На сервере произошла ошибка.");
        }
      });
  }

  function handleUpdateUser({ name, email }) {
    return mainApi
      .editProfile(name, email)
      .then((res) => {
        setResMessage("Профиль обновлен");
        setCurrentUser(res);
      })
      .catch((err) => {
        setIsRegistred(false);
        console.log(err);
        if (err === "Ошибка: 409") {
          setResMessage("Пользователь с таким email уже существует.");
        } else if (err === "Ошибка: 401") {
          setResMessage(`При обновлении профиля произошла ошибка. ${err}`);
        } else if (err === "Ошибка: 400") {
          setResMessage(`При обновлении профиля произошла ошибка. ${err}`);
        } else {
          setResMessage("500 На сервере произошла ошибка.");
        }
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  function handleBurgerOpen() {
    setisBurgerOpen(!isBurgerOpen);
  }

  function closeBurgerMenu() {
    setisBurgerOpen(false);
  }

  function handleShortClick() {
    setChecked(!checked);
  }

  function handleSearchFilter(movies, text) {
    return movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(text.trim().toLowerCase());
    });
  }

  function handleShortFilter(movies, state) {
    return !state
      ? movies
      : movies.filter((movie) => movie.duration <= SHORT_MOVIE);
  }

  function searchAllMovies(param) {
    localStorage.setItem("movieParam", JSON.stringify(param));
    localStorage.setItem("checkBox", checked);
    setIsLoading(true);
    setDisabled(true);
    setNotFound(false);
    if (localMovies.length === 0) {
      movieApi
        .getMovies()
        .then((res) => {
          localStorage.setItem("allMovies", JSON.stringify(res));
          setLocalMovies(res);
          setIsLoading(false);
          setDisabled(false);
          const foundMovie = handleSearchFilter(res, param);
          const foundShortMovie = handleShortFilter(foundMovie, checked);
          if (foundMovie.length === 0 || foundShortMovie.length === 0) {
            setNotFound(true);
          } else {
            setNotFound(false);
            setSearchedMovie(foundMovie);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchedMovie([]);
      setTimeout(() => {
        setIsLoading(false);
        setDisabled(false);
        const foundMovie = handleSearchFilter(localMovies, param);
        const foundShortMovie = handleShortFilter(foundMovie, checked);
        if (foundMovie.length === 0 || foundShortMovie.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
          setSearchedMovie(foundMovie);
        }
      }, 1000);
    }
  }

  function handleSaveMovie (movie) {
    console.log(movie)
    mainApi
      .saveMovie(movie) 
      .then((savedMovie) => {
        setSavedMovie(prevState => [ ...prevState, savedMovie ]);
      })
      .catch((err) => {
        console.log(err.name);
      });
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
                <ProtectedRoute
                  component={Movies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  movies={searchedMovies}
                  onSearchMovies={searchAllMovies}
                  notFound={notFound}
                  disabled={disabled}
                  checked={checked}
                  onCheck={handleShortClick}
                  onSave={handleSaveMovie}
                />
              </>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <>
                <ProtectedRoute
                  component={SavedMovies}
                  loggedIn={loggedIn}
                  movies={savedMovie}
                />
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
