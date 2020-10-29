import React from 'react';

import LoginLogo from "../../assets/loginlogo.png"
import GoogleSignIn from "../../assets/google.jpg"
import './login.styles.scss';
import {
    Link
  } from "react-router-dom"; 

const HomePage = () => (
    <body>
        <div>
            <img src={LoginLogo} className="login-image"/>
            <button onClick={event =>  window.location.href='/home'} className="google-button">Login met Google</button>
        </div>
    </body>
);
export default HomePage;