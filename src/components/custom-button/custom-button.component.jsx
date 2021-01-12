import React from 'react';

import './custom-button.styles.scss';

//Custom button die zorgt dat je kan inloggen op het inlogscherm
const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
    <button className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
        {children}    
    </button>
);

export default CustomButton;