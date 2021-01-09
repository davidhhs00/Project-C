import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase.utils";

import Logo from "../../assets/logo.png";
import "./Home.styles.scss";


const Choose = ({ currentUser, action }) => (
  <div>    
    <img className="home-logo" src={Logo} alt="logo" />

    <div className="home-absolute">
      <h2  className="home-text" id="home-h2"> Welcome, {currentUser.displayName} </h2>
      <p   className="home-text" id="home-p"> Choose an option:</p>

      <button className="home-button" > I'm sick </button>
      <button className="home-button"                     onClick={(event) => (window.location.href = "/choosesolo")}> Book a workplace </button>
      <button className="home-button"                     onClick={(event) => (window.location.href = "/choosegroup")}> Create Groups </button>
      <button className="home-button"                     onClick={(event) => (window.location.href = "/yourbookings")}> Bookings </button>

      <div className="home-center-buttons">
        <button className="home-button" id="home-logoutbtn" onClick={() => {auth.signOut(); action()}}> Logout </button>

        {
          currentUser.admin ? 
          <Link to='/admin'>
            <button className="home-button" id="home-adminbtn"> Admin </button>
          </Link>  :
          null
        }
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(Choose);
