import React from 'react';

import Logo from "../../assets/logo.png"
import './choosegroup.styles.scss';

const ChooseGroup = () => (
     <div>
        <div className="chgroup-button"><button>Choose Group</button></div>
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
        <button className="savegroup-button">Save Group</button>
        <div>
            <button className="back-button">Back</button>
            <button className="continue-button">Continue</button>
        </div>
    </div>
);

export default ChooseGroup ;