import React from 'react';

import Logo from "../../assets/logo.png"
import './choosegroup.styles.scss';

const ChooseGroup = () => (
     <div className="align-center">
        <button id="chgroup-button" className="chpbutton">Choose Group</button>
        <div><img src={Logo} className="ngti-logo"/></div>
        <p className="choose-group">Current Group:</p>
        <div className="inputvelden">
            <form>
                <input className="inputveld" type="text" id="You"/><br/>
                <input className="inputveld" type="text" id="colleague1"/><br/>
                <input className="inputveld" type="text" id="colleague2"/><br/>
                <input className="inputveld" type="text" id="colleague3"/><br/>
                <input className="inputveld" type="text" id="colleague4"/>
            </form>
        </div><br/>
        <button id="savegroup-button" className="chpbutton">Save Group</button>
        <div>
            <button id="back-button" className="chpbutton">Back</button>
            <button id="continue-button" className="chpbutton">Continue</button>
        </div>
    </div>
);

export default ChooseGroup ;