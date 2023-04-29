import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path='/'
            element={<Main />}
          />
          <Route 
            path="/signin" 
            element={<Login />} 
          />
          <Route
            path="/signup"
            element={<Register />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
