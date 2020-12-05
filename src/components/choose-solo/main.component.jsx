import React, { Fragment, Component } from 'react'
import Map from '../map/map.component';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './homepage.styles.scss'
import CallCalendar from './AddEvent'
import { createUserProfileDocument } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';


class MainSolo extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            workplace: "",
            startDate: null,
            endDate: null,
            timeslot: ""
        }

        this.buttonSelected = this.buttonSelected.bind(this)
        this.onDatesChange = this.onDatesChange.bind(this)
        this.onFocusChange = this.onFocusChange.bind(this)
        this.onWorkplace = this.onWorkplace.bind(this)
    }

    buttonSelected = tt => e => {
        this.setState({ timeslot: tt}, () => {
        })
    }

    onWorkplace(event) {
        if(event >= 0){
            this.setState({workplace: event})
        }
    }

    onDatesChange({ startDate,endDate }) {
        this.setState({ startDate, endDate });
      }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    render() {
        return (
            <Fragment>
                <form>
                    <Map className='map' workplace={this.onWorkplace}/>
                    {/* <img src={img} className="img"></img> */}
                    <h2 className="welcome">Select Workplace: {this.state.workplace}</h2>
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
                    {["MORNING", "AFTERNOON", "EVENING"].map(key => 
                    <button className="timeslot" type="button" key={key} onClick={this.buttonSelected(key)}>{key}</button>)}
                </form>
                <CallCalendar />
                <button onClick={event => window.location.href='/home'} className="backBtn" type="button">Back</button>
            </Fragment>
        )
        
    }
    
}

const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser
});

export default connect(mapStateToProps)(MainSolo);