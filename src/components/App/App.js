import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
      <Header />
        <Routes>
          <Route
            path="/"
            element={<Main />}
          />

          <Route
            path='/movies'
            element={<Movies />}
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
      </div>
    </BrowserRouter>
  );
}

export default App;
