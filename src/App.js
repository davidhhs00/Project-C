import React from 'react';
import './App.css';
import Choose from './pages/welcomepage/choose.component';
import Homepage from './pages/homepage/homepage.component';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 

class App extends React.Component {
  render() {
    return (
      <Router>
      <div>
      <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route path='/Choose' component={Choose}/>
      </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
