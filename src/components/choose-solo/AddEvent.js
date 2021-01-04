import React from 'react';
import './homepage.styles.scss';
import {auth} from '../../firebase/firebase.utils';

import Reserve from './Reservation/Reserve';
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
      props.userInfo.filled = checkState(props.userInfo)
      if(!props.userInfo.filled)
      {
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
      )}

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

  const handleChange = (e) => {
    var eArray = e.split(",")
    console.log(eArray)
    setColleague1(eArray[0])
    setColleague2(eArray[1])
    setColleague3(eArray[2])
    setColleague4(eArray[3])
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

  return (
    <div>
      <div className="align-center">
        <select id="chgroup-button" className="chpbutton" onChange={(e) => handleChange(e.target.value)}>
          <option id="default" defaultValue value={["","","",""]}>{props.currentUser.displayName}</option>
          {groups.map((group, index) =>{
            return group.groupOwner === props.currentUser.email ?
              <option key={group.groupName} value={[group.colleague1, group.colleague2, group.colleague3, group.colleague4]}>{group.groupName}</option>
            :
              null
          })}
          
        </select>
      </div>
        <button className="submitBtn"onClick={handleClick}>Submit</button>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(CallCalendar);
