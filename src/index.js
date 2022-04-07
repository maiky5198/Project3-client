import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mapbox-gl/dist/mapbox-gl.css'

ReactDOM.render(
  <BrowserRouter>
    <App />
    <footer></footer>
  </BrowserRouter>,
  document.getElementById('root')
);
