import React from 'react'
import './homepage.styles.scss'
import 'firebase/auth'
import Reserve from './Reservation/Reserve'

//TODO: Add error handling when a field isn't specified.

const CallCalendar = (props) => {
  var gapi = window.gapi
  var CLIENT_ID = "899935600703-gqi84kbl6j9lqme8u2m3hh1e97j54h4o.apps.googleusercontent.com" //add firebase au
  var API_KEY = "AIzaSyDpfFHATPm9yV3eTwP5iOGfpy4bb1swoOw"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar";


  const handleClick = () => {
      gapi.load('client:auth2', () => {
          console.log('loaded client')
      
          window.gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES,
          })
         
          gapi.client.load('calendar', 'v3', () => console.log('loaded calendar!'))

          var auth2 = gapi.auth2.getAuthInstance().signIn()
          .then(() => {
            var event = {
              'summary': 'Reservation',
              'location': 'Central Post, 10de verdieping Delftseplein 30K, 3013AA Rotterdam',
              'description': '',
              'start': {
                'dateTime': (props.userInfo.startDate) ? props.userInfo.startDate: props.userInfo.endDate,
                'timeZone': 'Europe/Amsterdam'
              },
              'end': {
                'dateTime': (props.userInfo.endDate) ? props.userInfo.endDate : props.userInfo.startDate,
                'timeZone': 'Europe/Amsterdam'
              },
              'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
              ],
              'reminders': {
                'useDefault': false,
                'overrides': [
                  {'method': 'email', 'minutes': 24 * 60},
                  {'method': 'popup', 'minutes': 10}
                ]
              }
            };
          
          var request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': event,
          })

          Reserve(props.userInfo)

          request.execute(event => {
              window.open(event.htmlLink)
          })
          })
      })
  }

  return (
      <div className="App">
          <script src="https://apis.google.com/js/api.js"></script>
          <button className="submitBtn"onClick={handleClick}>Submit</button>
      </div>
  )
}

export default CallCalendar;
