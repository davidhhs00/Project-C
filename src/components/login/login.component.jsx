import React from 'react';

// Import visuele aspecten, inlogbutton en google signIn functie
import LoginLogo from "../../assets/loginlogo.png"
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';

import './login.styles.scss';

//Inlogpagina met google sign in button
const HomePage = () => (
    <div>
        <img src={LoginLogo} className="login-image"/>
        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn className="google-button">Sign in with Google</CustomButton>
    </div>
);


export default (HomePage);