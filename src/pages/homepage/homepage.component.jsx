import React from 'react';

import LoginLogo from "../../images/loginlogo.png"
import GoogleSignIn from "../../images/google.jpg"
import './homepage.styles.scss';

const HomePage = () => (
    <body>
        <div>
            <img src={LoginLogo} className="login-image"/>
            <input type="image"  src={GoogleSignIn} className="google-image"/> 
        </div>
    </body>
);

export default HomePage;