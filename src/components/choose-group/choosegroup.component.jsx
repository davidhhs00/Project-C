import React from "react";

import Logo from "../../assets/logo.png";
import "./choosegroup.styles.scss";

const ChooseGroup = () => (
  <div className="main">
    <div className="align-center">
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/yourbookings">Your bookings</a>
        </li>
        <li>
          <a href="/allbookings">All bookings</a>
        </li>
        <li>
          <a href="/choosesolo">Choose solo</a>
        </li>
      </ul>
      <button id="chgroup-button" className="chpbutton">
        Choose Group
      </button>
      <p className="choose-group">Current Group:</p>
      <div className="inputvelden">
        <form>
          <input className="inputveld" type="text" id="You" />
          <br />
          <input className="inputveld" type="text" id="colleague1" />
          <br />
          <input className="inputveld" type="text" id="colleague2" />
          <br />
          <input className="inputveld" type="text" id="colleague3" />
          <br />
          <input className="inputveld" type="text" id="colleague4" />
        </form>
      </div>
      <button id="savegroup-button" className="chpbutton">
        Save Group
      </button>
      <div className="align-center">
        <button id="back-button-group" className="chpbutton">
          Back
        </button>
        <button id="continue-button" className="chpbutton">
          Continue
        </button>
      </div>
    </div>
  </div>
);

export default ChooseGroup;
