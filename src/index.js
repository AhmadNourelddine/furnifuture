import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store.js';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(

  <Provider store={store}>
    <Router>
    <ToastContainer/>
       <App />
    </Router>
  </Provider>

,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
