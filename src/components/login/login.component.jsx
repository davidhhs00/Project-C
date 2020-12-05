import React from 'react';


import LoginLogo from "../../assets/loginlogo.png"
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';

import './login.styles.scss';


const HomePage = () => (
    <div>
        <img alt="logo" src={LoginLogo} className="login-image"/>
        <CustomButton className="custom-button google-button google-sign-in" onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
    </div>
);


export default (HomePage);