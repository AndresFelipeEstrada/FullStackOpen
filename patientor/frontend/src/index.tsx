import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { reducer, StateProvider } from "./state";
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StateProvider>,
  document.getElementById('root')
);
