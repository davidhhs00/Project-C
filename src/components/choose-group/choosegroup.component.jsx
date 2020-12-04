import React from 'react';
import { connect } from 'react-redux';

import firebase from '../../firebase/firebase.utils'
import { auth } from '../../firebase/firebase.utils';

import Logo from "../../assets/logo.png"
import './choosegroup.styles.scss';

// Functies om users te importen en laten zien
// User List importeren
function UserList(colleagueNumber) {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("users").get()
      setUsers(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])

  return (
    <select className="inputveld" id="colleaguenumber">
      <option id="default">Select Colleague {colleagueNumber}</option>
      {users.map(user =>(
        <option key={user.displayName}>{user.displayName}</option>
      ))}
    </select>
  );
}

//Form maken voor gemaakte User Lists
const GroupForm = ({currentUser}) => (
  <div className="inputvelden">
    <form>
      <select className="inputveld">
        <option id="you">{currentUser.displayName}</option>
      </select><br/>
      {UserList(1)}<br/>
      {UserList(2)}<br/>
      {UserList(3)}<br/>
      {UserList(4)}<br/>
      <button id="savegroup-button" className="chpbutton" type="submit">Save Group</button>
    </form>
  </div>
);

//Functies die zorgen voor het laten zien van groups en het opslaan van groups
//Groups importeren
function GroupList() {
  const [groups, setGroups] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("groups").get()
      setGroups(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])

  return (
    <select id="chgroup-button" className="chpbutton">
      <option id="default">Select Group</option>
      {groups.map(group =>(
        <option key={group.groupName}>{group.groupName}</option>
      ))}
    </select>
  );
}

//OUTPUT -> Functie voor export
const ChooseGroup = (currentUser) => (
  <div className="align-center">
    {GroupList()}
    <div><img src={Logo} className="ngti-logo"/></div>
    <p className="choose-group">Current Group:</p>
    {GroupForm(currentUser)}
    <div className="align-center">
        <button id="back-button-group" className="chpbutton">Back</button>
        <button id="continue-button" className="chpbutton">Continue</button>
    </div>
  </div>
);

const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser
});

export default connect(mapStateToProps)(ChooseGroup);