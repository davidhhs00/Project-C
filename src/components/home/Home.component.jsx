import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';

import Logo from "../../assets/logo.png"
import "./Home.styles.scss"

const Choose = ({currentUser}) => (
    <div className = "main">
        <button onClick={() => auth.signOut()} className="button" id="log-outbtn">Logout</button>
        <button id="adminbtn" className="button">Admin</button>
        <img src={Logo} className="logo" alt="logo"/>
        <h1 id="welcome-txt" className = "text">Welcome, {currentUser.displayName}</h1>
        <p id="booktxt" className="text">Book a workplace for:</p>
        <button id="sickbtn" className="button">I'm sick</button>
        <button id="yourselfbtn" onClick={event => window.location.href='/choosesolo'} className = "button">Yourself</button>
        <button onClick={event =>  window.location.href='/choosegroup'} id="groupbtn" className = "button">Group</button>
        <p id="bookingstxt" className="text">See Bookings:</p>
        <button onClick={event =>  window.location.href='/yourbookings'} id="ybookingsbtn" className = "button">Your Bookings</button>
        <button onClick={event =>  window.location.href='/allbookings'} id="abookingsbtn" className = "button">All Bookings</button>
    </div>       
); 

const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser
});

export default connect(mapStateToProps)(Choose);
