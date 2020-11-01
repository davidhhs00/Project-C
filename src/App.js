import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Main from './pages/homepage/main.component';
import Login from './Login.js';
import { SubmitButton, InputField } from './Login.js'

import './App.css';

<<<<<<< Updated upstream
=======
import Login from './components/login/login.component';
import Home from './components/Home/Home.component';
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


>>>>>>> Stashed changes
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
