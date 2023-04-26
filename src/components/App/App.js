import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from '../Haeder/Header';
import Main from '../Main/Main';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
