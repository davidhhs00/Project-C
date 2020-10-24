import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ChooseGroupPage from './pages/choosegrouppage/choosegroup.component';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ChooseGroupPage} />
        <Route path='/' render={() => <Redirect to='/' />} />
      </Switch>
    );
  }
}

export default App;
