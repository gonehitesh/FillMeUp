import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Registration from "./registration/Registration";

ReactDOM.render(
  <React.StrictMode>
    <Registration />
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);