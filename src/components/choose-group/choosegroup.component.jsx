import React from 'react';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import Logo from "../../assets/logo.png"
import './choosegroup.styles.scss';

/*
https://firebase.google.com/docs/auth/admin/manage-users#node.js_3
https://firebase.google.com/docs/admin/setup#node.js

Voorbeeld code om alle users in een database te krijgen.


admin.auth().getUsers([
    { uid: 'uid1' },
    { email: 'user2@example.com' },
    { phoneNumber: '+15555550003' },
    { providerId: 'google.com', providerUid: 'google_uid4' },
  ])
  .then(function(getUsersResult) {
    console.log('Successfully fetched user data:');
    getUsersResult.users.forEach((userRecord) => {
      console.log(userRecord);
    });

    console.log('Unable to find users corresponding to these identifiers:');
    getUsersResult.notFound.forEach((userIdentifier) => {
      console.log(userIdentifier);
    });
  })
  .catch(function(error) {
    console.log('Error fetching user data:', error);
  });
*/
const UserList = () => (
    <option id="1">Hello World</option>
);

const ChooseGroup = ({currentUser}) => (
     <div className="align-center">
        <button id="chgroup-button" className="chpbutton">Choose Group</button>
        <div><img src={Logo} className="ngti-logo"/></div>
        <p className="choose-group">Current Group:</p>
        <div className="inputvelden">
            <form>
                <select className="inputveld" id="You">
                    <option value="You">{currentUser.displayName}</option>
                </select><br/>
                <select className="inputveld" id="colleague1"> {UserList()} </select><br/>
                <select className="inputveld" id="colleague2"> {UserList()} </select><br/>
                <select className="inputveld" id="colleague3"> {UserList()} </select><br/>
                <select className="inputveld" id="colleague4"> {UserList()} </select>
            </form>
        </div>
        <button id="savegroup-button" className="chpbutton">Save Group</button>
        <div className="align-center">
            <button id="back-button-group" className="chpbutton">Back</button>
            <button id="continue-button" className="chpbutton">Continue</button>
        </div>
    </div>
);

//<input className="inputveld" type="text" id="You">{currentUser.displayName}</input><br/>
//<input className="inputveld" type="text" id="colleague1"/><br/>


const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser
});

export default connect(mapStateToProps)(ChooseGroup);