import React from 'react';

import './notification.styles.scss';

const notification = (props) => (
    <div className="box">
        <h1 className="title">{props.title}</h1>
        <p className="break"></p>
        <h2 className="message">{props.msg}</h2>
        <button className="btn accept">{props.accept}</button>
        <button className="btn deny">{props.deny}</button>
    </div>
);

export default notification;