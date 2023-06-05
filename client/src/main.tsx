import React from 'react'
import ReactDOM, {createRoot} from 'react-dom/client'
import App from './App.js'
import './index.scss'
import * as bootstrap from 'bootstrap'
import {Provider} from "react-redux";
import store from './store'

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
