import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
  const path = useLocation().pathname;

  const [currentUser, setCurrentUser] = useState({});

  const [isBurgerOpen, setisBurgerOpen] = useState(false);

  const [isRegistred, setIsRegistred] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [serverError, setServerError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem("checkbox")) || false
  );
  const [chekedSave, setCheckedSave] = useState(false);

  const [localMovies, setLocalMovies] = useState(
    JSON.parse(localStorage.getItem("allMovies")) || []
  );
  const [searchedMovies, setSearchedMovie] = useState([]);
  const [savedMovie, setSavedMovie] = useState([]);
  const [previosSearch, setPreviosSearch] = useState(
    JSON.parse(localStorage.getItem("prevSearch")) || []
  );

  useEffect(() => {
    checkJwt();
  }, []);

  useEffect(() => {
    if (path === "/movies") {
      setSearchedMovie(previosSearch);
    }
  }, []);

  useEffect(() => {
    if (path === "/saved-movies") {
      mainApi
        .getMovies()
        .then((savedMovies) => {
          setSavedMovie(savedMovies);
        })
        .catch((err) => {
          console.log(`Ошибка при загрузке данных с сервера: ${err}`);
        });
    }
  }, [path]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([userInfo, movies]) => {
          setCurrentUser(userInfo);
          setSavedMovie(movies);
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
        .then((res) => {
          setCurrentUser(res);
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
    setResMessage("");
    return mainApi
      .register(name, email, password)
      .then((res) => {
        handleLogin({ email, password });
        setCurrentUser(res);
        setIsRegistred(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {
    setResMessage("");
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
    setSearchedMovie([]);
    setChecked(false);
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

  function handleSaveShortClick() {
    setCheckedSave(!chekedSave);
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
    localStorage.setItem("movieParam", param);
    localStorage.setItem("checkbox", checked);
    setIsLoading(true);
    setDisabled(true);
    setNotFound(false);
    setServerError(false);
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
            if (!checked) {
              setSearchedMovie(foundMovie);
              localStorage.setItem("prevSearch", JSON.stringify(foundMovie));
              setPreviosSearch(foundMovie);
            } else {
              setSearchedMovie(foundShortMovie);
              localStorage.setItem(
                "prevSearch",
                JSON.stringify(foundShortMovie)
              );
              setPreviosSearch(foundShortMovie);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setServerError(true);
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
          if (!checked) {
            setSearchedMovie(foundMovie);
            localStorage.setItem("prevSearch", JSON.stringify(foundMovie));
            setPreviosSearch(foundMovie);
          } else {
            setSearchedMovie(foundShortMovie);
            localStorage.setItem("prevSearch", JSON.stringify(foundShortMovie));
            setPreviosSearch(foundShortMovie);
          }
        }
      }, 1000);
    }
  }

  function searchSaveMovie(param) {
    setIsLoading(true);
    setDisabled(true);
    setNotFound(false);
    const foundSavedMovie = handleSearchFilter(savedMovie, param);
    const foundSavedShortMovie = handleShortFilter(foundSavedMovie, chekedSave);
    if (foundSavedMovie.length === 0 || foundSavedShortMovie.length === 0) {
      setIsLoading(false);
      setDisabled(false);
      setNotFound(true);
    } else {
      setNotFound(false);
      setIsLoading(false);
      setDisabled(false);
      if (!chekedSave) {
        setSavedMovie(foundSavedMovie);
      } else {
        setSavedMovie(foundSavedShortMovie);
      }
    }
  }

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovie((prev) => [...prev, savedMovie]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movie) {
    const deletedMovie = savedMovie.find((i) => i.movieId === movie.id);
    mainApi
      .deleteMovie(deletedMovie._id)
      .then(() => {
        setSavedMovie((selectedMovie) =>
          selectedMovie.filter((i) => i._id !== deletedMovie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSaveDelete(movie) {
    const deletedMovie = savedMovie.find((i) => i._id === movie._id);
    mainApi
      .deleteMovie(deletedMovie._id)
      .then(() => {
        setSavedMovie((selectedMovie) =>
          selectedMovie.filter((i) => i._id !== deletedMovie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="app">
        <BurgerMenu isOpen={isBurgerOpen} onClose={closeBurgerMenu} />
        <Header loggedIn={loggedIn} onBurgerMenu={handleBurgerOpen} />
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
                  savedMovie={savedMovie}
                  onSearchMovies={searchAllMovies}
                  notFound={notFound}
                  disabled={disabled}
                  checked={checked}
                  onCheck={handleShortClick}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  serverError={serverError}
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
                  onDelete={handleSaveDelete}
                  isLoading={isLoading}
                  disabled={disabled}
                  notFound={notFound}
                  onSearchMovies={searchSaveMovie}
                  checked={chekedSave}
                  onCheck={handleSaveShortClick}
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
                  setResMessage={setResMessage}
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
