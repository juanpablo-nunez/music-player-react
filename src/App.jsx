/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import './App.scss';
import Home from './components/Pages/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeContext, themes } from "./theme/Theme";
import musicDB from "./db/music";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "./actions/actions.js";

const App = () => {

  return (
    <ThemeContext.Provider value={themes.light}>
      <>
        <Router>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/*" component={Home} />
          </Switch>
        </Router>
      </>
    </ThemeContext.Provider>
  );
}

export default App;