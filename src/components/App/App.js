import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from '../Haeder/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
