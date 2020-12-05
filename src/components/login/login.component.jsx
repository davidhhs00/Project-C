import React from 'react';


import LoginLogo from "../../assets/loginlogo.png"
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';

import './login.styles.scss';


const HomePage = () => (
    <body>
        <div>
            <img src={LoginLogo} className="login-image"/>
            <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn className="google-button">Sign in with Google</CustomButton>
        </div>
    </body>
);


export default (HomePage);