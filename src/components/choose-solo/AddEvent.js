import React from 'react';
import './homepage.styles.scss';
import {auth} from '../../firebase/firebase.utils';

import Reserve from './Reservation/Reserve';
import ReserveGroup from './Reservation/ReserveGroup';
import checkState from './checkState';

import { connect } from 'react-redux';
import { useState } from 'react';

import firebase from '../../firebase/firebase.utils';


const CallCalendar = (props) => {
  var gapi = window.gapi
  var CLIENT_ID = "899935600703-gqi84kbl6j9lqme8u2m3hh1e97j54h4o.apps.googleusercontent.com" //add firebase au
  var API_KEY = "AIzaSyDpfFHATPm9yV3eTwP5iOGfpy4bb1swoOw"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar";

  const handleClick = () => {
    console.log(props)
    if(props.userInfo.workplace === 0 || props.userInfo.workplace === ""){
      alert("Please choose a workplace")
    } else {
      if (groupName != "") {
        handleClickGroup()
      } else {
        handleClickSolo()
      }
    }
  }

  const handleClickGroup = () => {
      props.userInfo.filled = checkState(props.userInfo)
      if(!props.userInfo.filled)
      {
        alert("Please choose a date")
        return;
      }
      gapi.load('client:auth2', () => {
          console.log('loaded client')
          window.gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES,
          })
          gapi.client.load('calendar', 'v3', () => console.log('loaded calendar!'))

          var batch = gapi.client.newBatch();
          var l = [];
          const dates = props.userInfo.dates;
          gapi.auth2.getAuthInstance().signIn().then(() => {
            Object.entries(dates).map(async (key, i) => {
              let startDate = new Date(key[0].split(' ')[1])
              let endDate = new Date(key[0].split(' ')[1])
              startDate.setHours(key[1].split('-')[0].split(':')[0],key[1].split('-')[0].split(':')[1])
              endDate.setHours(key[1].split('-')[1].split(':')[0],key[1].split('-')[0].split(':')[1])
              var event = {
                'summary': `reservations ${groupName} ${auth.currentUser.displayName} ${colleague1} ${colleague2} ${colleague3} ${colleague4}`,
                'location': 'Central Post, 10de verdieping Delftseplein 30K, 3013AA Rotterdam',
                'description': '',
                'start': {
                  'dateTime': (startDate.toISOString()), //Needs to be ISO
                  'timeZone': 'Europe/Amsterdam'
                },
                'end': {
                  'dateTime': (endDate.toISOString()),
                  'timeZone': 'Europe/Amsterdam'
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=1'
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                  ]
                }
              };
              l.push(event);
            })
            
            l.map((r, j) => {
              batch.add(gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': l[j],
              }))
            })
          batch.then(function() {
            console.log("Done");

            var newArr = [colleague1, colleague2, colleague3, colleague4];
            props.action(newArr);
          })
          ReserveGroup(props.userInfo, groupName ,colleague1 ,colleague2 ,colleague3 ,colleague4, cName1, cName2, cName3, cName4).then(v => {
            if(v){
              window.location.href = "/home"
            } else {
              console.log("error")
            }
          })
        })
      }
    )
  }

  const handleClickSolo = () => {
      props.userInfo.filled = checkState(props.userInfo)
      if(!props.userInfo.filled)
      {
        alert("Please choose a date")
        return;
      }
      gapi.load('client:auth2', () => {
          console.log('loaded client')
          window.gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES,
          })
          gapi.client.load('calendar', 'v3', () => console.log('loaded calendar!'))

          var batch = gapi.client.newBatch();
          var l = [];
          const dates = props.userInfo.dates;
          gapi.auth2.getAuthInstance().signIn().then(() => {
            Object.entries(dates).map(async (key, i) => {
              let startDate = new Date(key[0].split(' ')[1])
              let endDate = new Date(key[0].split(' ')[1])
              startDate.setHours(key[1].split('-')[0].split(':')[0],key[1].split('-')[0].split(':')[1])
              endDate.setHours(key[1].split('-')[1].split(':')[0],key[1].split('-')[0].split(':')[1])
              var event = {
                'summary': `reservations ${auth.currentUser.displayName}`,
                'location': 'Central Post, 10de verdieping Delftseplein 30K, 3013AA Rotterdam',
                'description': '',
                'start': {
                  'dateTime': (startDate.toISOString()), //Needs to be ISO
                  'timeZone': 'Europe/Amsterdam'
                },
                'end': {
                  'dateTime': (endDate.toISOString()),
                  'timeZone': 'Europe/Amsterdam'
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=1'
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                  ]
                }
              };
              l.push(event);
            })
            
            l.map((r, j) => {
              batch.add(gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': l[j],
              }))
            })
          batch.then(function() {
            console.log("Done");
          })
          Reserve(props.userInfo).then(v => {
            if(v){
              window.location.href = "/home"
            } else {
              console.log("error")
            }
          })
        })
      }
    )
  }
  
  //Patryk
  const [groups, setGroups] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("groups").get()
      setGroups(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])

  // Emails en Namen van collega's setten.
  const handleChange = (e) => {
    var eArray = e.split(",")

    var amountOfUSers = 0;

    eArray.forEach(e => {
      if (e !== "") amountOfUSers += 1;
    });
    if (amountOfUSers === 0) amountOfUSers = 1;
    props.actionTwo(amountOfUSers);

    setgroupName(eArray[0])
    setColleague1(eArray[1])
    setColleague2(eArray[2])
    setColleague3(eArray[3])
    setColleague4(eArray[4])


    for(var i = 0; i < users.length; i++){
      if (eArray[1] === users[i].email){
        setCName1(users[i].displayName)
      }
      if (eArray[2] === users[i].email){
        setCName2(users[i].displayName)
      }
      if (eArray[3] === users[i].email){
        setCName3(users[i].displayName)
      }
      if (eArray[4] === users[i].email){
        setCName4(users[i].displayName)
      }
    }
  }
  // Groups importeren

  // Group Form setup
  const [groupName, setgroupName] = useState("");
  const [groupOwner] = useState(props.currentUser);
  const [colleague1, setColleague1] = useState("");
  const [colleague2, setColleague2] = useState("");
  const [colleague3, setColleague3] = useState("");
  const [colleague4, setColleague4] = useState("");
  // Group Form setup

  // User list Importeren
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("users").get()
      setUsers(data.docs.map(doc => doc.data()))
    }
    fetchData()
  }, [])

  // Namen van collega's verkrijgen uit database
  const [cName1, setCName1] = useState("");
  const [cName2, setCName2] = useState("");
  const [cName3, setCName3] = useState("");
  const [cName4, setCName4] = useState("");

  return (
    <div>
      <div >
        <select className="choose-solo-button" onChange={(e) => handleChange(e.target.value)}>
          <option id="default"  defaultValue value={["","","","",""]}>{props.currentUser.displayName}</option>
          {groups.map((group, index) =>{
            return group.groupOwner === props.currentUser.email ?
              <option key={group.groupName} value={[group.groupName,group.colleague1, group.colleague2, group.colleague3, group.colleague4]}>{group.groupName}</option>
            :
              null
          })}
          
        </select>
      </div>
      <div className="choose-solo-center-buttons">
        <button className="choose-solo-button" id="choose-solo-back-btn" onClick={(event) => (window.location.href = "/home")}type="button">Back</button>
        <button className="choose-solo-button" id="choose-solo-submit-btn" onClick={handleClick}>Submit</button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(CallCalendar);
