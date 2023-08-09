/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {createStore} from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/reducer";
import {Provider} from 'react-redux';


const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
