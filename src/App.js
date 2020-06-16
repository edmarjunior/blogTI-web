import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import GlobalStyle from './styles/global';
import Routes from './routes';
import history from './services/history';
import Header from './components/Header';
import Header2 from './components/Header2';
import Footer from './components/Footer';
import { store, persistor } from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Header2 />
            <Footer />
            <Routes />
            <GlobalStyle />
            <ToastContainer autoClose={5000} position='bottom-left' />
          </Router>
        </PersistGate>
      </Provider>
      
    </>
  );
}

export default App;
