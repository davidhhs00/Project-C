import React from 'react'
import firebase from 'firebase/app'
// import "firebase/au"

function App() {

    var gapi = window.gapi
    var CLIENT_ID = "136668696517-c7tkaavvpb5f5d6kcvm3rfnmb7tbakp9.apps.googleusercontent.com"
    var API_KEY = "AIzaSyAo3hCE15xOBP2AdrLdA3UzgPPoFTr1Hf0"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

    // const config = {
    //     apiKey: "API_KEY",
    //     projectId: "PROJECT_ID",
    //     databaseURL: "DATABASE_URL",
    //     authDomain: "AUTH_DOMAIN",
    //     storageBucket: "STORAGE_BUCKET",
    //     messagingSenderId: "MESSAGING_SENDER_ID"
    //   };
 
    const handleClick = () => {
        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })
            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signIn()
            .then(() => {
              var event = {
                'summary': 'Google I/O 2015',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'A chance to hear more about Google\'s developer products.',
                'start': {
                  'dateTime': '2015-05-28T09:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'end': {
                  'dateTime': '2015-05-28T17:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                  {'email': 'lpage@example.com'},
                  {'email': 'sbrin@example.com'}
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

            request.execute(event => {
                window.open(event.htmlLink)
            })
            })
        })
    }

    return (
        <div className="App">
            <script src="https://apis.google.com/js/api.js"></script>
            <p>
                Edit <code>src/AddEvent.js</code> and save the reload
            </p>
            <button onClick={handleClick}>Add event</button>
        </div>
    )
}

export default App;