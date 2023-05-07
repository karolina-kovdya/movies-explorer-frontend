import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function App() {
  const [isBurgerOpen, setisBurgerOpen] = useState(false);

  function handleBurgerOpen () {
    setisBurgerOpen(!isBurgerOpen)
  }

  function closeBurgerMenu () {
    setisBurgerOpen(false)
  }

  return (
    <BrowserRouter>
      <div className="app">
      <BurgerMenu 
         isOpen={isBurgerOpen}
         onClose={closeBurgerMenu}
      />
      <Header 
          onBurgerMenu={handleBurgerOpen}
      />
        <Routes>
          <Route
            path="/"
            element={<Main />}
          />

          <Route
            path="/movies"
            element={<Movies />}
          />

          <Route
            path="/saved-movies"
            element={<SavedMovies />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route 
            path="/signin" 
            element={<Login />} 
          />
          
          <Route
            path="/signup"
            element={<Register />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
