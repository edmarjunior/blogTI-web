import React from 'react';
import { Router } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';
import history from './services/history';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <>
      <Router history={history}>
        <Header />
        <Footer />
        <Routes />
        <GlobalStyle />
      </Router>
    </>
  );
}

export default App;
