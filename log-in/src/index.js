import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/assets/styles/index.css';
import App from '../src/components/App.js';
import reportWebVitals from '../src/tests/reportWebVitals.js';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App name="LoginForm" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
