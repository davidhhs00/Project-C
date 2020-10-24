import React from 'react';

import LoginLogo from "../../images/loginlogo.png"
import GoogleSignIn from "../../images/google.jpg"
import './homepage.styles.scss';

const HomePage = () => (
    <body>
        <div>
            <img src={LoginLogo} className="login-image"/>
            <button className="google-button">Login met Google</button>
        </div>
    </body>
);
export default HomePage;