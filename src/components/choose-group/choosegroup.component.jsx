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
      setGroups(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    var eArray = e.split(",")
    setgroupName(eArray[0])
    setColleague1(eArray[1])
    setColleague2(eArray[2])
    setColleague3(eArray[3])
    setColleague4(eArray[4])
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
    } else if (ifExists()){
      alert("Your group has been updated")
    } else {
      alert("Adding group to database")
      db.collection("groups").doc(`${groupOwner}_${groupName}`).set({
        groupName: groupName,
        groupOwner: groupOwner,
        colleague1: colleague1,
        colleague2: colleague2,
        colleague3: colleague3,
        colleague4: colleague4,
      })
      .then(() => {window.location.href='/choosegroup'});
    }
    
  };
  // Group Form setup

  const ifExists = () => {
    for (var i = 0; i < groups.length; i++){
      if (groupName === groups[i].groupName && groupOwner === groups[i].groupOwner){
        const db = firebase.firestore()
        db.collection("groups").doc(`${groupOwner}_${groupName}`).set({
          groupName: groupName,
          groupOwner: groupOwner,
          colleague1: colleague1,
          colleague2: colleague2,
          colleague3: colleague3,
          colleague4: colleague4,
        })
        return true
      }
    }
    return false
  }

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

  /////////////////////////////////
  //Checking INPUT BEGIN
  ////////////////////////////////
  const CheckSubmit = () => {
    if (colleague1 === "" && colleague2 === "" && colleague3 === "" && colleague4 === ""){
      return <button className="chpbutton-gray" id="savegroup-button"  type="button">Save Group</button>
    }else if (groupName === ""){
      return <button className="chpbutton-gray" id="savegroup-button"  type="button">Save Group</button>
    }else if ((colleague1 !== "" && colleague2 !== "" && colleague1 === colleague2)||
               (colleague1 !== "" && colleague3 !== "" && colleague1 === colleague3)||
               (colleague1 !== "" && colleague4 !== "" && colleague1 === colleague4)||
               (colleague2 !== "" && colleague3 !== "" && colleague2 === colleague3)||
               (colleague2 !== "" && colleague4 !== "" && colleague2 === colleague4)||
               (colleague3 !== "" && colleague4 !== "" && colleague3 === colleague4)){
      return <button className="chpbutton-gray" id="savegroup-button"  type="button">Save Group</button>
    } else {
      return <button className="chpbutton" id="savegroup-button"  type="submit">Save Group</button>
    }
  }
  
  const Input1 = () => {
    var classCSS = ""
    if ((colleague1 !== "" && colleague2 !== "" && colleague1 === colleague2)||
        (colleague1 !== "" && colleague3 !== "" && colleague1 === colleague3)||
        (colleague1 !== "" && colleague4 !== "" && colleague1 === colleague4)) {
      classCSS = "inputveld-red"
    } else {
      classCSS = "inputveld"
    }

    return(
      <select className={classCSS} id="colleaguenumber1" value={colleague1} onChange={(e) => setColleague1(e.target.value)}>
        <option id="default" defaultValue value="">Select Colleague 1</option>
        {users.map(user =>{
        return user.email !== currentUser.email ?
          <option key={user.email} value={user.email}>{user.displayName}</option>
        :
          null
        })}
      </select>
    )
  }

  const Input2 = () => {
    var classCSS = ""
    if ((colleague2 !== "" && colleague1 !== "" && colleague2 === colleague1)||
        (colleague2 !== "" && colleague3 !== "" && colleague2 === colleague3)||
        (colleague2 !== "" && colleague4 !== "" && colleague2 === colleague4)) {
      classCSS = "inputveld-red"
    } else {
      classCSS = "inputveld"
    }

    return(
      <select className={classCSS} id="colleaguenumber2" value={colleague2} onChange={(e) => setColleague2(e.target.value)}>
        <option id="default" defaultValue value="">Select Colleague 2</option>
        {users.map(user =>{
        return user.email !== currentUser.email ?
          <option key={user.email} value={user.email}>{user.displayName}</option>
        :
          null
        })}
      </select>
    )
  }

  const Input3 = () => {
    var classCSS = ""
    if ((colleague3 !== "" && colleague2 !== "" && colleague3 === colleague1)||
        (colleague3 !== "" && colleague3 !== "" && colleague3 === colleague2)||
        (colleague3 !== "" && colleague4 !== "" && colleague3 === colleague4)) {
      classCSS = "inputveld-red"
    } else {
      classCSS = "inputveld"
    }

    return(
      <select className={classCSS} id="colleaguenumber3" value={colleague3} onChange={(e) => setColleague3(e.target.value)}>
        <option id="default" defaultValue value="">Select Colleague 3</option>
        {users.map(user =>{
        return user.email !== currentUser.email ?
          <option key={user.email} value={user.email}>{user.displayName}</option>
        :
          null
        })}
      </select>
    )
  }

  const Input4 = () => {
    var classCSS = ""
    if ((colleague4 !== "" && colleague1 !== "" && colleague4 === colleague1)||
        (colleague4 !== "" && colleague2 !== "" && colleague4 === colleague2)||
        (colleague4 !== "" && colleague3 !== "" && colleague4 === colleague3)) {
      classCSS = "inputveld-red"
    } else {
      classCSS = "inputveld"
    }

    return(
      <select className={classCSS} id="colleaguenumber4" value={colleague4} onChange={(e) => setColleague4(e.target.value)}>
        <option id="default" defaultValue value="">Select Colleague 4</option>
        {users.map(user =>{
        return user.email !== currentUser.email ?
          <option key={user.email} value={user.email}>{user.displayName}</option>
        :
          null
        })}
      </select>
    )
  }
  /////////////////////////////////
  //Checking INPUT END
  ////////////////////////////////
  return (
  <div className="align-center">
    <select id="chgroup-button" className="chpbutton" onChange={(e) => handleChange(e.target.value)}>
      <option id="default" defaultValue value={["","","",""]} className="option-opmaak">Select Group</option>
      {groups.map((group, index) =>{
        return group.groupOwner === currentUser.email ?
          <option key={group.groupName} value={[group.groupName,group.colleague1, group.colleague2, group.colleague3, group.colleague4]} className="option-opmaak">{group.groupName}</option>
        :
          null
      })}
    </select>
    <img src={Logo} className="ngti-logo" alt="ngti-logo"/>

    <p className="choose-group">Current Group:</p>

    <div className="inputvelden">
      <form onSubmit={handleSubmit}>

        <select className="inputveld">
          <option id="you">{currentUser.displayName}</option>
        </select><br/>

        {/*Collegues*/}
        {Input1()}<br/>
        {Input2()}<br/>
        {Input3()}<br/>
        {Input4()}<br/>

        <input className="groupname-input" placeholder="Group Name" value={groupName} onChange={(e) => setgroupName(e.target.value)}/><br />
        
        <div id="savegroup-div">
          {CheckSubmit()}
        </div>
      </form>
    </div>
    <button className="chpbutton" id="chback-button" onClick={event => window.location.href='/home'} type="button">Back</button>
    <button className="chpbutton" id="chcontinue-button" onClick={event => window.location.href='/choosesolo'} type="button">Go Book!</button>
  </div>
  )
};

const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser
});

export default connect(mapStateToProps)(ChooseGroup);
