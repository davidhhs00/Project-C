import React from 'react';

import LoginLogo from "../../assets/loginlogo.png";

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './login.styles.scss';


const HomePage = () => (
    <body>
        <div>
            <img src={LoginLogo} className="login-image" alt="login-logo" />
            <button onClick={signInWithGoogle} className="google-button">Login met Google</button>
        </div>
    </body>
);


export default (HomePage);