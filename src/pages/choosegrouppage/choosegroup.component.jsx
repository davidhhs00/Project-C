import React from 'react';

import Logo from "../../images/logo.png"
import './choosegroup.styles.scss';

const ChooseGroupPage = () => (
     <div>
        <button><p>Choose Group</p></button>
        <p>Current Group:</p>
        <img src={Logo}/>
        <form>
            <input type="text" id="colleague1"/><br/>
            <input type="text" id="colleague2"/><br/>
            <input type="text" id="colleague3"/><br/>
            <input type="text" id="colleague4"/>
        </form>
        <button><p>Save Group</p></button>
        <button><p>Back</p></button>
        <button><p>Continue</p></button>
    </div>
);

export default ChooseGroupPage ;