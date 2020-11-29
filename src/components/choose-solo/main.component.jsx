import React, { Fragment } from "react";
// import img from '../../images/image2.0.svg'
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./homepage.styles.scss";
import CallCalendar from "./AddEvent";

class MainSolo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workplace: "",
      startDate: null,
      endDate: null,
      timeslot: "",
    };

    // this.handleChange = this.handleChange.bind(this)
    this.buttonSelected = this.buttonSelected.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onWorkplace = this.onWorkplace.bind(this);
  }

  buttonSelected = (tt) => (e) => {
    this.setState({ timeslot: tt }, () => {});
  };

  onWorkplace(event) {
    if (event.target.value >= 0) {
      this.setState({ workplace: event.target.value });
    }
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    return (
      <Fragment>
        <div className="main">
          <form>
            {/* <img src={img} className="img"></img> */}
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
                <a href="/choosegroup">Choose group</a>
              </li>
            </ul>
            <h2 className="welcome">Select Workplace:</h2>
            <input
              className="buttons"
              type="number"
              value={this.state.workplace}
              onChange={this.onWorkplace}
            />
            <h2 className="welcome">Select dates:</h2>
            <div className="dateButtons">
              <DateRangePicker
                daySize={40}
                // customInputIcon={<TestCustomInputIcon />}
                startDateId="startDate"
                endDateId="endDate"
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.focusedInput}
                onFocusChange={this.onFocusChange}
                showClearDates
              />
            </div>
            <br />
            <h2 className="welcome">Choose Timeslot:</h2>
            {["MORNING", "AFTERNOON", "EVENING"].map((key) => (
              <button
                className="timeslot"
                type="button"
                key={key}
                onClick={this.buttonSelected(key)}
              >
                {key}
              </button>
            ))}
          </form>
          <CallCalendar userInfo={this.state} />
          <button
            onClick={(event) => (window.location.href = "/home")}
            className="backBtn"
            type="button"
          >
            Back
          </button>
        </div>
      </Fragment>
    );
  }
}

export default MainSolo;

{
  /* <div style=""> */
}
{
  /* <button className="Morning" type="button" onClick={this.buttonSelected("Morning")}>MORNING</button>
                        <button className="Afternoon" type="button" onClick={this.buttonSelected("Afternoon")}>AFTERNOON</button>
                        <button className="Evening" type="button" onClick={this.buttonSelected("Evening")}>EVENING</button> */
}
{
  /* </div> */
}
