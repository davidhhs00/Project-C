import React from 'react';
import '../../firebase/firebase.utils'
import { sendNotificationReply } from '../../firebase/firebase.utils';

import './notification.styles.scss';

// Check for notifications status code then output the correct notification layout

const notification = ({ notification, action }) => (
    <div className="box">
        <h1 className="title">{notification[0].notification.title}</h1>
        <p className="break"></p>
        <h2 className="message">{notification[0].notification.message}</h2>
        <button onClick={() => {sendNotificationReply(notification[0].id, notification[0].notification.answer1); action(notification[0].receiverID)}} className="btn accept">{notification[0].notification.answer1}</button>
        <button onClick={() => {sendNotificationReply(notification[0].id, notification[0].notification.answer2); action(notification[0].receiverID)}} className="btn deny">{notification[0].notification.answer2}</button>
    </div>
);

export default notification;