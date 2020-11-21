import React from 'react';

import './end-group.styles.scss';
import Logo from '../../assets/logo.png';

const End_Group = () => (
    <div>
        <img src={Logo} alt='ngti' className="image"/>
        <h2 className="succes">Group workplaces have been booked!</h2>
        <h2 className="workplaces">Workplaces:</h2>
        <h2 className="workplace-name">#WORKPLACES_NAMES</h2>
        <h2 className="from">From:</h2>
        <h2 className="start-date">#START_DATE</h2>
        <h2 className="till">Till:</h2>
        <h2 className="end-date">#END_DATE</h2>
        <h2 className='noti'>Thank you for notifying us!</h2>
    </div>
);

export default End_Group;