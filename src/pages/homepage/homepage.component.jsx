import React from 'react';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import './homepage.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';

const HomePage = ({ currentUser }) => (
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
);


const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser
});

export default connect(mapStateToProps)(HomePage);