import React from 'react';
import { connect } from 'react-redux';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import LoginLogo from "../../assets/loginlogo.png"
import GoogleSignIn from "../../assets/google.jpg"
import './homepage.styles.scss';


//import SignIn from '../../components/sign-in/sign-in.component';

/*const HomePage = ({ currentUser }) => (
    <div className='homepage'>
        <div className='title'>Welcome To NGTI Workplace</div>
        <div className='sign-in-sign-out-block'>
        {
            currentUser ?
            (<div className='user' onClick={() => auth.signOut()}>
                <img className='avatar' alt='Avatar' src={currentUser.photoURL} />
                <div className='text'>
                    <div className='name'>{currentUser.displayName}</div>
                    <div className='email'>{currentUser.email}</div>
                </div>
            </div>)
            :
            (<SignIn />)
        }
        </div>
    </div>

const HomePage = ({ currentUser }) => (
        <div className='homepage'>
            <img alt='homepageImg' src="/images/loginlogo.png" className="login-image"/>
            <div className='sign-in-sign-out-block'>
            {
                currentUser ?
                (<div className='user' onClick={() => auth.signOut()}>
                    <img className='avatar' alt='Avatar' src={currentUser.photoURL} />
                    <div className='text'>
                        <div className='name'>{currentUser.displayName}</div>
                        <div className='email'>{currentUser.email}</div>
                    </div>
                </div>  
                )
                :
                (<input alt='google' type="image" onClick={ signInWithGoogle } src="/images/google.jpg" className="google-image"/>)
            }
            </div>*/

const HomePage = () => (
    <body>
        <div>
            <img alt='logo' src={LoginLogo} className="login-image"/>
            <input type="image"  src={GoogleSignIn} className="google-image"/> 
        </div>
    </body>
);


const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser
});

export default connect(mapStateToProps)(HomePage);