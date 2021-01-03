import React from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import 'rsuite/dist/styles/rsuite-default.css';
import "../homepage.styles.scss";
import "react-dates/lib/css/_datepicker.css";


class SetDates extends React.Component {


    datesChange(){
        this.props.changeDates()
    }

    FocusChange = (focusedInput) => {
        this.props.onFocus(focusedInput)
    }


    render() {
        console.log(this.props.state.startDate)
        console.log(this.props.state.startDate)
        return (
            <DateRangePicker
                daySize={40}
                // customInputIcon={<TestCustomInputIcon />}
                startDateId="startDate"
                endDateId="endDate"
                startDate={this.props.state.startDate}
                endDate={this.props.state.endDate}
                onDatesChange={this.datesChange}
                focusedInput={this.props.state.focused}
                onFocusChange={focusedInput => this.FocusChange(focusedInput)}
                numberOfMonths={1}
              />
        )
    }
}

export default SetDates;