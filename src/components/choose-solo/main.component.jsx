import React from "react";
import { DateRangePicker } from "react-dates";
import Map from '../map/map.component';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./homepage.styles.scss";

import CallCalendar from "./AddEvent";
import setRangeDates from './Reservation/SetRangeDates';

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
        <div className="main">
            <Map className='map' workplace={this.onWorkplace}/>
            <div>
              <p className="choose-solo-text">Selected Workplace:</p>
              <input className="choose-solo-button" type="number" value={this.state.workplace} onChange={this.onWorkplace}/>
              <div>
                <p className="choose-solo-text">Select Dates:</p>
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

              {Object.entries(this.state.dates).map((key, i) => (
                <div key={i}>
                  <p className="choose-solo-text">{key[0].split(' ')[0]}</p>
                  
                  <select className="choose-solo-button" type="select" key={key} name={key[0]} value={key[1]} onChange={this.onSetTime}>
                    <option value="8:30-11:00">MORNING</option>
                    <option value="11:15-14:00">AFTERNOON</option>
                    <option value="14:15-17:00">EVENING</option>
                    <option value="8:30-17:00">ALL DAY</option>
                  </select>
                </div>
              ))}

              <p className="choose-solo-text">Booking for:</p>
              
              <CallCalendar userInfo={this.state} />
  
          </div>
        </div>
    );
  }
}

export default MainSolo;