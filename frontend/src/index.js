import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// reportWebVitals();

// const container = document.getElementById("root");
// const root = createRoot(container);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <HashRouter>
//     <App />
//   </HashRouter>,
//   document.getElementById("root")
// );

