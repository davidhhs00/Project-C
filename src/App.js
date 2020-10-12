import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Main from './pages/homepage/main.component';
import Login from './Login.js';
import { SubmitButton, InputField } from './Login.js'

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage, Main} />
        <Route path='/' render={() => <Redirect to='/' />} />
      </Switch>
    );
  }
}


export default App;
