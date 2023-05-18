import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
