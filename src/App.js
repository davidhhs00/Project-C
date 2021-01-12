import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import './components/choose-solo/_react-dates.css'

import Login from './components/login/login.component';
import Home from './components/home/Home.component';
import ChooseGroup from './components/choose-group/choosegroup.component';
import CustomButton from './components/custom-button/custom-button.component';
import YourBookingsSolo from './components/your-bookings-solo/your-bookings-solo.component';
import MainSolo from './components/choose-solo/main.component';
import map from './components/map/map.component';
import admin from './pages/admin/admin-page.component';

import Notification from './components/notification/notification.component';

import { auth, createUserProfileDocument, findNotification } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"; 

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notification: null,
    }

    this.checkNotification = this.checkNotification.bind(this);
    this.setNotificationToNull = this.setNotificationToNull.bind(this);
    this.updateNotificationState = this.updateNotificationState.bind(this);
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
        this.updateNotificationState(userRef.id);
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  updateNotificationState(id) {
    this.checkNotification(id).then(res => this.setState({ notification: res }))
  }

  checkNotification(userID) {
      console.log(userID);
      return findNotification(userID).then(function(result) {
        console.log(result);
        if (result.length >= 1) {
          console.log("Found Notifications!");
          console.log(result)
          return result
        } else {
          console.log("Nothing!!!!!");
          return null;
        }
      })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  setNotificationToNull() {
    this.setState({
      notification: null
    });
  }

  render() {
    return (
      <Router>
          { this.state.notification !== null ? <Notification notification={this.state.notification} action={this.updateNotificationState} /> : null }
          <Switch>
            <Route exact path='/' render={() => this.props.currentUser ? (<Redirect to='/home' />) : (<Login />)} />
            <Route exact path='/home' render={() => this.props.currentUser ? (<Home action={this.setNotificationToNull} />) : (<Redirect to='/' />) }/>

            <Route exact path='/choosesolo' render={() => this.props.currentUser ? (<MainSolo/>) : (<Redirect to='/choosesolo'/>)}/>
            <Route exact path='/choosegroup' render={() => this.props.currentUser ? (<ChooseGroup/>) : (<Redirect to='/choosegroup'/>)}/>
            <Route path='/custombutton' component={CustomButton}/>


            <Route path= '/yourbookings' render={() => this.props.currentUser ? (<YourBookingsSolo currentUserCheck={this.props.currentUser}/>) : (<Redirect to='/yourbookings'/>)}/>
            <Route path= '/map' component={map}/>
            <Route exact path='/admin' component={admin}/>
          </Switch>
      </Router>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);