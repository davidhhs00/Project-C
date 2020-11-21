import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends React.Component {

    render() {
        return (
            <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
        )
    }
}

export default SignIn;