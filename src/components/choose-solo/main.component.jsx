import React, { Fragment } from "react";
import Map from '../map/map.component';
// import img from '../../images/image2.0.svg'
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import 'rsuite/dist/styles/rsuite-default.css'
import "./homepage.styles.scss";
import "react-dates/lib/css/_datepicker.css";

import CallCalendar from "./AddEvent";
import setRangeDates from './Reservation/SetRangeDates';

class MainSolo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workplace: "",
      timeslot: "",
      startDate: null,
      endDate: null,
      focused: null,
      dates: []
    };
    
    this.buttonSelected = this.buttonSelected.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onWorkplace = this.onWorkplace.bind(this);
    this.onSetTime = this.onSetTime.bind(this);
  }


  buttonSelected = (tt) => {
    this.setState({ timeslot: tt });
  };

  onWorkplace(event) {
    if (event >= 0) {
      this.setState({ workplace: event });
    }
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate }, () => {
        const startdate = (this.state.startDate) ? this.state.startDate.format('YYYY-MM-DD') : this.state.endDate.format('YYYY-MM-DD')
        const enddate =  (this.state.endDate) ? this.state.endDate.format('YYYY-MM-DD') : this.state.startDate.format('YYYY-MM-DD')
        this.setState({dates: setRangeDates({startdate, enddate})})
    })
  }

  onSetTime = (event) =>  {
    const name = event.target.name;
    const val = event.target.value;
    this.setState(prevState => {
      const {dates} = prevState;
        dates[name] = val;
        return {dates};
      }
    );
  };


  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    return (
        <div className="">
          {/* <form>
            {/* <img src={img} className="img"></img> */}
            {/* <ul>
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
                <a href="/choosegroup">Choose group</a>
              </li>
            </ul> */} 
            <h2 className="welcome">Select Workplace:</h2>
            <input
              className="buttons"
              type="number"
              value={this.state.workplace}
              onChange={this.onWorkplace}
            />
            <br />
            <h2 className="welcome">Select Dates:</h2>
            <div className="dateButtons">
              <DateRangePicker
                daySize={40}
                // customInputIcon={<TestCustomInputIcon />}
                startDateId="startDate"
                endDateId="endDate"
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.focused}
                onFocusChange={focusedInput => this.setState({ focused: focusedInput})}
                numberOfMonths={1}
              />
  {
                Object.entries(this.state.dates).map((key) => (
                  <div>
                  <h3 className="welcome">{key[0]}</h3>
                  <select
                    className="timeslot"
                    type="select"
                    key={key}
                    name={key[0]}
                    value={key[1]}
                    onChange={this.onSetTime}
                  >
                    <option value="09:00-13:00">09:00-13:00</option>
                    <option value="09:00-17:00">09:00-17:00</option>
                    <option value="13:00-17:00">13:00-17:00</option>
                  </select>
                  </div>
              ))}
            </div>
            <br />
          <CallCalendar userInfo={this.state} />
          <button
            onClick={(event) => (window.location.href = "/home")}
            className="backBtn"
            type="button">
            Back
          </button>
        </div>
    );
  }
}

export default MainSolo;
