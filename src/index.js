import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import { App } from './components';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App></App>
  </Router>,
);
