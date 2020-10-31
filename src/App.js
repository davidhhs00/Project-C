import React from 'react';
import { connect } from 'react-redux';

import './App.css';

import Login from './components/login/login.component';
import Home from './components/home/Home.component';
import AllBookings from './components/all-booking/all-booking.component';
import AllBookingsInfo from './components/all-booking-info/all-booking-info.component';
import BookingInfo from './components/booking-info/booking-info.component';
import ChooseGroup from './components/choose-group/choosegroup.component';
import CustomButton from './components/custom-button/custom-button.component';
import EndGroup from './components/end-group/end-group.component';
import YourBookingsAdmin from './components/your-bookings-admin/your-bookings-admin.component';
import SoloEndPage from './components/solo-end/solo-end.component';
import YourBookingsSolo from './components/your-bookings-solo/your-bookings-solo.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import HomePage from './components/login/login.component';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom"; 


class App extends React.Component {
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
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Router>
      <div>
      <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/home' component={Home}/>
      <Route path='/allbookings' component={AllBookings}/>
      <Route path='/bookinginfo' component={BookingInfo}/>
      <Route path='/choosegroup' component={ChooseGroup}/>
      <Route path='/custombutton' component={CustomButton}/>
      <Route path='/endgroup' component={EndGroup}/>
      <Route path='/yourbookingsadmin' component={YourBookingsAdmin}/>
      <Route path= '/soloend' component={SoloEndPage}/>
      <Route path= '/yourbookingssolo' component={YourBookingsSolo}/>
      </Switch>
      </div>
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
