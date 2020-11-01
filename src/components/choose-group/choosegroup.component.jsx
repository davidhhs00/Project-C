import React from 'react';

import Logo from "../../assets/logo.png"
import './choosegroup.styles.scss';

const ChooseGroup = () => (
     <div>
        <button id="chgroup-button" className="button">Choose Group</button>
        <div><img src={Logo} className="ngti-logo"/></div>
        <p className="choose-group">Current Group:</p>
        <div className="inputvelden">
            <form>
                <input type="text" id="You"/><br/>
                <input type="text" id="colleague1"/><br/>
                <input type="text" id="colleague2"/><br/>
                <input type="text" id="colleague3"/><br/>
                <input type="text" id="colleague4"/>
            </form>
        </div><br/>
        <button id="savegroup-button" className="button">Save Group</button>
        <div>
            <button id="back-button" className="button">Back</button>
            <button onClick={event =>  window.location.href='/endgroup'} id="continue-button" className="button">Continue</button>
        </div>
    </div>
);

export default ChooseGroup ;