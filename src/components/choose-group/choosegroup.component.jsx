import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';

import firebase from '../../firebase/firebase.utils';

import Logo from "../../assets/logo.png";
import "./choosegroup.styles.scss";


//Group Form maken voor import en userlist importeren
const ChooseGroup = ({currentUser}) => {
  // Groups importeren
  const [groups, setGroups] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("groups").get()
      setGroups(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    var eArray = e.split(",")
    setColleague1(eArray[0])
    setColleague2(eArray[1])
    setColleague3(eArray[2])
    setColleague4(eArray[3])
  }
  // Groups importeren

  // Group Form setup
  const [groupName, setgroupName] = useState("");
  const [groupOwner] = useState(currentUser.email);
  const [colleague1, setColleague1] = useState("");
  const [colleague2, setColleague2] = useState("");
  const [colleague3, setColleague3] = useState("");
  const [colleague4, setColleague4] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = firebase.firestore()

    if (groupName === "") {
      alert("Please Give your group a name");
    } else {
      db.collection("groups").add({
        groupName: groupName,
        groupOwner: groupOwner,
        colleague1: colleague1,
        colleague2: colleague2,
        colleague3: colleague3,
        colleague4: colleague4,
      })
    }
  };
  // Group Form setup

  // Userlist Importeren
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("users").get()
      setUsers(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])
  // Userlist Importeren

  return (
  <div className="align-center">

    <select id="chgroup-button" className="chpbutton" onChange={(e) => handleChange(e.target.value)}>
      <option id="default" defaultValue value={["","","",""]}>Select Group</option>
      {groups.map((group, index) =>{
        return group.groupOwner === currentUser.email ?
          <option key={group.groupName} value={[group.colleague1, group.colleague2, group.colleague3, group.colleague4]}>{group.groupName}</option>
        :
          null
      })}
    </select>

    <div><img src={Logo} className="ngti-logo" alt="ngti-logo"/></div>
    <p className="choose-group">Current Group:</p>

    <div className="inputvelden">
      <form onSubmit={handleSubmit}>

        <select className="inputveld">
          <option id="you">{currentUser.displayName}</option>
        </select><br/>

        {/*Collegues*/}
        <select className="inputveld" id="colleaguenumber1" value={colleague1} onChange={(e) => setColleague1(e.target.value)}>
          <option id="default" defaultValue value="">Select Colleague 1</option>
          {users.map(user =>{
          return user.displayName !== currentUser.displayName ?
            <option key={user.email} value={user.email}>{user.displayName}</option>
          :
            null
          })}
        </select><br/>

        <select className="inputveld" id="colleaguenumber2" value={colleague2} onChange={(e) => setColleague2(e.target.value)}>
          <option id="default" defaultValue value="">Select Colleague 2</option>
          {users.map(user =>{
          return user.displayName !== currentUser.displayName ?
            <option key={user.email} value={user.email}>{user.displayName}</option>
          :
            null
          })}
        </select><br/>

        <select className="inputveld" id="colleaguenumber3" value={colleague3} onChange={(e) => setColleague3(e.target.value)}>
          <option id="default" defaultValue value="">Select Colleague 3</option>
          {users.map(user =>{
          return user.displayName !== currentUser.displayName ?
            <option key={user.email} value={user.email}>{user.displayName}</option>
          :
            null
          })}
        </select><br/>

        <select className="inputveld" id="colleaguenumber4" value={colleague4} onChange={(e) => setColleague4(e.target.value)}>
          <option id="default" defaultValue value="">Select Colleague 4</option>
          {users.map(user =>{
          return user.displayName !== currentUser.displayName ?
            <option key={user.email} value={user.email}>{user.displayName}</option>
          :
            null
          })}
        </select><br/>
        {/*Collegues*/}

        <input className="groupname-input" placeholder="Group Name" value={groupName} onChange={(e) => setgroupName(e.target.value)}/><br />
        
        <button className="chpbutton" id="savegroup-button"  type="submit">Save Group</button>

      </form>
    </div>
    <button className="chpbutton" id="chback-button" onClick={event => window.location.href='/home'} type="button">Back</button>
    <button className="chpbutton" id="chcontinue-button" onClick={event => window.location.href='/choosesolo'} type="button">Continue</button>
  </div>
  )
};

//OUTPUT -> Functie voor export
/*
const ChooseGroup = (currentUser) => (
  <div className="align-center">
    {GroupForm(currentUser)}
    <button className="chpbutton" id="chback-button" onClick={event => window.location.href='/home'} type="button">Back</button>
    <button className="chpbutton" id="chcontinue-button" onClick={event => changeScreen()} type="button">Continue</button>
  </div>
);
*/

const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser
});

export default connect(mapStateToProps)(ChooseGroup);
