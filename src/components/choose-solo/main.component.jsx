import React, { Fragment} from 'react'
import img from '../../images/image2.0.svg'
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './homepage.styles.scss'

// Solo mainpage


// const TestCustomInputIcon = () => (
//     <span
//       style={{
//         border: '',
//         width: '200px',
//         backgroundColor: '#cdb197',
//         color: '#cdb197',
//         padding: '',
//       }}
//     >
//     </span>
//   );

class MainSolo extends React.Component {
    constructor(props) {
        super(props)
        const date = new Date()
        this.state = { 
            workplace: null,
            startDate: null,
            endDate: null,
            timeslot: "",
            booked: false
        }
    
        // this.handleChange = this.handleChange.bind(this)
        this.buttonSelected = this.buttonSelected.bind(this)
        this.confirm = this.confirm.bind(this)
        this.onDatesChange = this.onDatesChange.bind(this)
        this.onFocusChange = this.onFocusChange.bind(this)
    
    }

    buttonSelected = tt => e=> {
        this.setState({ timeslot: tt}, () => {
        })
        
    }

    confirm = bool => e => {
        this.setState({booked: bool}, () => {
        })
    }

    confirmBack = bool => e => {
        //Add function to go back one page
    }

    onDatesChange({ startDate,endDate }) {
        this.setState({ startDate, endDate });
      }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
        console.log(this.startDate)
    }

    
    
    render() {
        return (
            <Fragment>
                
                <form onSubmit={this.handleSubmit}>
                    <img src={img} className="img"></img>
                    <h2 className="welcome">Select Workplace:</h2>
                    <input className="buttons" name="workplace" type="text" value={this.state.workplace}/>
                    <h2 className="welcome">Select dates:</h2>
                    <div className="dateButtons">
                        <DateRangePicker
                        daySize={40}
                        // customInputIcon={<TestCustomInputIcon />}
                        date={this.state.startDate}
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
                <button className="submitBtn" type="button" onClick={this.confirm(true)}>Book</button>
                <button className="backBtn" type="button" onClick={this.confirm(true)}>Back</button>
            </Fragment>
        )
        
    }
    
}

export default MainSolo;




{/* <div style=""> */} 
                        {/* <button className="Morning" type="button" onClick={this.buttonSelected("Morning")}>MORNING</button>
                        <button className="Afternoon" type="button" onClick={this.buttonSelected("Afternoon")}>AFTERNOON</button>
                        <button className="Evening" type="button" onClick={this.buttonSelected("Evening")}>EVENING</button> */}
                     {/* </div> */}
