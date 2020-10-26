import React from 'react';
import './App.css';
import Loginpage from './pages/loginpage/loginpage.component';
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
      <Route exact path='/' component={Loginpage}/>
      <Route path='/Choose' component={Homepage}/>
      </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
