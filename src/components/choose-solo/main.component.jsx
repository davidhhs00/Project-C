import React from "react";
import { DateRangePicker } from "react-dates";
import Map from '../map/map.component';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { connect } from 'react-redux';

import "./homepage.styles.scss";

import SetReservation from "./AddEvent";
import setRangeDates from './Reservation/SetRangeDates';
import SetTimeslot from './TimeSlot/timeslot.component';

import { createNotification, getAllUsers } from '../../firebase/firebase.utils';

class MainSolo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        allUserList: [],
        amountOfUsers: 1,
        workplace: "",
        startDate: null,
        endDate: null,
        focused: false,
        dates: {},
        currentUser: this.props.currentUser
    };
    
    this.buttonSelected = this.buttonSelected.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onWorkplace = this.onWorkplace.bind(this);
    this.onSetTime = this.onSetTime.bind(this);
    this.createNotification = this.createNotification.bind(this);
    this.changeAmountOfUsers = this.changeAmountOfUsers.bind(this);
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

  createNotification(arr) {
      var keyName = Object.keys(this.state.dates)[0];
      var keyVal = this.state.dates[keyName];
      var date = keyName + " " + keyVal
       
      getAllUsers().then(res => {
        this.setState({ allUserList: res });

        arr.forEach(e => {
          let notification = {
            title: "Work Invitation",
            message: `You have been invited to work on ${date} in workplace number ${this.state.workplace}`,
            code: 200,
            body: {
              workplace: this.state.workplace,
              dates: this.state.dates // Need
            },
            answer1: "Accept",
            answer2: "Deny"
          }

          var receiverID;
          this.state.allUserList.forEach(user => {
            if (user.email === e) receiverID = user.id;
          })

          if (receiverID) {
            createNotification(this.props.user.id, receiverID, notification)
          }
        })
      })
    }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  changeAmountOfUsers(e) {
    this.setState({ amountOfUsers: e });
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div className="main">
        <Map className='map' workplace={this.onWorkplace} dates={this.state.dates} amountOfUsers={this.state.amountOfUsers}/>
        <div>
          <p className="choose-solo-text">Selected Workplace: </p>
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
          <SetTimeslot onSetTime={this.onSetTime} dates={this.state.dates}/>

          <p className="choose-solo-text">Booking for:</p>
          
          <SetReservation userInfo={this.state} action={this.createNotification} actionTwo={this.changeAmountOfUsers} />
        </div>
      </div>  
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser.displayName
});

export default connect(mapStateToProps)(MainSolo);