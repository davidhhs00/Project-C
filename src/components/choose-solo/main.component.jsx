import React from "react";
import { DateRangePicker } from "react-dates";
import Map from '../map/map.component';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import "./homepage.styles.scss";
import Message from './DisplayMessage/displayMessage.component';

import SetReservation from "./AddEvent";
import setRangeDates from './Reservation/SetRangeDates';
import SetTimeslot from './TimeSlot/timeslot.component';


class MainSolo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        workplace: "",
        startDate: null,
        endDate: null,
        focused: false,
        dates: {},
        filled: true
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
        <div>
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
            <div className='main'>
            <Map className='map' workplace={this.onWorkplace}/>
            <h2 className="welcome">Select Workplace:</h2>
            <input
              className="buttons"
              type="number"
              value={this.state.workplace}
              onChange={this.onWorkplace}
            />
            </div>
            <div className="dateButtons">
            <h2 className="welcome">Select Dates:</h2>
            <DateRangePicker
              startDateId="startDate"
              endDateId="endDate"
              startDate={this.state.startDate ? this.state.startDate : this.state.endDate}
              endDate={this.state.endDate ? this.state.endDate: this.state.startDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.focused}
              onFocusChange={focusedInput => this.setState({ focused: focusedInput})}
              numberOfMonths={1}
              withPortal={window.matchMedia("(max-width: 400px").matches}
              enableOutsideDays
              noBorder
              autoFocus
              daySize={56}
            />
            </div>
            <SetTimeslot onSetTime={this.onSetTime} dates={this.state.dates}/>
              <br />
            <div className="lowerBtn">
                <SetReservation userInfo={this.state} />
                <button
                  onClick={(event) => (window.location.href = "/home")}
                  className="backBtn"
                  type="button">
                  Back
                </button>
            </div>
        </div>
    );
  }
}

export default MainSolo;
