import React from 'react';
import { Link } from 'react-router-dom';

import Logo from "../../assets/logo.png"
import "./Home.styles.scss"


const Choose = () => (
        <div className = "main">
            <button onClick={event =>  window.location.href='/'} className="button" id="log-outbtn">Logout</button>
            <button id="adminbtn">Admin</button>
            <img src={Logo} className="logo"/>
            <h1 id="welcome-txt" className = "text">Welcome, User</h1>
            <p id="booktxt" className="text">Book a workplace for:</p>
            <button id="yourselfbtn" className = "button">Yourself</button>
            <button onClick={event =>  window.location.href='/choosegroup'} id="groupbtn" className = "button">Group</button>
            <p id="bookingstxt" className="text">See Bookings:</p>
            <button id="ybookingsbtn" className = "button">Your Bookings</button>
            <button id="abookingsbtn" className = "button">All Bookings</button>
        </div>
);
export default Choose;