import React from 'react';
import '../../firebase/firebase.utils'
import { sendNotificationReply } from '../../firebase/firebase.utils';
import { auth } from '../../firebase/firebase.utils';
import { useState } from 'react';

import './notification.styles.scss';

// Check for notifications status code then output the correct notification layout

const Notification = ({ notification, action }) => {
    var gapi = window.gapi
    var CLIENT_ID = "899935600703-gqi84kbl6j9lqme8u2m3hh1e97j54h4o.apps.googleusercontent.com"
    var API_KEY = "AIzaSyDpfFHATPm9yV3eTwP5iOGfpy4bb1swoOw"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar";

    const handleClickSolo = (body) => {
        console.log(body);
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
            const dates = body.dates;
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
          })
        }
      )
    }

    return (
        <div className="box">
            <h1 className="title">{notification[0].notification.title}</h1>
            <p className="break"></p>
            <h2 className="message">{notification[0].notification.message}</h2>
            <button onClick={() => {
                if (notification[0].notification.code === 200) {
                    handleClickSolo(notification[0].notification.body);
                    sendNotificationReply(notification[0].id, notification[0].notification.answer1);
                }  else {
                    sendNotificationReply(notification[0].id, notification[0].notification.answer1);
                }
                action(notification[0].receiverID);
            }} 
            className="btn accept">{notification[0].notification.answer1}</button>
            <button onClick={() => {sendNotificationReply(notification[0].id, notification[0].notification.answer2); action(notification[0].receiverID)}} className="btn deny">{notification[0].notification.answer2}</button>
        </div>
    )
};

export default Notification;