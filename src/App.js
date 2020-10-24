import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Choose from './pages/welcomepage/choose.component';
import Homepage from './pages/homepage/homepage.component';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Choose} />
        <Route path='/' render={() => <Redirect to='/' />} />
      </Switch>
    );
  }
}

export default App;
