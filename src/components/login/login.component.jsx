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
        <Link to="/Choose">
            <img src={LoginLogo} className="login-image"/>
            <button className="google-button">Login met Google</button>
        </Link>
        </div>
    </body>
);
export default HomePage;